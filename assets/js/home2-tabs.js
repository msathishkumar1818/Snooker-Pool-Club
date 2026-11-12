/**
 * HOME 2 — Tab Switcher for Arena Table Deck
 * Lightweight vanilla JS. No libraries. External file only.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelectorAll('.h2-tab-btn');
    var panels = document.querySelectorAll('.h2-table-panel');

    if (!tabs.length || !panels.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var targetId = tab.getAttribute('data-target');

        // Deactivate all tabs
        tabs.forEach(function (t) {
          t.classList.remove('h2-tab-active');
          t.setAttribute('aria-selected', 'false');
        });

        // Hide all panels
        panels.forEach(function (p) {
          p.classList.remove('h2-panel-active');
        });

        // Activate clicked tab
        tab.classList.add('h2-tab-active');
        tab.setAttribute('aria-selected', 'true');

        // Show target panel
        var targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('h2-panel-active');
        }
      });
    });
  });
})();

