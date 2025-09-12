
document.addEventListener('DOMContentLoaded', () => {

  // --- Improved ScrollSpy for Navbar (handles small last section) ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function onScroll() {
    let scrollPos = window.scrollY || window.pageYOffset;
    let offset = 120; // header height + margin
    let currentSection = null;
    let reachedBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 2);

    // If at the bottom, force last section
    if (reachedBottom && sections.length) {
      currentSection = sections[sections.length - 1];
    } else {
      sections.forEach(section => {
        if (section.offsetTop - offset <= scrollPos) {
          currentSection = section;
        }
      });
    }
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (
        currentSection &&
        link.getAttribute('href') === '#' + currentSection.id
      ) {
        link.classList.add('active');
      }
    });
  }

  // Also highlight on nav click (for small sections)
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').replace('#', '');
      setTimeout(() => {
        const section = document.getElementById(targetId);
        if (section) {
          navLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        }
      }, 300);
    });
  });

  window.addEventListener('scroll', onScroll);
  onScroll();

  // --- Header Scroll Effect ---
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- Section Fade-in Animation on Scroll ---
  const fadeElems = document.querySelectorAll('.fade-in');
  
  const observerOptions = {
    root: null, // observes intersections relative to the viewport
    rootMargin: '0px',
    threshold: 0.1 // trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once it's visible
      }
    });
  }, observerOptions);

  fadeElems.forEach(elem => {
    observer.observe(elem);
  });

});
