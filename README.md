# Srinivasu Pakkurthi — AI/ML & Software Engineer Portfolio

A modern, premium, animated personal portfolio website for **Srinivasu Pakkurthi**, an AI/ML Engineering student pursuing B.Tech in CSE (AI & ML) at Ideal Institute of Technology and aspiring AI/ML or Software Engineer.

---

## 🌟 Key Highlights & Design System

- **Modern AI/Technology Aesthetic:** Deep space dark background (`#07090e`) with vibrant indigo (`#6366f1`), cyan (`#06b6d4`), and sky blue (`#38bdf8`) accents.
- **Glassmorphism UI:** Multi-layered cards with backdrop blur, fine borders, and interactive cursor glow.
- **Theme Switcher:** Seamless Dark Mode / Light Mode toggle with `localStorage` persistence.
- **Neural Data Canvas:** Real-time particle network responding smoothly to cursor movement and window size.
- **Interactive Project 1 (Customer Behaviour Analytics):**
  - Live customer segmentation scatter visualization with K-Means clusters and dynamic re-simulation.
  - Interactive Scikit-learn churn probability estimator with live sliders and risk gauge.
- **Interactive Project 2 (AI Nutrition Assistant):**
  - Simulated OpenAI Nutrition Chatbot with quick-prompt chips, real-time message streams, and macro estimations.
  - Health & BMI metric widgets.
- **Education Timeline:** Vertical animated timeline with scroll progress tracker.
- **Animated Statistics:** Counting animations for CGPA (8.2), Internships (3), Major Projects (2), and Graduation Year (2027).
- **Interactive Resume Modal & Print Engine:** Built-in CV modal with a dedicated `@media print` layout allowing recruiters to view and print/save a crisp PDF directly.
- **Contact & Communication:** Quick copy buttons for email (`srinivasupakkurthi2@gmail.com`) and phone (`+91-70952 64218`), plus validated message dispatch form.
- **100% Truthful to Specification:** Strictly uses only the verified education, internships, projects, skills, certifications, and achievements provided.

---

## 📁 File Structure

```
srinivasu-portfolio/
│
├── index.html        # Semantic HTML5 markup, SEO meta tags, and ARIA landmarks
├── styles.css        # CSS variables, glassmorphism, responsive grid, animations, print rules
├── main.js           # Neural canvas, project simulators, scroll spy, counter animations, resume modal
└── README.md         # Documentation & deployment guide
```

---

## 🚀 How to Run Locally

You can preview the website in several convenient ways:

### Option 1: Direct File Open
Simply double-click `index.html` in your file explorer to open it in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using Node.js / npx
Open PowerShell or your terminal in this folder and run:
```bash
npx serve .
```
or
```bash
npx http-server -p 3000
```

### Option 3: Using Python
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

---

## 🚢 Free 1-Click Deployment Options

### GitHub Pages
1. Push this folder to a GitHub repository (e.g. `srinivasu-portfolio`).
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` / `root` and click **Save**.
4. Your portfolio will be live at `https://<your-username>.github.io/<repo-name>/`.

### Vercel / Netlify
1. Connect your GitHub repository to Vercel or Netlify.
2. No build command is required (`Build command: None`, `Output directory: .`).
3. Deploys instantly with global CDN performance and automated SSL certificate.
