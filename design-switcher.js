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

    // Store preference
    localStorage.setItem(STORAGE_KEY, designKey);

    // Update body class for design-specific styling
    document.body.className = document.body.className.replace(/design-\w+/, '');
    document.body.classList.add(design.class);

    // Update button states
    updateToggleButtons(designKey);

    // Force page refresh to properly apply styles
    setTimeout(() => {
        document.body.style.backgroundColor = designKey === 'swiss' ? '#FFFFFF' : '';
    }, 0);

    // Update popup modal styling for Swiss design
    updatePopupStyling(designKey);
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

function updateToggleButtons(designKey) {
    document.querySelectorAll('.design-toggle-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-design') === designKey) {
            btn.classList.add('active');
        }
    });
}

// Get saved design or default to 'current'
function getSavedDesign() {
    return localStorage.getItem(STORAGE_KEY) || 'current';
}

// Setup design switcher button
function initDesignSwitcher() {
    const buttons = document.querySelectorAll('.design-toggle-btn');
    if (buttons.length === 0) {
        // Buttons not yet loaded, retry in 100ms
        setTimeout(initDesignSwitcher, 100);
        return;
    }

    const currentDesign = getSavedDesign();

    // Apply saved design
    switchDesign(currentDesign);

    // Add click handlers to each button
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const design = btn.getAttribute('data-design');
            switchDesign(design);
        });
    });
}

// Wait for page to load, then initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDesignSwitcher);
} else {
    // If already loaded, init immediately
    setTimeout(initDesignSwitcher, 100);
}
