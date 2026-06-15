# Omsky TV - Android APK Build Guide

## Prerequisites

Karena kita di VPS tanpa GUI, kita tidak bisa build Android APK langsung di sini.
Android Studio dan Android SDK membutuhkan environment desktop.

## Opsi untuk Build Android APK:

### **Opsi 1: Build di Local Machine (Recommended)**

1. **Download project ke komputer lokal:**
   ```bash
   scp -r root@146.190.80.243:~/omsky-tv/omsky-tv-android ~/Desktop/
   ```

2. **Buka di Android Studio:**
   - Open Android Studio
   - File → Open → Select `omsky-tv-android` folder
   - Wait for Gradle sync

3. **Build APK:**
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - APK akan ada di: `app/build/outputs/apk/debug/app-debug.apk`

4. **Build Release APK:**
   ```bash
   ./gradlew assembleRelease
   ```

---

### **Opsi 2: GitHub Actions (CI/CD)**

1. Push project ke GitHub
2. Setup GitHub Actions workflow:

```yaml
# .github/workflows/android.yml
name: Android CI

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
    - name: Build with Gradle
      run: |
        cd omsky-tv-android
        chmod +x gradlew
        ./gradlew assembleDebug
    - name: Upload APK
      uses: actions/upload-artifact@v3
      with:
        name: app-debug
        path: omsky-tv-android/app/build/outputs/apk/debug/app-debug.apk
```

---

### **Opsi 3: Docker Build (Advanced)**

Install Docker dan build menggunakan Android SDK container:

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Build APK
docker run --rm -v "$PWD:/project" -w /project/omsky-tv-android \
  mingc/android-build-box:latest \
  bash -c "./gradlew assembleDebug"
```

---

## Project Files Location

**Android Source Code**: `/root/omsky-tv/omsky-tv-android/`

**Download via SCP:**
```bash
scp -r root@146.190.80.243:/root/omsky-tv/omsky-tv-android /path/to/local/
```

---

## Alternative: Use Pre-built APK Template

Jika tidak bisa build, gunakan template IPTV player yang sudah ada:
- [IPTV Player](https://github.com/RohitVerma882/iptv-player)
- [VLC for Android](https://code.videolan.org/videolan/vlc-android)
- Customize dengan branding Omsky TV

---

## Web App Already Live!

**URL**: http://146.190.80.243

Web dashboard sudah running di VPS dengan:
- ✅ Nginx reverse proxy
- ✅ PM2 process manager
- ✅ Auto-restart on reboot
- ✅ Production build

Tes sekarang dengan membuka: **http://146.190.80.243**
