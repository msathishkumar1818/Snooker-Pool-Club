/* ==========================================================================
   PRICING FAQ ACCORDION — pricing-faq.js
   Handles FAQ expand/collapse on pricing.html
   ========================================================================== */

(function () {
  'use strict';

  function initFaq() {
    var toggles = document.querySelectorAll('.pr-faq-toggle');
    if (!toggles.length) return;

    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var isOpen = toggle.getAttribute('aria-expanded') === 'true';
        var answerId = toggle.getAttribute('aria-controls');
        var answer = answerId ? document.getElementById(answerId) : null;

        // Close all
        toggles.forEach(function (t) {
          t.setAttribute('aria-expanded', 'false');
          var aId = t.getAttribute('aria-controls');
          var a = aId ? document.getElementById(aId) : null;
          if (a) a.classList.remove('open');
        });

        // Open clicked (if was closed)
        if (!isOpen && answer) {
          toggle.setAttribute('aria-expanded', 'true');
          answer.classList.add('open');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaq);
  } else {
    initFaq();
  }
})();

