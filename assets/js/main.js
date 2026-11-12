/**
 * THE CUE CLUB - SHARED JAVASCRIPT (main.js)
 * Clean, Modular Vanilla JavaScript
 * Handles: Loader, Fixed Header, Click-Only Dropdowns, Mobile Drawer & Accordion,
 * Strict #000000 Dark Mode, RTL/LTR State Persistence, Scroll-to-Top, Active Navigation.
 */

(function () {
  'use strict';

  // --- 1. DOM Ready Helper ---
  document.addEventListener('DOMContentLoaded', initApp);

  function initApp() {
    initLoader();
    initTheme();
    initDirection();
    initHeaderScroll();
    initHomeDropdown();
    initMobileMenu();
    initMobileAccordion();
    initScrollToTop();
    initActiveNav();
  }

  // --- 2. Branded Page Loader ---
  function initLoader() {
    const loader = document.getElementById('cue-loader');
    if (!loader) return;

    const hideLoader = () => {
      loader.classList.add('loaded');
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 600);
    };

    if (document.readyState === 'complete') {
      setTimeout(hideLoader, 350);
    } else {
      window.addEventListener('load', () => setTimeout(hideLoader, 350));
      // Failsafe timeout
      setTimeout(hideLoader, 2500);
    }
  }

  // --- 3. Dark Mode (#000000 Pure Black) with Persistence ---
  function initTheme() {
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    const root = document.documentElement;
    const STORAGE_KEY = 'cue_theme_mode';

    // Check saved preference or default to dark mode for elite snooker club ambiance
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'light') {
      root.classList.remove('dark');
    } else {
      // Default to luxury dark mode
      root.classList.add('dark');
    }

    themeToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        const isDark = root.classList.toggle('dark');
        localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
        btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      });
    });
  }

  // --- 4. RTL / LTR Direction with Persistence ---
  function initDirection() {
    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
    const root = document.documentElement;
    const STORAGE_KEY = 'cue_text_direction';

    const savedDir = localStorage.getItem(STORAGE_KEY) || 'ltr';
    root.setAttribute('dir', savedDir);

    rtlToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentDir = root.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        root.setAttribute('dir', newDir);
        localStorage.setItem(STORAGE_KEY, newDir);
        btn.setAttribute('aria-label', newDir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
      });
    });
  }

  // --- 5. Header Scroll Effect ---
  function initHeaderScroll() {
    const header = document.querySelector('.cue-header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --- 6. Desktop Home Dropdown (STRICT CLICK-ONLY, Hover NEVER opens it) ---
  function initHomeDropdown() {
    const dropdownItem = document.querySelector('.nav-item.has-dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (!dropdownItem || !dropdownToggle) return;

    dropdownToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = dropdownItem.classList.toggle('dropdown-open');
      dropdownToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close when clicking anywhere outside
    document.addEventListener('click', function (e) {
      if (!dropdownItem.contains(e.target)) {
        dropdownItem.classList.remove('dropdown-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dropdownItem.classList.contains('dropdown-open')) {
        dropdownItem.classList.remove('dropdown-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
        dropdownToggle.focus();
      }
    });
  }

  // --- 7. Mobile Menu Drawer ---
  function initMobileMenu() {
    const body = document.body;
    const openBtn = document.querySelector('.mobile-toggle-btn');
    const closeBtn = document.querySelector('.drawer-close-btn');
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    const drawerLinks = document.querySelectorAll('.mobile-menu-drawer a:not(.mobile-accordion-toggle)');

    if (!openBtn) return;

    function openMobileMenu() {
      body.classList.add('mobile-menu-open');
      openBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMobileMenu() {
      body.classList.remove('mobile-menu-open');
      openBtn.setAttribute('aria-expanded', 'false');
      const accParent = document.querySelector('.mobile-accordion-item');
      const accToggle = document.querySelector('.mobile-accordion-toggle');
      if (accParent) accParent.classList.remove('mobile-accordion-open');
      if (accToggle) accToggle.setAttribute('aria-expanded', 'false');
    }

    openBtn.addEventListener('click', openMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
    if (backdrop) backdrop.addEventListener('click', closeMobileMenu);

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('mobile-menu-open')) {
        closeMobileMenu();
      }
    });

    // Clicking ANY navigation item must close the mobile menu
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  // --- 8. Mobile Accordion for Home (STRICT CLICK-ONLY) ---
  function initMobileAccordion() {
    const accordionToggle = document.querySelector('.mobile-accordion-toggle');
    const accordionParent = document.querySelector('.mobile-accordion-item');

    if (!accordionToggle || !accordionParent) return;

    // Ensure closed by default on load
    accordionParent.classList.remove('mobile-accordion-open');
    accordionToggle.setAttribute('aria-expanded', 'false');

    accordionToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = accordionParent.classList.toggle('mobile-accordion-open');
      accordionToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Clicking outside Home accordion closes it automatically
    document.addEventListener('click', function (e) {
      if (!accordionParent.contains(e.target) && accordionParent.classList.contains('mobile-accordion-open')) {
        accordionParent.classList.remove('mobile-accordion-open');
        accordionToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 9. Scroll to Top Button ---
  function initScrollToTop() {
    // Support both id="scroll-to-top" and class="scroll-top-btn"
    const scrollBtn = document.getElementById('scroll-to-top') ||
                      document.querySelector('.scroll-top-btn');
    if (!scrollBtn) return;

    const toggleBtnVisibility = () => {
      if (window.scrollY > 350) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleBtnVisibility, { passive: true });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 10. Active Navigation Highlighter ---
  function initActiveNav() {
    const rawName = window.location.pathname.toLowerCase().split('/').pop();
    const currentPath = rawName || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link, .mobile-nav-link, .mobile-sub-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPath = href.toLowerCase().split('/').pop();

      if (linkPath === currentPath) {
        link.classList.add('active');
        // Highlight parent Desktop Home toggle if on Home 1 or Home 2
        const parentDropdown = link.closest('.has-dropdown');
        if (parentDropdown) {
          const parentToggle = parentDropdown.querySelector('.dropdown-toggle');
          if (parentToggle) parentToggle.classList.add('active');
        }
        // Highlight parent Mobile Home toggle if on Home 1 or Home 2
        const parentAccordion = link.closest('.mobile-accordion-item');
        if (parentAccordion) {
          const accToggle = parentAccordion.querySelector('.mobile-accordion-toggle');
          if (accToggle) accToggle.classList.add('active');
        }
      }
    });
  }

})();

/* ==========================================================================
   TOURNAMENT COUNTDOWN TIMER
   Only runs if countdown elements exist (tournaments.html)
   ========================================================================== */
(function () {
  'use strict';

  var dEl = document.getElementById('tn-days');
  var hEl = document.getElementById('tn-hours');
  var mEl = document.getElementById('tn-mins');
  var sEl = document.getElementById('tn-secs');

  if (!dEl || !hEl || !mEl || !sEl) return;

  var target = new Date('2026-12-14T10:00:00').getTime();

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tick() {
    var now = Date.now();
    var diff = target - now;
    if (diff <= 0) {
      dEl.textContent = '00'; hEl.textContent = '00';
      mEl.textContent = '00'; sEl.textContent = '00';
      return;
    }
    var days  = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins  = Math.floor((diff % 3600000)  / 60000);
    var secs  = Math.floor((diff % 60000)    / 1000);
    dEl.textContent = pad(days);
    hEl.textContent = pad(hours);
    mEl.textContent = pad(mins);
    sEl.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();
