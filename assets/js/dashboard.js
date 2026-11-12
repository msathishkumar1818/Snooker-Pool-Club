/* ==========================================================================
   THE CUE CLUB - MEMBER DASHBOARD SCRIPT (dashboard.js)
   Features:
   - Sidebar Tab Switching (Overview, Tables, Hours, Tournaments, Plan, Profile)
   - Synchronized Dark Mode (#000000) & RTL/LTR support with persistence
   - Mobile Sidebar Toggle & auto-close
   - Interactive Table Slot Selection & Instant Confirmation Modal
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. Theme Management ---
  function initDashboardTheme() {
    const themeBtns = document.querySelectorAll('.db-theme-toggle-btn, #db-theme-toggle');
    const STORAGE_KEY = 'cue_theme_mode';
    const savedTheme = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('cue_theme');

    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }

    themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
      });
    });
  }

  // --- 2. RTL/LTR Management ---
  function initDashboardRTL() {
    const rtlBtns = document.querySelectorAll('.db-rtl-toggle-btn, #db-rtl-toggle');
    const STORAGE_KEY = 'cue_text_direction';
    const savedDir = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('cue_direction') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);

    rtlBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem(STORAGE_KEY, newDir);
      });
    });
  }

  // --- 3. Sidebar Navigation & Tab Switching ---
  function initDashboardTabs() {
    const navItems = document.querySelectorAll('.db-nav-item');
    const tabPanels = document.querySelectorAll('.db-tab-panel');
    const sidebar = document.getElementById('db-sidebar');
    const mobileToggle = document.getElementById('db-mobile-toggle');

    navItems.forEach(item => {
      const btn = item.querySelector('button');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        if (!targetTab) return;

        // Switch active nav item
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Switch visible panel
        tabPanels.forEach(panel => {
          if (panel.id === `tab-${targetTab}`) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });

        // Close mobile sidebar if open
        if (sidebar && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Mobile Sidebar Toggle
    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target) && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
        }
      });
    }

    // Direct Action Links with data-switch-tab attribute
    const switchLinks = document.querySelectorAll('[data-switch-tab]');
    switchLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tabName = link.getAttribute('data-switch-tab');
        const targetBtn = document.querySelector(`.db-nav-item button[data-tab="${tabName}"]`);
        if (targetBtn) {
          targetBtn.click();
        }
      });
    });
  }

  // --- 4. Interactive Table Slot Selection & Modal ---
  function initBookingInteraction() {
    const slotPills = document.querySelectorAll('.db-slot-pill');
    const modal = document.getElementById('db-booking-modal');
    const modalClose = document.getElementById('db-modal-close');
    const modalConfirm = document.getElementById('db-modal-confirm');
    const modalTableTxt = document.getElementById('db-modal-table');
    const modalSlotTxt = document.getElementById('db-modal-slot');

    let selectedTable = '';
    let selectedSlot = '';

    slotPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = pill.closest('.db-table-card');
        const tableNum = card ? card.querySelector('.db-table-card-num').textContent.trim() : 'Table';
        const timeSlot = pill.textContent.trim();

        // Highlight
        slotPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        selectedTable = tableNum;
        selectedSlot = timeSlot;

        if (modal && modalTableTxt && modalSlotTxt) {
          modalTableTxt.textContent = selectedTable;
          modalSlotTxt.textContent = selectedSlot;
          modal.classList.add('active');
        }
      });
    });

    if (modalClose && modal) {
      modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    if (modalConfirm && modal) {
      modalConfirm.addEventListener('click', () => {
        modalConfirm.innerHTML = `
          <svg style="width:16px;height:16px;animation:spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
          </svg> Confirming Reservation...
        `;
        setTimeout(() => {
          modal.classList.remove('active');
          modalConfirm.textContent = 'Confirm Reservation';
          alert(`Success! ${selectedTable} has been reserved for ${selectedSlot}. A notification has been sent to your concierge.`);
        }, 800);
      });
    }
  }

  // --- Init All ---
  document.addEventListener('DOMContentLoaded', () => {
    initDashboardTheme();
    initDashboardRTL();
    initDashboardTabs();
    initBookingInteraction();
  });
})();

