const STORAGE_KEY = 'forgefit-state-v1';

const sampleState = {
  workoutHistory: [
    { id: 1, exercise: 'Bench Press', sets: 5, reps: 6, weight: 85, date: 'Mon' },
    { id: 2, exercise: 'Squat', sets: 4, reps: 8, weight: 110, date: 'Tue' },
    { id: 3, exercise: 'Deadlift', sets: 4, reps: 5, weight: 140, date: 'Thu' },
    { id: 4, exercise: 'Pull-ups', sets: 4, reps: 10, weight: 12, date: 'Fri' }
  ],
  progress: [
    { label: 'Bench', value: 84, goal: 100 },
    { label: 'Squat', value: 88, goal: 100 },
    { label: 'Pull-up', value: 72, goal: 100 },
    { label: 'Recovery', value: 90, goal: 100 }
  ],
  meals: [
    { title: 'High-protein breakfast', detail: 'Oats, berries, Greek yogurt, chia seeds' },
    { title: 'Pre-workout fuel', detail: 'Banana, whey isolate, almond butter toast' },
    { title: 'Post-lift meal', detail: 'Chicken rice bowl, greens, avocado' }
  ],
  exercises: [
    { name: 'Barbell Bench Press', focus: 'Chest + triceps', tag: 'Power' },
    { name: 'Back Squat', focus: 'Quads + posterior chain', tag: 'Strength' },
    { name: 'Romanian Deadlift', focus: 'Hamstrings + glutes', tag: 'Hypertrophy' },
    { name: 'Cable Row', focus: 'Upper back + lats', tag: 'Pull' }
  ]
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return structuredClone(sampleState);
    const parsed = JSON.parse(saved);
    return { ...structuredClone(sampleState), ...parsed };
  } catch (error) {
    return structuredClone(sampleState);
  }
}

let state = loadState();

const dashboardEl = document.getElementById('dashboard');
const workoutListEl = document.getElementById('workoutList');
const mealPlanEl = document.getElementById('mealPlan');
const exerciseLibraryEl = document.getElementById('exerciseLibrary');
const progressBarsEl = document.getElementById('progressBars');
const workoutForm = document.getElementById('workoutForm');
const addWorkoutBtn = document.getElementById('addWorkoutBtn');
const clearHistoryBtn = document.getElementById('clearHistory');

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderDashboard() {
  const totalVolume = state.workoutHistory.reduce((sum, item) => sum + item.sets * item.reps * item.weight, 0);
  const avgReps = Math.round(
    state.workoutHistory.reduce((sum, item) => sum + item.reps, 0) / state.workoutHistory.length
  );
  const weeklySessions = state.workoutHistory.length;
  const recoveryScore = 94;

  const cards = [
    { label: 'Total volume', value: `${Math.round(totalVolume / 1000)}k kg`, detail: '+12% vs last week', accent: 'accent', icon: '↗' },
    { label: 'Avg reps', value: `${avgReps}`, detail: 'Per set', accent: '', icon: '◎' },
    { label: 'Sessions', value: `${weeklySessions}`, detail: 'This week', accent: 'orange', icon: '▣' },
    { label: 'Recovery', value: `${recoveryScore}%`, detail: 'Readiness score', accent: 'accent', icon: '✦' }
  ];

  dashboardEl.innerHTML = cards
    .map(
      (card) => `
        <article class="stat-card ${card.accent || ''}">
          <div class="label">
            <span>${card.label}</span>
            <span class="icon">${card.icon}</span>
          </div>
          <div class="metric">
            <strong>${card.value}</strong>
            <span>${card.detail}</span>
          </div>
        </article>
      `
    )
    .join('');
}

function renderWorkoutList() {
  const items = state.workoutHistory.slice(0, 5);

  workoutListEl.innerHTML = items
    .map(
      (item) => `
        <li class="session-item">
          <div class="session-details">
            <strong>${item.exercise}</strong>
            <div class="session-meta">
              <span>${item.sets} sets</span>
              <span>${item.reps} reps</span>
              <span>${item.weight} kg</span>
            </div>
          </div>
          <span class="session-badge">${item.date}</span>
        </li>
      `
    )
    .join('');
}

function renderExerciseLibrary() {
  exerciseLibraryEl.innerHTML = state.exercises
    .map(
      (exercise) => `
        <article class="exercise-card">
          <div>
            <h4>${exercise.name}</h4>
            <p>${exercise.focus}</p>
          </div>
          <span class="exercise-tag">${exercise.tag}</span>
        </article>
      `
    )
    .join('');
}

function renderMealPlan() {
  mealPlanEl.innerHTML = state.meals
    .map(
      (meal) => `
        <article class="meal-card">
          <div>
            <h4>${meal.title}</h4>
            <p>${meal.detail}</p>
          </div>
          <span class="pill success">Fuel</span>
        </article>
      `
    )
    .join('');
}

function renderProgressBars() {
  progressBarsEl.innerHTML = state.progress
    .map(
      (item) => `
        <div class="progress-item">
          <div class="progress-top">
            <span>${item.label}</span>
            <strong>${item.value}%</strong>
          </div>
          <div class="progress-bar">
            <span style="width: ${Math.min(item.value, 100)}%"></span>
          </div>
        </div>
      `
    )
    .join('');
}

function renderApp() {
  renderDashboard();
  renderWorkoutList();
  renderExerciseLibrary();
  renderMealPlan();
  renderProgressBars();
}

workoutForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(workoutForm);
  const entry = {
    id: Date.now(),
    exercise: formData.get('exerciseName'),
    sets: Number(formData.get('sets')),
    reps: Number(formData.get('reps')),
    weight: Number(formData.get('weight')),
    date: new Date().toLocaleDateString('en-US', { weekday: 'short' })
  };

  state.workoutHistory.unshift(entry);
  saveState();
  renderApp();
  workoutForm.reset();
});

addWorkoutBtn.addEventListener('click', () => {
  document.getElementById('exerciseName').focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

clearHistoryBtn.addEventListener('click', () => {
  state.workoutHistory = [];
  saveState();
  renderApp();
});

renderApp();






















































































