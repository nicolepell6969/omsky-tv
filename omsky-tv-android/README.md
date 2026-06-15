# Omsky TV - Android App

## Project Structure

```
app/
├── data/
│   ├── remote/
│   │   ├── dto/          # API DTOs
│   │   └── IptvApi.kt    # Retrofit API interface
│   ├── repository/       # Repository implementations
│   └── mapper/           # DTO to Domain mappers
├── domain/
│   ├── model/            # Domain models
│   └── repository/       # Repository interfaces
├── presentation/
│   ├── home/             # Home screen (channel list)
│   ├── player/           # Video player screen
│   └── theme/            # Material Design theme
└── di/                   # Hilt dependency injection
```

## Features

- **MVVM + Clean Architecture**: Separation of concerns with clear layers
- **Jetpack Compose**: Modern declarative UI
- **Hilt**: Dependency injection
- **ExoPlayer (Media3)**: Professional video playback with HLS support
- **Retrofit**: REST API integration
- **Coroutines + Flow**: Async operations
- **Material Design 3**: Modern UI components
- **Coil**: Image loading

## Build Instructions

1. **Prerequisites:**
   - Android Studio Hedgehog (2023.1.1) or later
   - JDK 17
   - Android SDK with API 34

2. **Open Project:**
   ```bash
   cd omsky-tv-android
   # Open in Android Studio
   ```

3. **Build:**
   - Click "Build" → "Build Bundle(s) / APK(s)" → "Build APK(s)"
   - Or via terminal: `./gradlew assembleDebug`

4. **Run:**
   - Connect Android device or start emulator
   - Click "Run" (▶️) button

## Release Build

1. **Generate Keystore:**
   ```bash
   keytool -genkey -v -keystore omsky-tv.jks -keyalg RSA -keysize 2048 -validity 10000 -alias omskytv
   ```

2. **Configure signing in `app/build.gradle.kts`**

3. **Build release APK:**
   ```bash
   ./gradlew assembleRelease
   ```

## AdMob Integration

Replace test Ad ID in `AndroidManifest.xml`:
```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-YOUR_ACTUAL_ID"/>
```

## Minimum Requirements

- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 34 (Android 14)
- **Compile SDK**: 34
