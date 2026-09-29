/* ===================================================================
   SINAN MANNA — AINANAI-THEME INTERACTIVITY SCRIPT
   Features: Mobile Drawer, Clipboard Copy, Toast Alerts, Tech Stack Hover
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initPaletteSwitcher();
  updateCurrentYear();
  initTechStackHover();
});

/* ===================================================================
   PALETTE SWITCHER
   =================================================================== */
function initPaletteSwitcher() {
  const btns = document.querySelectorAll('.palette-dot-btn');
  const root = document.documentElement;

  const saved = localStorage.getItem('sm_palette');
  if (saved !== null) {
    root.setAttribute('data-palette', saved);
    btns.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-palette') === saved);
    });
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const p = btn.getAttribute('data-palette');
      root.setAttribute('data-palette', p);
      localStorage.setItem('sm_palette', p);
      const names = { '': 'Warm Sand & Obsidian (Editorial)', 'olive': 'Luxury Olive & Ivory', 'cobalt': 'Royal Cobalt Tech', 'amber': 'Warm Terracotta', 'dark': 'Obsidian Dark' };
      showNotification(`Color Palette: ${names[p] || 'Sand & Obsidian'}`);
    });
  });
}

/* ===================================================================
   MOBILE DRAWER NAVIGATION
   =================================================================== */
function initMobileDrawer() {
  const trigger = document.getElementById('mobileMenuTrigger');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const links = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (drawer) {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer) {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (trigger) {
    trigger.addEventListener('click', openDrawer);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  links.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('click', (e) => {
    if (drawer && drawer.classList.contains('open') &&
        !drawer.contains(e.target) &&
        !trigger.contains(e.target)) {
      closeDrawer();
    }
  });
}

/* ===================================================================
   TECH STACK HOVER ANIMATION
   =================================================================== */
function initTechStackHover() {
  const icons = document.querySelectorAll('.tech-icon-item');
  icons.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const frame = item.querySelector('.icon-frame');
      if (frame) {
        frame.style.transform = 'translateY(-6px) scale(1.15)';
      }
    });
    item.addEventListener('mouseleave', () => {
      const frame = item.querySelector('.icon-frame');
      if (frame) {
        frame.style.transform = 'translateY(0) scale(1)';
      }
    });
  });
}

/* ===================================================================
   CLIPBOARD COPY HELPER
   =================================================================== */
function copyToClipboard(text, message = 'Copied to clipboard!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification(message);
    }).catch(() => {
      fallbackCopy(text, message);
    });
  } else {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showNotification(message);
  } catch (e) {
    showNotification('Could not copy.');
  }
  document.body.removeChild(ta);
}

window.copyToClipboard = copyToClipboard;

/* ===================================================================
   TOAST NOTIFICATION
   =================================================================== */
function showNotification(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = `<span style="color:#DC2626;margin-right:6px;">■</span> ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

window.showNotification = showNotification;

/* ===================================================================
   CURRENT YEAR
   =================================================================== */
function updateCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
