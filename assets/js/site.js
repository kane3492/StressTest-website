(function() {
  function initNav() {
    const overlay = document.getElementById('navOverlay');
    const drawer = document.getElementById('navDrawer');
    const hamburger = document.getElementById('hamburger');
    if (!overlay || !drawer) return;
    const openNav = function() {
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const closeNav = function() {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };
    if (hamburger) hamburger.addEventListener('click', openNav);
    overlay.addEventListener('click', closeNav);
    document.querySelectorAll('[data-close-nav]').forEach(function(btn) {
      btn.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeNav();
    });
    window.openNav = openNav;
    window.closeNav = closeNav;
  }

  function initEmailLinks() {
    document.querySelectorAll('[data-email-user]').forEach(function(link) {
      const user = link.getAttribute('data-email-user') || 'contact';
      const domain = link.getAttribute('data-email-domain') || 'stresstest.uk';
      const email = user + '@' + domain;
      link.href = 'mailto:' + email;
      const textTarget = link.getAttribute('data-email-text-target');
      if (textTarget) {
        const target = document.getElementById(textTarget);
        if (target) target.textContent = email;
      }
    });
  }

  function initRipples() {
    document.querySelectorAll('.btn').forEach(function(btn) {
      btn.addEventListener('mousedown', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ripple = document.createElement('span');
        Object.assign(ripple.style, {
          position: 'absolute',
          borderRadius: '50%',
          width: '8px',
          height: '8px',
          left: x + 'px',
          top: y + 'px',
          transform: 'translate(-50%,-50%) scale(0)',
          background: 'rgba(255,255,255,0.3)',
          animation: 'rippleOut 0.6s cubic-bezier(.16,1,.3,1) forwards',
          pointerEvents: 'none'
        });
        this.appendChild(ripple);
        setTimeout(function() { ripple.remove(); }, 700);
      });
    });
  }

  function initCarousels() {
    document.querySelectorAll('.carousel').forEach(function(carousel) {
      const track = carousel.querySelector('.carousel-track');
      const slides = track ? Array.from(track.children) : [];
      const dotsContainer = carousel.querySelector('.carousel-dots');
      const prevBtn = carousel.querySelector('.carousel-btn.prev');
      const nextBtn = carousel.querySelector('.carousel-btn.next');
      if (!track || slides.length <= 1) return;
      let index = 0;
      function render() {
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        if (dotsContainer) {
          Array.from(dotsContainer.children).forEach(function(dot, dotIndex) {
            dot.classList.toggle('active', dotIndex === index);
          });
        }
      }
      if (dotsContainer) {
        slides.forEach(function(_, dotIndex) {
          const dot = document.createElement('button');
          dot.className = 'dot' + (dotIndex === 0 ? ' active' : '');
          dot.type = 'button';
          dot.setAttribute('aria-label', 'Go to slide ' + (dotIndex + 1));
          dot.addEventListener('click', function() {
            index = dotIndex;
            render();
          });
          dotsContainer.appendChild(dot);
        });
      }
      if (prevBtn) prevBtn.addEventListener('click', function() { index = (index - 1 + slides.length) % slides.length; render(); });
      if (nextBtn) nextBtn.addEventListener('click', function() { index = (index + 1) % slides.length; render(); });
      render();
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initNav();
    initEmailLinks();
    initRipples();
    initCarousels();
  });
})();
