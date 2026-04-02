// Design Switcher
const DESIGNS = {
    current: {
        name: 'Current',
        stylesheet: 'styles.css',
        class: 'design-current'
    },
    swiss: {
        name: 'Swiss',
        stylesheet: 'styles-swiss.css',
        class: 'design-swiss'
    }
};

const STORAGE_KEY = 'portfolio-design';

function switchDesign(designKey) {
    const design = DESIGNS[designKey];
    if (!design) return;

    // Update stylesheet
    const themeLink = document.getElementById('theme-stylesheet');
    themeLink.href = design.stylesheet;

    // Update button text
    const btn = document.getElementById('design-switcher');
    btn.textContent = `🎨 Design: ${design.name}`;

    // Store preference
    localStorage.setItem(STORAGE_KEY, designKey);

    // Update body class for design-specific styling
    document.body.className = document.body.className.replace(/design-\w+/, '');
    document.body.classList.add(design.class);

    // Force page refresh to properly apply styles
    setTimeout(() => {
        document.body.style.backgroundColor = designKey === 'swiss' ? '#FFFFFF' : '';
    }, 0);

    // Update popup modal styling for Swiss design
    updatePopupStyling(designKey);
    
    // Update button styling
    updateButtonStyling();
}

function updatePopupStyling(designKey) {
    const modal = document.getElementById('imagePopup');
    if (!modal) return;

    if (designKey === 'swiss') {
        modal.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        const close = modal.querySelector('.popup-close');
        if (close) close.style.color = '#000000';
    } else {
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        const close = modal.querySelector('.popup-close');
        if (close) close.style.color = '#f1f1f1';
    }
}

function updateButtonStyling() {
    const btn = document.getElementById('design-switcher');
    const design = getSavedDesign();

    if (design === 'swiss') {
        btn.style.background = '#000000';
        btn.style.color = '#FFFFFF';
        btn.style.border = '2px solid #000000';
    } else {
        btn.style.background = 'rgba(255,255,255,0.1)';
        btn.style.color = '#FFFFFF';
        btn.style.border = '1px solid rgba(255,255,255,0.3)';
    }
}

// Get saved design or default to 'current'
function getSavedDesign() {
    return localStorage.getItem(STORAGE_KEY) || 'current';
}

// Setup design switcher button
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('design-switcher');
    const currentDesign = getSavedDesign();

    // Apply saved design
    switchDesign(currentDesign);

    // Button click handler - cycle through designs
    btn.addEventListener('click', () => {
        const designs = Object.keys(DESIGNS);
        const current = getSavedDesign();
        const currentIndex = designs.indexOf(current);
        const nextIndex = (currentIndex + 1) % designs.length;
        switchDesign(designs[nextIndex]);
    });
});
