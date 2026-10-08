/**
 * Srinivasu Pakkurthi — AI/ML & Software Engineer Portfolio
 * Interactive Functionality & Micro-Interactions Script
 */

(function () {
  'use strict';

  // --- Theme Controller ---
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  function initTheme() {
    const savedTheme = localStorage.getItem('sp_theme') || 'dark';
    setTheme(savedTheme);
  }

  function setTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('sp_theme', theme);
    // Notify canvas redraw if available
    if (window.updateCanvasColors) {
      window.updateCanvasColors(theme);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlRoot.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} theme`);
    });
  }

  initTheme();

  // --- Sticky Navbar & Scroll Spy ---
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Sticky shadow
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Timeline progress line
    updateTimelineProgress();

    // Active Section Spy
    let currentId = 'home';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });

    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Mobile drawer toggle
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      mobileDrawer.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on clicking links
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll Reveal Animations (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal-elem');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Animated Statistics Counters ---
  const statCards = document.querySelectorAll('.stat-card');
  let statsTriggered = false;

  function runStatsAnimation() {
    statCards.forEach(card => {
      const valueEl = card.querySelector('.stat-value');
      const target = parseFloat(valueEl.getAttribute('data-target'));
      const isDecimal = card.getAttribute('data-type') === 'decimal';
      const duration = 1600;
      const startTime = performance.now();
      const startVal = isDecimal ? 0 : (target > 1000 ? 2020 : 0);

      function updateNumber(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutCubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentVal = startVal + (target - startVal) * ease;

        if (isDecimal) {
          valueEl.textContent = currentVal.toFixed(1);
        } else {
          valueEl.textContent = Math.round(currentVal);
        }

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          valueEl.textContent = isDecimal ? target.toFixed(1) : target;
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const statsObserver = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !statsTriggered) {
          statsTriggered = true;
          runStatsAnimation();
        }
      },
      { threshold: 0.25 }
    );
    statsObserver.observe(aboutSection);
  }

  // --- Education Timeline Progress Line ---
  const timelineSection = document.getElementById('education');
  const timelineProgressBar = document.getElementById('timelineProgressBar');

  function updateTimelineProgress() {
    if (!timelineSection || !timelineProgressBar) return;
    const rect = timelineSection.getBoundingClientRect();
    const sectionHeight = timelineSection.offsetHeight;
    const viewportHeight = window.innerHeight;

    if (rect.top <= viewportHeight && rect.bottom >= 0) {
      const scrolled = (viewportHeight - rect.top) / (sectionHeight + viewportHeight * 0.4);
      const percentage = Math.min(Math.max(scrolled * 100, 0), 100);
      timelineProgressBar.style.height = `${percentage}%`;
    }
  }

  // --- Interactive Cursor Follower Glow ---
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function renderGlow() {
      // Lerp for smooth lag
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderGlow);
    }
    requestAnimationFrame(renderGlow);
  }

  // --- Neural / Data Particle Canvas ---
  const canvas = document.getElementById('neuralCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    const particleCount = 48;
    const maxDistance = 140;

    let particleColor = 'rgba(56, 189, 248, 0.45)';
    let lineColor = 'rgba(99, 102, 241, 0.12)';

    window.updateCanvasColors = function (theme) {
      if (theme === 'light') {
        particleColor = 'rgba(2, 132, 199, 0.35)';
        lineColor = 'rgba(79, 70, 229, 0.08)';
      } else {
        particleColor = 'rgba(56, 189, 248, 0.45)';
        lineColor = 'rgba(99, 102, 241, 0.12)';
      }
    };

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    }

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.55;
        this.vy = (Math.random() - 0.5) * 0.55;
        this.radius = Math.random() * 1.8 + 1.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    let mouse = { x: null, y: null, maxDist: 160 };
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function animateParticles() {
      if (!document.hidden) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          p1.update();
          p1.draw();

          // Connect particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
              const alpha = (1 - dist / maxDistance) * 0.25;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }

          // Connect to mouse gently
          if (mouse.x !== null) {
            const mdx = p1.x - mouse.x;
            const mdy = p1.y - mouse.y;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < mouse.maxDist) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = particleColor;
              ctx.lineWidth = (1 - mDist / mouse.maxDist) * 1.2;
              ctx.stroke();
            }
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateParticles();
  }

  // --- PROJECT 1: Interactive Customer Analytics Dashboard Simulation ---
  const clusterCanvas = document.getElementById('clusterCanvas');
  const reseedClusterBtn = document.getElementById('reseedClusterBtn');

  if (clusterCanvas) {
    const cCtx = clusterCanvas.getContext('2d');
    let clusterPoints = [];

    const clusters = [
      { name: 'Cluster 0: High Value', color: '#06b6d4', cx: 0.75, cy: 0.35, count: 28 },
      { name: 'Cluster 1: Savers', color: '#8b5cf6', cx: 0.32, cy: 0.72, count: 24 },
      { name: 'Cluster 2: New Users', color: '#10b981', cx: 0.28, cy: 0.28, count: 22 },
      { name: 'Cluster 3: Churn Risk', color: '#f43f5e', cx: 0.82, cy: 0.82, count: 26 }
    ];

    function generateClusterPoints() {
      clusterPoints = [];
      const w = clusterCanvas.width;
      const h = clusterCanvas.height;

      clusters.forEach(c => {
        for (let i = 0; i < c.count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.pow(Math.random(), 0.5) * 36;
          const x = c.cx * w + Math.cos(angle) * radius;
          const y = c.cy * h + Math.sin(angle) * (radius * 0.75);
          clusterPoints.push({
            x: Math.max(20, Math.min(w - 20, x)),
            y: Math.max(20, Math.min(h - 20, y)),
            color: c.color,
            r: Math.random() * 2 + 3
          });
        }
      });
      drawClusterScatter();
    }

    function drawClusterScatter() {
      const w = clusterCanvas.width;
      const h = clusterCanvas.height;
      cCtx.clearRect(0, 0, w, h);

      // Draw faint grid lines
      cCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      cCtx.lineWidth = 1;

      for (let x = 40; x < w; x += 60) {
        cCtx.beginPath();
        cCtx.moveTo(x, 0);
        cCtx.lineTo(x, h);
        cCtx.stroke();
      }
      for (let y = 30; y < h; y += 40) {
        cCtx.beginPath();
        cCtx.moveTo(0, y);
        cCtx.lineTo(w, y);
        cCtx.stroke();
      }

      // Draw Cluster centroid indicators
      clusters.forEach(c => {
        cCtx.beginPath();
        cCtx.arc(c.cx * w, c.cy * h, 6, 0, Math.PI * 2);
        cCtx.fillStyle = c.color;
        cCtx.shadowColor = c.color;
        cCtx.shadowBlur = 10;
        cCtx.fill();
        cCtx.shadowBlur = 0;
      });

      // Draw points
      clusterPoints.forEach(pt => {
        cCtx.beginPath();
        cCtx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        cCtx.fillStyle = pt.color;
        cCtx.globalAlpha = 0.78;
        cCtx.fill();
        cCtx.globalAlpha = 1;
      });

      // Axes Labels
      cCtx.fillStyle = 'rgba(148, 163, 184, 0.7)';
      cCtx.font = '10px JetBrains Mono, monospace';
      cCtx.fillText('Engagement Score →', w - 120, h - 8);
      cCtx.fillText('↑ Spend Velocity', 10, 16);
    }

    generateClusterPoints();

    if (reseedClusterBtn) {
      reseedClusterBtn.addEventListener('click', () => {
        generateClusterPoints();
        showToast('Resimulated dynamic customer segmentation clusters');
      });
    }
  }

  // --- Project 1: Live Churn Risk Calculator ---
  const tenureSlider = document.getElementById('tenureSlider');
  const engagementSlider = document.getElementById('engagementSlider');
  const tenureVal = document.getElementById('tenureVal');
  const engagementVal = document.getElementById('engagementVal');
  const churnRiskVal = document.getElementById('churnRiskVal');
  const churnRiskBar = document.getElementById('churnRiskBar');

  function calculateChurnRisk() {
    if (!tenureSlider || !engagementSlider) return;
    const tenure = parseFloat(tenureSlider.value);
    const engagement = parseFloat(engagementSlider.value);

    if (tenureVal) tenureVal.textContent = tenure;
    if (engagementVal) engagementVal.textContent = engagement;

    // Simulated Scikit-learn Logistic Regression probability:
    // logit = 1.9 - (0.065 * tenure) - (0.04 * engagement)
    const logit = 1.9 - (0.065 * tenure) - (0.04 * engagement);
    const prob = 1 / (1 + Math.exp(-logit));
    const percentage = Math.max(2.1, Math.min(96.4, prob * 100));

    let riskClass = 'low-risk';
    let riskLabel = 'Low Risk';

    if (percentage > 55) {
      riskClass = 'high-risk';
      riskLabel = 'High Churn Risk';
    } else if (percentage > 25) {
      riskClass = 'med-risk';
      riskLabel = 'Moderate Risk';
    }

    if (churnRiskVal) {
      churnRiskVal.className = `gauge-value ${riskClass}`;
      churnRiskVal.textContent = `${percentage.toFixed(1)}% (${riskLabel})`;
    }

    if (churnRiskBar) {
      churnRiskBar.style.width = `${percentage}%`;
      if (riskClass === 'high-risk') {
        churnRiskBar.style.backgroundColor = 'var(--accent-rose)';
      } else if (riskClass === 'med-risk') {
        churnRiskBar.style.backgroundColor = 'var(--accent-amber)';
      } else {
        churnRiskBar.style.backgroundColor = 'var(--accent-emerald)';
      }
    }
  }

  if (tenureSlider && engagementSlider) {
    tenureSlider.addEventListener('input', calculateChurnRisk);
    engagementSlider.addEventListener('input', calculateChurnRisk);
    calculateChurnRisk();
  }

  // --- PROJECT 2: Interactive AI Nutrition Chatbot Simulation ---
  const nutritionChatForm = document.getElementById('nutritionChatForm');
  const nutritionUserInput = document.getElementById('nutritionUserInput');
  const chatMessagesArea = document.getElementById('chatMessagesArea');
  const quickChips = document.querySelectorAll('.quick-chip');

  const botResponses = {
    'Suggest a 500 kcal high-protein breakfast.':
      'Here is a balanced 500 kcal option:\n• 3 whole scrambled eggs + 2 egg whites (240 kcal, 28g protein)\n• 1 slice whole grain sourdough bread (110 kcal, 4g protein)\n• 1/2 medium sliced avocado (120 kcal, 1.5g protein)\n• Handful of baby spinach (15 kcal)\n→ Total: 485 kcal | 33.5g Protein | Healthy Omega-3 fats.',
    'How do I calculate BMI and daily maintenance calories?':
      '1. BMI = weight (kg) ÷ [height (m)]².\n• Normal weight range: 18.5 – 24.9.\n2. Total Daily Energy Expenditure (TDEE):\n• BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5 (Mifflin-St Jeor formula).\n• Multiply by activity factor (1.2 to 1.7) to determine maintenance calories.',
    'What foods help muscle recovery post-workout?':
      'Optimal post-workout recovery requires a 3:1 or 2:1 ratio of carbohydrates to protein within 45–60 minutes:\n• Whey isolate or Greek yogurt with berries\n• Grilled chicken breast with sweet potato\n• Adequate hydration + electrolytes to replenish glycogen and support protein synthesis.'
  };

  function appendChatMessage(sender, text) {
    if (!chatMessagesArea) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}-msg`;

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.textContent = text;

    const time = document.createElement('span');
    time.className = 'msg-time';
    const now = new Date();
    time.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    msgDiv.appendChild(bubble);
    msgDiv.appendChild(time);
    chatMessagesArea.appendChild(msgDiv);
    chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
  }

  function simulateAiReply(userPrompt) {
    // Show typing state
    const typingId = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.id = typingId;
    typingDiv.className = 'chat-msg bot-msg';
    typingDiv.innerHTML = `<div class="msg-bubble" style="font-style: italic; color: var(--text-muted);">OpenAI API generating response...</div>`;
    chatMessagesArea.appendChild(typingDiv);
    chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;

    setTimeout(() => {
      const el = document.getElementById(typingId);
      if (el) el.remove();

      let reply = botResponses[userPrompt];
      if (!reply) {
        // Fallback dynamic response
        reply = `Based on nutritional parameters for "${userPrompt}": recommend targeting 25-30g protein per meal, emphasizing unprocessed whole foods, adequate dietary fiber (30g/day), and tracking cumulative caloric deficit/surplus against your personalized basal metabolic rate.`;
      }
      appendChatMessage('bot', reply);
    }, 700);
  }

  if (nutritionChatForm && nutritionUserInput) {
    nutritionChatForm.addEventListener('submit', e => {
      e.preventDefault();
      const text = nutritionUserInput.value.trim();
      if (!text) return;
      appendChatMessage('user', text);
      nutritionUserInput.value = '';
      simulateAiReply(text);
    });
  }

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      appendChatMessage('user', prompt);
      simulateAiReply(prompt);
    });
  });

  // Action buttons on project cards to scroll/focus interactive demo
  const testModelBtns = document.querySelectorAll('.test-model-btn');
  testModelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetEl.style.transition = 'box-shadow 0.4s ease';
        targetEl.style.boxShadow = '0 0 0 2px var(--accent-blue)';
        setTimeout(() => {
          targetEl.style.boxShadow = '';
        }, 1200);
      }
    });
  });

  // --- RESUME MODAL & PRINT HANDLER ---
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');
  const resumeOpenBtns = document.querySelectorAll('.resume-open-btn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('open');
      resumeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      resumeModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  resumeOpenBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openResumeModal();
    });
  });

  if (closeResumeModalBtn) {
    closeResumeModalBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', e => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('open')) {
      closeResumeModal();
    }
  });

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // --- COPY TO CLIPBOARD BUTTONS ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('srinivasupakkurthi2@gmail.com').then(() => {
        showToast('Email address copied to clipboard!');
      });
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+91-70952 64218').then(() => {
        showToast('Phone number copied to clipboard!');
      });
    });
  }

  // --- CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      // Form validation
      if (!name || !email || !subject || !message) {
        showToast('Please complete all form fields.');
        return;
      }

      showToast(`Thank you, ${name}! Generating email dispatch...`);

      // Pre-populate mailto for direct client sending
      const mailtoUri = `mailto:srinivasupakkurthi2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
      
      setTimeout(() => {
        contactForm.reset();
        window.location.href = mailtoUri;
      }, 900);
    });
  }

  // --- TOAST NOTIFICATION HELPER ---
  const toastContainer = document.getElementById('toastContainer');
  function showToast(message) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

})();
