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

        // Load and render projects from JSON
        async function loadAndRenderProjects() {
            try {
                const response = await fetch('projects.json');
                if (!response.ok) throw new Error('Failed to fetch projects.json');
                const data = await response.json();

                console.log('Projects data loaded:', data);

                // Render professional experience
                if (data.experience && data.experience.length > 0) {
                    renderProfessionalExperience(data.experience);
                    console.log('Professional experience rendered');
                }

                // Render personal projects
                if (data.personal_projects && data.personal_projects.length > 0) {
                    renderPersonalProjects(data.personal_projects);
                    console.log('Personal projects rendered');
                }

                // Render hall of fame
                if (data.hall_of_fame && data.hall_of_fame.length > 0) {
                    renderHallOfFame(data.hall_of_fame);
                    console.log('Hall of fame rendered');
                }

                // Render thesis projects
                if (data.thesis_projects && data.thesis_projects.length > 0) {
                    renderThesisProjects(data.thesis_projects);
                    console.log('Thesis projects rendered');
                }
            } catch (error) {
                console.error('Error loading projects:', error);
            }
        }

        function renderProfessionalExperience(experiences) {
            const container = document.getElementById('professional-experience');
            if (!container) return;

            let html = '<h2 class="text-3xl font-semibold mb-10 gradient-text">Professional Experience</h2><div class="grid grid-cols-1 gap-8">';

            experiences.forEach((exp, index) => {
                const collapseId = `exp-collapse-${index}`;
                html += `
                    <div class="glass-card rounded-xl overflow-hidden">
                        <button class="collapsible-header w-full px-6 py-3 text-left hover:bg-opacity-50 transition-all" onclick="toggleCollapsible('${collapseId}')">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <h3 class="text-2xl font-semibold text-custom-accent">${exp.title} | ${exp.company}</h3>
                                    <p class="text-sm text-custom-gray">${exp.location} | ${exp.duration}</p>
                                </div>
                                <div class="ml-4 flex-shrink-0">
                                    <svg class="toggle-icon w-6 h-6 text-custom-highlight transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                    </svg>
                                </div>
                            </div>
                        </button>
                        <div id="${collapseId}" class="collapsible-content hidden border-t border-opacity-10 border-custom-highlight">
                            <div class="px-6 py-3 text-custom-text text-base space-y-3 opacity-90">
                                <p class="font-medium text-custom-highlight">Key Achievements:</p>
                                <div class="list-none space-y-1 pl-0 leading-relaxed">
                                    ${exp.highlights.map(h => `<div class="flex items-start"><span class="mr-3 text-custom-highlight">•</span><span>${h}</span></div>`).join('')}
                                </div>
                                ${exp.technologies ? `<p><span class="font-medium text-custom-highlight">Technologies:</span> <span class="text-custom-gray">${exp.technologies.join(', ')}</span></p>` : ''}
                                ${exp.note ? `<p><span class="font-medium text-custom-highlight">Notable:</span> <span class="text-custom-gray">${exp.note}</span></p>` : ''}
                            </div>
                        </div>
                    </div>
                `;
            });

            html += '</div>';
            container.innerHTML = html;
        }

        function toggleCollapsible(id) {
            const content = document.getElementById(id);
            const button = content.previousElementSibling;
            const icon = button.querySelector('.toggle-icon');

            content.classList.toggle('hidden');
            icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        }

        function renderPersonalProjects(projects) {
            const container = document.getElementById('personal-projects-list');
            if (!container) return;

            let html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-8">';

            projects.forEach(project => {
                html += `
                    <div class="glass-card p-8 rounded-xl">
                        <div class="text-sm text-custom-highlight mb-3 font-medium">${project.category}</div>
                        <h3 class="text-2xl font-semibold mb-6 text-custom-accent">${project.name}</h3>
                        <div class="text-custom-text text-base space-y-4 opacity-90">
                            <p class="leading-relaxed">${project.description}</p>
                            ${project.highlights ? `
                                <p class="font-medium text-custom-highlight">Key Points:</p>
                                <div class="list-none space-y-2 pl-0 leading-relaxed">
                                    ${project.highlights.map(h => `<div class="flex items-start"><span class="mr-3 text-custom-highlight">•</span><span>${h}</span></div>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                        ${project.links ? `
                            <div class="flex items-center space-x-6 mt-6">
                                ${Object.entries(project.links).map(([key, url]) =>
                                    `<a href="${url}" target="_blank" class="link-hover text-base font-semibold text-custom-highlight">${key.charAt(0).toUpperCase() + key.slice(1)} ↗</a>`
                                ).join('')}
                            </div>
                        ` : ''}
                    </div>
                `;
            });

            html += '</div>';
            container.innerHTML = html;
        }

        function renderHallOfFame(projects) {
            const container = document.getElementById('hall-of-fame-list');
            if (!container) return;

            let html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-8">';

            projects.forEach(project => {
                html += `
                    <div class="glass-card p-8 rounded-xl">
                        <div class="text-sm text-custom-highlight mb-3 font-medium">${project.category}</div>
                        <h3 class="text-2xl font-semibold mb-6 text-custom-accent">
                            ${project.name}
                            ${project.repeated ? '<span class="ml-3 inline-block px-2 py-1 text-xs bg-custom-highlight text-custom-bg rounded font-semibold">Repeated</span>' : ''}
                        </h3>
                        <div class="text-custom-text text-base space-y-4 opacity-90">
                            <p class="leading-relaxed">${project.description}</p>
                            ${project.highlights ? `
                                <div class="list-none space-y-2 pl-0 leading-relaxed">
                                    ${project.highlights.map(h => `<div class="flex items-start"><span class="mr-3 text-custom-highlight">•</span><span>${h}</span></div>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                        ${project.links ? `
                            <div class="flex items-center space-x-6 mt-6">
                                ${Object.entries(project.links).map(([key, url]) =>
                                    `<a href="${url}" target="_blank" class="link-hover text-base font-semibold text-custom-highlight">${key.charAt(0).toUpperCase() + key.slice(1)} ↗</a>`
                                ).join('')}
                            </div>
                        ` : ''}
                    </div>
                `;
            });

            html += '</div>';
            container.innerHTML = html;
        }

        function renderThesisProjects(projects) {
            const container = document.getElementById('thesis-projects-list');
            if (!container) return;

            let html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-8">';

            projects.forEach(project => {
                html += `
                    <div class="glass-card p-8 rounded-xl">
                        <div class="text-sm text-custom-highlight mb-3 font-medium">RESEARCH</div>
                        <h3 class="text-2xl font-semibold mb-6 text-custom-accent">${project.name}</h3>
                        <div class="text-custom-text text-base space-y-4 opacity-90">
                            ${project.status ? `<p class="font-medium text-custom-highlight">Status: ${project.status}</p>` : ''}
                            <div class="list-none space-y-2 pl-0 leading-relaxed">
                                ${project.highlights.map(h => `<div class="flex items-start"><span class="mr-3 text-custom-highlight">•</span><span>${h}</span></div>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
            });

            html += '</div>';
            container.innerHTML = html;
        }
