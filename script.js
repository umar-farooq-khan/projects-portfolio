        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'custom-bg': '#0F172A',
                        'custom-card': '#1E293B',
                        'custom-text': '#C1C2C7',
                        'custom-gray': '#C1C2C7',
                        'custom-highlight': '#38BDF8',
                        'custom-accent': '#FFFFFF'
                    },
                    boxShadow: {
                        'custom': '0 4px 20px rgba(0, 0, 0, 0.2)',
                        'custom-hover': '0 8px 30px rgba(0, 0, 0, 0.3)'
                    }
                }
            }
        }
        // Replace all instances of these classes in the document
        document.body.innerHTML = document.body.innerHTML
            .replace(/bg-card-bg/g, 'bg-custom-card')
            .replace(/text-custom-text\/70/g, 'text-custom-gray')
            .replace(/text-custom-text/g, 'text-custom-text');
        
        // Popup functionality
        function openPopup(imageSrc, caption) {
            const modal = document.getElementById('imagePopup');
            const modalImg = document.getElementById('popupImage');
            const captionText = document.getElementById('popupCaption');
            
            modal.style.display = 'block';
            modalImg.src = imageSrc;
            captionText.innerHTML = caption;
            
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }
        
        function closePopup() {
            const modal = document.getElementById('imagePopup');
            modal.style.display = 'none';
            
            // Restore body scroll
            document.body.style.overflow = 'auto';
        }
        
        // Close modal when clicking outside the image
        document.getElementById('imagePopup').addEventListener('click', function(e) {
            if (e.target === this) {
                closePopup();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePopup();
            }
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Active navigation highlighting
        function updateActiveNav() {
            const sections = document.querySelectorAll('div[id]');
            const navLinks = document.querySelectorAll('nav a[href^="#"]');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }
        
        // Update active nav on scroll
        window.addEventListener('scroll', updateActiveNav);
        
        // Initial call to set active nav
        updateActiveNav();
