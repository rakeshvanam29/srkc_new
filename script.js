// Component Loader
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
    }
  } catch (error) {
    console.error(`Error loading component ${componentPath}:`, error);
  }
}

// Load header and footer components
document.addEventListener('DOMContentLoaded', async function() {
  // Load components
  await loadComponent('header-placeholder', 'components/header.html');
  await loadComponent('footer-placeholder', 'components/footer.html');
  
  // Initialize navigation after header is loaded
  initializeNavigation();
  
  // Initialize tabs if on coverage page
  initializeTabs();
  
  // Highlight active navigation item
  highlightActiveNavItem();
});

// Navigation functionality
function initializeNavigation() {
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
}

// Highlight active navigation item based on current page
function highlightActiveNavItem() {
  // Get current page filename
  let currentPage = window.location.pathname.split('/').pop();
  
  // Handle index page and empty paths
  if (currentPage === '' || currentPage === '/') {
    currentPage = 'index.html';
  }
  
  // Map of page files to navigation links
  const pageMapping = {
    'index.html': 'index.html',
    'about.html': 'about.html',
    'services.html': 'services.html',
    'coverage.html': 'coverage.html',
    'industries.html': 'industries.html',
    'track.html': 'track.html',
    'contact.html': 'contact.html'
  };
  
  // Wait a bit for navigation to load, then highlight
  setTimeout(() => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === pageMapping[currentPage]) {
        link.classList.add('active');
      }
    });
  }, 100);
}

// Contact Form (no backend, just UI feedback)
const contactForm = document.querySelector('.contact-form');
if(contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for contacting SRKC Cargo! We will get back to you soon.');
    contactForm.reset();
  });
}

// Tab functionality for coverage page
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const tabButtonsContainer = document.querySelector('.tab-buttons');

  if (tabButtons.length === 0) return; // Not on coverage page

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      // Add active class to clicked button and corresponding panel
      button.classList.add('active');
      const targetPanel = document.getElementById(targetTab);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      // Scroll the active tab button into view for better visibility
      if (tabButtonsContainer && button) {
        const containerRect = tabButtonsContainer.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        
        // Calculate if the button is outside the visible area
        const isButtonOutOfView = buttonRect.left < containerRect.left || 
                                  buttonRect.right > containerRect.right;
        
        if (isButtonOutOfView) {
          // Calculate the scroll position to center the button
          const containerCenter = containerRect.width / 2;
          const buttonCenter = buttonRect.width / 2;
          const scrollLeft = button.offsetLeft - containerCenter + buttonCenter;
          
          // Smooth scroll the tab container
          tabButtonsContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}
