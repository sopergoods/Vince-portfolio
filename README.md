# Vince's React Portfolio with 3D Lanyard

Your portfolio converted to React with an interactive 3D ID card (Lanyard) component!

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Your portfolio will open at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

---

## 🚂 Deploy to Railway (Your Current Host)

### Method 1: Using Railway CLI (Recommended)

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login to Railway**
```bash
railway login
```

3. **Initialize Railway Project**
```bash
railway init
```

4. **Link to Your Existing Project (if you have one)**
```bash
railway link
```

5. **Deploy**
```bash
railway up
```

### Method 2: Using GitHub (Easiest)

1. **Push your code to GitHub**
```bash
git init
git add .
git commit -m "Convert portfolio to React with Lanyard"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Connect Railway to GitHub**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your portfolio repository
   - Railway will auto-detect it's a Vite project!

3. **Railway Configuration**
   Railway should auto-detect everything, but if needed, add these settings:
   - **Build Command**: `npm run build`
   - **Start Command**: `npx serve dist -s`
   - **Install Command**: `npm install`

### Method 3: Manual Build Upload

1. **Build locally**
```bash
npm run build
```

2. **Install serve globally**
```bash
npm install -g serve
```

3. **In Railway Dashboard**:
   - Upload the `dist` folder contents
   - Set start command: `serve -s . -p $PORT`

---

## 📦 What's Included

### New Features
- ✨ **3D Interactive ID Card** - Drag to rotate, auto-rotating lanyard
- ⚛️ **React Framework** - Modern, component-based architecture
- 🎨 **Three.js Integration** - Powered by React Three Fiber
- 🎭 **All Original Features** - Skills, projects, contact sections preserved

### Dependencies
- `react` & `react-dom` - React framework
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers for R3F
- `three` - 3D graphics library
- `vite` - Fast build tool and dev server

---

## 🎨 Customizing the Lanyard

Edit `src/components/Lanyard.jsx` to customize:

```jsx
// Change colors
<meshStandardMaterial color="#ff3c3c" /> // Header color

// Change text
<Text>YOUR NAME</Text>

// Change rotation speed
<OrbitControls autoRotateSpeed={2} /> // Change the number
```

---

## 📁 Project Structure

```
portfolio-react/
├── src/
│   ├── components/
│   │   └── Lanyard.jsx          # 3D ID Card component
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # All styles
│   └── main.jsx                 # Entry point
├── public/                      # Static assets (images)
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
└── README.md                    # This file
```

---

## 🖼️ Adding Your Images

Place your project images in the `public` folder:
- `try.png`
- `Screenshot 2025-11-28 125556.png`
- `Screenshot 2025-11-28 124109.png`

They'll be accessible at `/image-name.png` in production.

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Railway Deployment Issues
- Make sure `package.json` has correct build script
- Check Railway logs: `railway logs`
- Ensure environment is set to Node 18+

---

## 🎓 Learning Resources

### React Basics
- [React Official Docs](https://react.dev)
- [React in 100 Seconds](https://www.youtube.com/watch?v=Tn6-PIqc4UM)

### Three.js / React Three Fiber
- [R3F Official Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Journey](https://threejs-journey.com/)

### Vite
- [Vite Guide](https://vitejs.dev/guide/)

---

## 💡 Next Steps

1. ✅ Deploy to Railway
2. 🎨 Customize the Lanyard colors/text
3. 📸 Add a profile photo to the ID card
4. 🌟 Add more 3D elements
5. 📱 Test on mobile devices

---

## 📞 Need Help?

If you get stuck:
1. Check the error message in the terminal
2. Search the error on Google
3. Ask in React/Three.js communities
4. DM me on GitHub: @sopergoods

---

## 🎉 You Did It!

Your portfolio is now powered by React with a cool 3D Lanyard! 

**Before deploying:**
- Update the email in Contact section
- Add your actual LinkedIn link
- Replace placeholder images in `public/` folder

Good luck with your deployment! 🚀
