# 🚀 PUSH TO GITHUB INSTRUCTIONS

## Quick Setup

### 1. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `omsky-tv`
3. Description: `Free IPTV streaming platform - Watch 5000+ live TV channels from 150+ countries`
4. Visibility: **Public** (required for GitHub Actions free tier)
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### 2. Push Code to GitHub

Run these commands on your VPS:

```bash
cd ~/omsky-tv

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/omsky-tv.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Alternative: Using SSH (recommended)**
```bash
# First, add your SSH key to GitHub
cat ~/.ssh/id_rsa.pub
# Copy output and add to: https://github.com/settings/keys

# Then push
git remote add origin git@github.com:YOUR_USERNAME/omsky-tv.git
git branch -M main
git push -u origin main
```

---

## 🤖 Automatic APK Build

### How It Works

Once you push to GitHub, **GitHub Actions will automatically**:

1. ✅ Detect the push to `main` branch
2. ✅ Trigger the Android build workflow
3. ✅ Install JDK 17 and Android SDK
4. ✅ Build **Debug APK** (ready to install)
5. ✅ Build **Release APK** (unsigned)
6. ✅ Upload APKs as artifacts
7. ✅ Create a GitHub Release with download links

### Check Build Status

1. Go to your repo: `https://github.com/YOUR_USERNAME/omsky-tv`
2. Click **Actions** tab
3. You'll see "Android CI - Build APK" workflow running
4. Wait 5-10 minutes for build to complete

### Download APK

**Option 1: From Releases (Easiest)**
1. Go to `https://github.com/YOUR_USERNAME/omsky-tv/releases`
2. Click the latest release
3. Download `app-debug.apk`
4. Install on your Android device

**Option 2: From Workflow Artifacts**
1. Go to Actions tab
2. Click on the completed workflow run
3. Scroll down to "Artifacts"
4. Download `omsky-tv-debug-apk`

---

## 📱 Install APK on Android

1. Download `app-debug.apk` to your phone
2. Go to **Settings** → **Security**
3. Enable **Install from Unknown Sources** (or allow your browser/file manager)
4. Tap the APK file to install
5. Open **Omsky TV** app
6. Enjoy!

---

## 🔄 Future Updates

**Every time you push to main branch:**
- GitHub Actions automatically builds new APK
- New release is created with version number
- Users can download the latest version

**Update workflow:**
```bash
cd ~/omsky-tv

# Make changes to code
# ...

# Commit and push
git add .
git commit -m "Your update message"
git push origin main

# Wait 5-10 minutes, new APK will be ready!
```

---

## 🛠️ Troubleshooting

### "GitHub Actions failed"

1. Go to Actions tab
2. Click failed workflow
3. Check error logs
4. Common issues:
   - Gradle sync failed → Check `build.gradle.kts`
   - Missing dependencies → Check Android SDK versions
   - Timeout → Re-run workflow

### "Can't push to GitHub"

**Authentication error:**
```bash
# Use Personal Access Token
# Generate at: https://github.com/settings/tokens
# Use token as password when prompted
```

**Or setup SSH:**
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
cat ~/.ssh/id_ed25519.pub
# Add to: https://github.com/settings/keys
```

---

## 📝 Update README

After pushing, update these in `README.md`:

1. Replace `YOUR_USERNAME` with your actual GitHub username
2. Update badge URLs
3. Add actual screenshots (optional)
4. Update live demo URL if you have a domain

```bash
# Edit README
nano ~/omsky-tv/README.md

# Commit changes
git add README.md
git commit -m "Update README with GitHub username"
git push origin main
```

---

## 🎯 Summary

**Status**: ✅ **Ready to Push**

**Current State:**
- ✅ Git repository initialized
- ✅ All files committed
- ✅ GitHub Actions workflow configured
- ✅ .gitignore properly set
- ✅ README.md created
- ✅ LICENSE added

**Next Steps:**
1. Create GitHub repository
2. Run `git remote add origin ...`
3. Run `git push -u origin main`
4. Wait for GitHub Actions to build APK
5. Download and test APK
6. Share with users!

---

## 🔗 Important Links

**After pushing, you'll have:**
- Repository: `https://github.com/YOUR_USERNAME/omsky-tv`
- Releases: `https://github.com/YOUR_USERNAME/omsky-tv/releases`
- Actions: `https://github.com/YOUR_USERNAME/omsky-tv/actions`
- Issues: `https://github.com/YOUR_USERNAME/omsky-tv/issues`

**Web App (already live):**
- Production: http://146.190.80.243

---

## 💡 Tips

1. **Make repo public** for free GitHub Actions minutes
2. **Add topics** to your repo: `iptv`, `streaming`, `android`, `nextjs`, `kotlin`
3. **Create a nice banner** for README (use Canva or Figma)
4. **Add screenshots** from your running app
5. **Setup GitHub Pages** for project website (optional)
6. **Enable Discussions** for community support

---

**Ready to go! 🚀**

Just create the GitHub repo and push!
