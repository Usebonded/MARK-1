/* ==========================================================================
   Savar Shetty Portfolio Custom Logic Layer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial Page Load Transition Out
  initPageLoadTransition();

  // 2. In-view Scroll Animations (Intersection Observer)
  initScrollAnimations();

  // 3. Mobile Navigation Drawer Toggle
  initMobileMenu();

  // 4. Smooth Page Out Transitions
  initPageExitLinks();

  // 5. Home Page Terminal Simulation CLI Widget
  initTerminalWidget();

  // 6. Magnetic Hover Buttons Effect
  initMagneticHover();
});

/* --- 1. Page Load Transition --- */
function initPageLoadTransition() {
  // Create transition overlay dynamically if not in HTML
  let overlay = document.querySelector('.page-transition-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay active';
    document.body.appendChild(overlay);
  }
  
  // Transition out on load
  setTimeout(() => {
    overlay.classList.remove('active');
  }, 100);
}

/* --- 2. Scroll Animations --- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

/* --- 3. Mobile Menu Toggle --- */
function initMobileMenu() {
  const menuTrigger = document.querySelector('.nav-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuClose = document.querySelector('.mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuTrigger && mobileMenu) {
    menuTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      mobileMenu.classList.add('open');
    });

    const closeMenu = () => {
      mobileMenu.classList.remove('open');
    };

    if (menuClose) menuClose.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
  }
}

/* --- 4. Page Exit Transition --- */
function initPageExitLinks() {
  const links = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])');
  const overlay = document.querySelector('.page-transition-overlay');

  if (overlay) {
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only run for internal html files or root
        if (href && (href.endsWith('.html') || href === '/' || href.startsWith('./') || href.startsWith('../'))) {
          e.preventDefault();
          overlay.classList.add('active');
          setTimeout(() => {
            window.location.href = href;
          }, 550); // Match CSS transition timing
        }
      });
    });
  }
}

/* --- 5. Interactive Simulated CLI Terminal --- */
function initTerminalWidget() {
  const inputEl = document.getElementById('terminal-input');
  const outputEl = document.getElementById('terminal-output');

  if (!inputEl || !outputEl) return;

  const welcomeMessage = `
Welcome to SAVAR.SHETTY terminal matrix v1.0.4.
Type <span class="terminal-welcome">help</span> for a list of available telemetry queries.
`;
  outputEl.innerHTML = welcomeMessage.trim() + '<br><br>';

  const commands = {
    help: () => `
Available system commands:
  - <span class="terminal-welcome">projects</span>    : Output active development register
  - <span class="terminal-welcome">about</span>       : Print bio metrics and education background
  - <span class="terminal-welcome">hackathons</span>  : Fetch competitive ecosystem register
  - <span class="terminal-welcome">systems</span>     : Core logic stack and training telemetry
  - <span class="terminal-welcome">contact</span>     : Retrieve contact endpoints and social hubs
  - <span class="terminal-welcome">clear</span>       : Flush terminal output register
`,
    projects: () => `
ACTIVE DEVELOPMENT REGISTER:
[01] Stock Trading Bot (Completed)
     - RL agent optimized for simulate market actions.
     - Tech: Q-Learning / Deep Q / Python.
[02] Rapid Crisis System (In Progress)
     - Multi-node rapid response framework.
     - Tech: Hospitality operations emergency update logic.
[03] Analytics & Pipelines (Completed)
     - Data analytics, visualization interfaces.
     - Tech: Python / Certification framework architectures.
`,
    about: () => `
SUBJECT METRICS:
  - Name       : Savar Satish Shetty
  - Education  : Node: Symbiosis SSPU (Skills & Professional University)
  - Focus Area : Artificial Intelligence & Machine Learning (AI/ML)
  - Objective  : Engineering reinforcement learning loops & agentic pipelines
`,
    hackathons: () => `
COMPETITIVE ECOSYSTEM PARTICIPATION:
  - Solution Challenge 2026: Team "Git Gud" (Build with AI)
  - IMACE Open Innovation : Hosted by GDG on Campus, Gemini configurations
  - CODEMOHATSAV 2025     : END-to-END challenge pipeline
`,
    systems: () => `
CORE TELEMETRY:
  - Convergence Stability : 99.9%
  - Accuracy Rate        : 98.4%
  - Loss Rate Minimum    : 0.002
  - Core Stack           : Python, n8n Agent Workflows, Data Structures
`,
    contact: () => `
CONTACT ENDPOINTS:
  - Email      : savar.satish.shetty@gmail.com
  - Github     : github.com/savar-shetty (Placeholder)
  - LinkedIn   : linkedin.com/in/savar-shetty (Placeholder)
`
  };

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const commandText = inputEl.value.trim().toLowerCase();
      inputEl.value = '';

      if (commandText === '') return;

      // Echo command
      outputEl.innerHTML += `<div class="terminal-input-row"><span class="terminal-prompt">&gt;</span> <span class="terminal-echo">${commandText}</span></div>`;

      if (commandText === 'clear') {
        outputEl.innerHTML = '';
      } else if (commands[commandText]) {
        outputEl.innerHTML += `<div class="terminal-line">${commands[commandText]()}</div><br>`;
      } else {
        outputEl.innerHTML += `<div class="terminal-line text-glow" style="color: #ef4444">Unknown system parameter "${commandText}". Type "help" for query index.</div><br>`;
      }

      // Auto scroll
      const container = document.getElementById('terminal-body-container') || outputEl;
      container.scrollTop = container.scrollHeight;
    }
  });

  // Focus input on body container click
  const terminalBody = document.getElementById('terminal-body-container');
  if (terminalBody) {
    terminalBody.addEventListener('click', () => {
      inputEl.focus();
    });
  }
}

/* --- 6. Magnetic Hover Buttons Effect --- */
function initMagneticHover() {
  const magneticEls = document.querySelectorAll('.magnetic');

  magneticEls.forEach(el => {
    el.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Move element gently towards cursor coordinate
      this.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35}px, 0)`;
      this.style.transition = 'transform 0.1s ease-out';
    });

    el.addEventListener('mouseleave', function() {
      // Snap back to base position
      this.style.transform = `translate3d(0px, 0px, 0)`;
      this.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });
  });
}
