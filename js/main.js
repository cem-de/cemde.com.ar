
document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (!menuToggle || !menuClose || !navMenu || !menuOverlay) {
        return;
    }

    function openMenu() {
        navMenu.classList.add('active');
        menuOverlay.classList.add('active');

        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');

        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Cerrar al seleccionar una sección
    document.querySelectorAll('.nav-links a, .btn-nav-contacto').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

});


    


document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800; // Duración total en ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Función de aceleración suave (easeOutQuad)
        const currentCount = Math.floor(progress * (2 - progress) * target);
        
        counter.innerText = currentCount;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  // Observador para activar cuando la sección entra en el viewport
  const section = document.querySelector('#quienes-somos');
  if (section) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          startCounters();
          animated = true; // Ejecuta solo una vez
        }
      });
    }, { threshold: 0.3 });

    observer.observe(section);
  }
});