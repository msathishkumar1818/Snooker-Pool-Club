/* ==========================================================================
   LOGIN TABS — login-tabs.js
   Controls Login / Register tab switching on login.html
   ========================================================================== */

(function () {
  'use strict';

  function initLoginTabs() {
    var tabs = document.querySelectorAll('.lg-tab');
    var panels = document.querySelectorAll('.lg-panel');
    var formTitle = document.getElementById('lg-form-title');
    var formSubtitle = document.getElementById('lg-form-subtitle');

    if (!tabs.length || !panels.length) return;

    var titles = {
      login: 'Welcome Back',
      register: 'Create Account'
    };
    var subtitles = {
      login: 'Sign in to your member account to book tables and manage your profile.',
      register: 'Join The Cue Club today and unlock exclusive member privileges.'
    };

    function activateTab(targetId) {
      tabs.forEach(function (tab) {
        var isActive = tab.dataset.tab === targetId;
        tab.classList.toggle('lg-tab-active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      panels.forEach(function (panel) {
        var isActive = panel.id === 'lg-panel-' + targetId;
        panel.classList.toggle('lg-panel-active', isActive);
      });

      if (formTitle) formTitle.textContent = titles[targetId] || '';
      if (formSubtitle) formSubtitle.textContent = subtitles[targetId] || '';
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateTab(tab.dataset.tab);
      });
    });

    // Init first tab active
    var firstTab = tabs[0];
    if (firstTab) activateTab(firstTab.dataset.tab);

    // "Switch to Register" link
    var switchToRegister = document.getElementById('switch-to-register');
    var switchToLogin = document.getElementById('switch-to-login');

    if (switchToRegister) {
      switchToRegister.addEventListener('click', function (e) {
        e.preventDefault();
        activateTab('register');
      });
    }
    if (switchToLogin) {
      switchToLogin.addEventListener('click', function (e) {
        e.preventDefault();
        activateTab('login');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoginTabs);
  } else {
    initLoginTabs();
  }
})();

