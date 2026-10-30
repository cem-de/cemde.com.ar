    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    function openMenu() {
      navMenu.classList.add('active');
      menuOverlay.classList.add('active');
    }

    function closeMenu() {
      navMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
    }

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Cerrar al hacer clic en un link
    document.querySelectorAll('.nav-links a, .btn-nav-contacto').forEach(link => {
      link.addEventListener('click', closeMenu);
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