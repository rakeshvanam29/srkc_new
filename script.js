// Responsive Navbar Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if(menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking on a link (mobile)
  const navItems = navLinks.querySelectorAll('a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  });
}

// Contact Form (no backend, just UI feedback)
const contactForm = document.querySelector('.contact-form');
if(contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for contacting SRKC Logistics! We will get back to you soon.');
    contactForm.reset();
  });
}
