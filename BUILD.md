# ForgeFit APK Build Instructions

## Prerequisites

1. **Android SDK** - Install Android Studio or download the Android SDK
2. **Gradle** - Already included in Android Studio
3. **Java Development Kit (JDK)** - JDK 11 or higher

## Build Steps

### Debug APK

```bash
cd android
./gradlew assembleDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (Signed)

**Step 1:** Generate a signing key (first time only)

```bash
keytool -genkey -v -keystore android/keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias forgefit
```

**Step 2:** Build release APK

```bash
cd android
./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

## Installation

### Via ADB

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Manual Installation

1. Transfer the APK file to your Android device
2. Open the file manager and tap the APK file
3. Follow the installation prompts
4. Enable "Unknown sources" if prompted

## App Features

- ✅ Workout logging and tracking
- ✅ Exercise library with categories
- ✅ Nutrition guidance cards
- ✅ Progress tracking with visual bars
- ✅ Local storage persistence
- ✅ Dark theme optimized for mobile
- ✅ Safe area support (notch-friendly)

## Troubleshooting

### Build Fails with Gradle Error

```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew assembleDebug
```

### APK Won't Install

- Check device storage (min 50 MB required)
- Ensure app isn't already installed
- Enable installation from unknown sources

### Signing Key Issues

```bash
# Use environment variables for CI/CD
export KEYSTORE_PASSWORD="your-password"
export KEY_ALIAS="forgefit"
export KEY_PASSWORD="your-password"

./gradlew assembleRelease
```
