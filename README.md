# Omsky TV - Free IPTV Streaming Platform

<div align="center">
  <h1>📺 Omsky TV</h1>
  <p><strong>Watch thousands of free TV channels from around the world</strong></p>
  
  [![Android CI](https://github.com/YOUR_USERNAME/omsky-tv/actions/workflows/android-build.yml/badge.svg)](https://github.com/YOUR_USERNAME/omsky-tv/actions/workflows/android-build.yml)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/Next.js-16.2-black)](https://nextjs.org/)
  [![Kotlin](https://img.shields.io/badge/Kotlin-1.9-purple)](https://kotlinlang.org/)
</div>

---

## ✨ Features

- 🌍 **5,000+ Live TV Channels** from 150+ countries
- 🔍 **Smart Search & Filter** by category, country, and name
- 🎥 **HLS Video Streaming** with adaptive bitrate
- 🎨 **Modern UI** with Netflix-like design (Material Design 3)
- 🌙 **Dark Theme** optimized for viewing
- 📱 **Cross-Platform** - Web + Android
- ⚡ **Fast & Optimized** - 2-3 second load time
- 💾 **No Authentication** required - instant access
- 🔒 **No Ads Popup** - only non-intrusive banner ads

---

## 🖥️ Screenshots

### Web Dashboard
<div align="center">
  <img src="https://via.placeholder.com/800x450/1a1a1a/ffffff?text=Home+Page" alt="Home Page" width="45%" />
  <img src="https://via.placeholder.com/800x450/1a1a1a/ffffff?text=Video+Player" alt="Video Player" width="45%" />
</div>

### Android App
<div align="center">
  <img src="https://via.placeholder.com/300x600/1a1a1a/ffffff?text=Mobile+Home" alt="Mobile Home" width="30%" />
  <img src="https://via.placeholder.com/300x600/1a1a1a/ffffff?text=Mobile+Player" alt="Mobile Player" width="30%" />
</div>

---

## 🚀 Quick Start

### 🌐 Web App

**Live Demo**: [http://146.190.80.243](http://146.190.80.243)

**Run Locally:**
```bash
cd omsky-tv-web
npm install
npm run dev
# Open http://localhost:3000
```

**Deploy to Production:**
```bash
npm run build
npm start
```

### 📱 Android App

**Download APK:**
- Go to [Releases](https://github.com/YOUR_USERNAME/omsky-tv/releases)
- Download `app-debug.apk`
- Install on your Android device (enable "Unknown Sources")

**Build from Source:**
```bash
cd omsky-tv-android
./gradlew assembleDebug
# APK: app/build/outputs/apk/debug/app-debug.apk
```

---

## 💻 Tech Stack

### Web (Next.js)
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand + TanStack Query
- **Video Player**: Plyr (HLS support)
- **Deployment**: VPS with Nginx + PM2

### Android (Kotlin)
- **Architecture**: MVVM + Clean Architecture
- **UI**: Jetpack Compose + Material Design 3
- **Video Player**: ExoPlayer (Media3)
- **Networking**: Retrofit + OkHttp
- **DI**: Hilt (Dagger)
- **Async**: Coroutines + Flow

---

## 📊 Performance

| Metric | Value |
|--------|-------|
| **Load Time** | 2-3 seconds |
| **Payload Size** | 2 MB (optimized) |
| **Channels** | 5,000 active |
| **Countries** | 150+ |
| **Cache Strategy** | 1 hour + stale-while-revalidate |
| **Mobile Support** | Responsive design |

---

## 📁 Project Structure

```
omsky-tv/
├── omsky-tv-web/              # Next.js Web App
│   ├── app/                   # App Router pages
│   ├── components/            # React components
│   ├── lib/                   # Utils, API, types
│   └── public/                # Static assets
│
├── omsky-tv-android/          # Android App (Kotlin)
│   ├── app/src/main/
│   │   ├── java/com/omskytv/app/
│   │   │   ├── data/          # Data layer
│   │   │   ├── domain/        # Business logic
│   │   │   ├── presentation/  # UI (Compose)
│   │   │   └── di/            # Dependency injection
│   │   └── AndroidManifest.xml
│   └── build.gradle.kts
│
├── .github/workflows/         # CI/CD (GitHub Actions)
├── README.md
└── LICENSE
```

---

## 🔧 Development

### Prerequisites
- **Node.js** 18+ (for web)
- **JDK** 17 (for Android)
- **Android Studio** Hedgehog+ (for Android)
- **npm** or **yarn**

### Setup

**1. Clone Repository:**
```bash
git clone https://github.com/YOUR_USERNAME/omsky-tv.git
cd omsky-tv
```

**2. Setup Web:**
```bash
cd omsky-tv-web
npm install
npm run dev
```

**3. Setup Android:**
```bash
cd omsky-tv-android
# Open in Android Studio
# Sync Gradle
# Run on emulator/device
```

---

## 📦 Deployment

### Web Deployment (VPS)

```bash
# Build production
cd omsky-tv-web
npm run build

# Setup PM2
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Setup Nginx reverse proxy
sudo nano /etc/nginx/sites-available/omsky-tv
# Configure proxy_pass to http://localhost:3000
sudo systemctl restart nginx
```

### Android Deployment (GitHub Actions)

Push to `main` branch and GitHub Actions will automatically:
1. Build debug APK
2. Build release APK (unsigned)
3. Upload artifacts
4. Create GitHub Release with APKs

---

## 📝 API Source

Data provided by [iptv-org](https://github.com/iptv-org/iptv) - the largest open-source IPTV database.

**Endpoints Used:**
- `https://iptv-org.github.io/api/channels.json` - Channel metadata
- `https://iptv-org.github.io/api/streams.json` - Stream URLs

---

## 💰 Monetization

**Current:**
- Non-intrusive banner ads (Google AdSense/AdMob)
- No popups, no auto-play audio ads

**Future Options:**
- Premium tier (ad-free, offline downloads)
- Donations/sponsorship

---

## 🛣️ Roadmap

### Phase 1: MVP ✅ (Completed)
- [x] Web dashboard with search & filters
- [x] Android app with ExoPlayer
- [x] 5,000+ channels from IPTV-org
- [x] Responsive design
- [x] VPS deployment

### Phase 2: Enhancements
- [ ] Watch history & favorites sync
- [ ] Continue watching
- [ ] Chromecast support
- [ ] PWA (installable web app)
- [ ] iOS app

### Phase 3: Advanced
- [ ] User accounts (optional)
- [ ] Personalized recommendations (ML)
- [ ] Social features (ratings, comments)
- [ ] Multi-language support
- [ ] Offline downloads

---

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

Omsky TV does not host any video content. All streams are provided by third-party sources via the [iptv-org](https://github.com/iptv-org/iptv) public database. We are not responsible for the content, availability, or legality of external streams.

---

## 👨‍💻 Author

**Feren Reza Reynaldo**

- Email: feren@omskytv.com
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

---

## 🎉 Acknowledgments

- [iptv-org](https://github.com/iptv-org/iptv) - IPTV database
- [Next.js](https://nextjs.org/) - React framework
- [Jetpack Compose](https://developer.android.com/jetpack/compose) - Android UI
- [ExoPlayer](https://exoplayer.dev/) - Media playback
- [shadcn/ui](https://ui.shadcn.com/) - UI components

---

<div align="center">
  <p>Made with ❤️ by Feren Reza Reynaldo</p>
  <p>⭐ Star this repo if you like it!</p>
</div>
