/* ============================================================
   green-theme.js
   Дополнительная тема "Зелёное жидкое стекло" для Maxify.
   Подключается отдельным файлом, ничего в основном коде не меняет.
   Просто добавьте перед </body>:
       <script src="green-theme.js"></script>
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'maxify_green_theme';

  // ---------- CSS переменные зелёной темы ----------
  var css = `
    body.green {
      --bg-base: #03110a;
      --panel: rgba(10, 40, 25, 0.45);
      --glass-shine: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 40%);
      --panel-solid: #0c1f15;
      --border: rgba(120, 255, 180, 0.18);
      --border-light: rgba(120, 255, 180, 0.35);
      --border-inset: inset 0 1px 1px rgba(180,255,210,0.18), inset 0 -1px 1px rgba(0,0,0,0.35);
      --shadow-glass: 0 16px 40px rgba(0,0,0,0.35);

      --accent: #20D374;
      --accent-grad: linear-gradient(135deg, #3FF2A0 0%, #16B05E 100%);
      --glow: rgba(32, 211, 116, 0.35);

      --text: #ffffff;
      --text-primary: rgba(235, 255, 244, 0.96);
      --muted: rgba(200, 235, 215, 0.6);

      --danger: #FF6B5B;
      --danger-grad: linear-gradient(135deg, #FF8A77 0%, #FF5C45 100%);
      --ok: #38E07B;

      --input-bg: rgba(120, 255, 180, 0.07);
      --bubble-mine: var(--accent-grad);
      --bubble-mine-shadow: 0 4px 14px rgba(32, 211, 116, 0.35);
      --bubble-their: rgba(15, 50, 32, 0.65);
      --bubble-their-border: rgba(120, 255, 180, 0.12);

      --attach-bg: rgba(10, 35, 22, 0.9);
      --nav-bg: rgba(6, 24, 15, 0.8);

      --pinned-bg: rgba(32, 211, 116, 0.12);
      --reply-bg: rgba(120, 255, 180, 0.06);
      --reaction-bg: rgba(120, 255, 180, 0.12);
      --reaction-mine: rgba(32, 211, 116, 0.28);

      --mesh-1: rgba(32, 211, 116, 0.40);
      --mesh-2: rgba(63, 242, 160, 0.30);
      --mesh-3: rgba(120, 255, 200, 0.22);
      --nav-btn-active-bg: #06150d;
    }

    /* Кнопка переключателя темы */
    #gt-toggle-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: 1px solid rgba(120,255,180,0.35);
      background: linear-gradient(135deg, #3FF2A0 0%, #16B05E 100%);
      box-shadow: 0 8px 24px rgba(32,211,116,0.45), inset 0 1px 1px rgba(255,255,255,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      z-index: 99999;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      transition: transform 0.25s cubic-bezier(0.25,1.2,0.5,1), box-shadow 0.25s ease;
      user-select: none;
      -webkit-user-select: none;
    }
    #gt-toggle-btn:hover { transform: scale(1.08); }
    #gt-toggle-btn:active { transform: scale(0.92); }
    #gt-toggle-btn.active {
      background: linear-gradient(135deg, #0c1f15 0%, #03110a 100%);
      border-color: rgba(120,255,180,0.5);
    }

    @media (max-width: 640px) {
      #gt-toggle-btn {
        bottom: calc(96px + env(safe-area-inset-bottom));
        right: 16px;
        width: 50px;
        height: 50px;
        font-size: 21px;
      }
    }
  `;

  var styleTag = document.createElement('style');
  styleTag.id = 'gt-style';
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  // ---------- Кнопка ----------
  function createButton() {
    var btn = document.createElement('div');
    btn.id = 'gt-toggle-btn';
    btn.title = 'Зелёное жидкое стекло';
    btn.textContent = '🟢';
    btn.addEventListener('click', toggleGreenTheme);
    document.body.appendChild(btn);
    return btn;
  }

  function applyState(isOn, btn) {
    if (isOn) {
      document.body.classList.add('green');
      btn.classList.add('active');
      btn.textContent = '🌿';
    } else {
      document.body.classList.remove('green');
      btn.classList.remove('active');
      btn.textContent = '🟢';
    }
  }

  var btnRef = null;

  function toggleGreenTheme() {
    var isOn = !document.body.classList.contains('green');
    applyState(isOn, btnRef);
    try { localStorage.setItem(STORAGE_KEY, isOn ? '1' : '0'); } catch (e) {}
  }

  function init() {
    btnRef = createButton();
    var saved = false;
    try { saved = localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) {}
    applyState(saved, btnRef);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // даём основному скрипту время отрендерить root
    setTimeout(init, 300);
  } else {
    window.addEventListener('DOMContentLoaded', function () {
      setTimeout(init, 300);
    });
  }
})();
