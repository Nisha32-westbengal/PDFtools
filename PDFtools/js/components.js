// Component loading utility
class ComponentLoader {
    static async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            const html = await response.text();
            document.getElementById(elementId).innerHTML = html;
            return true;
        } catch (error) {
            console.error(`Error loading component from ${componentPath}:`, error);
            return false;
        }
    }

    static initializeComponents() {
        // Load header and footer on all pages
        this.loadComponent('header-placeholder', '/components/header.html');
        this.loadComponent('footer-placeholder', '/components/footer.html');

        // Initialize Bootstrap components
        this.initializeBootstrapComponents();

        // Initialize custom components
        this.initializeCustomComponents();
    }

    static initializeBootstrapComponents() {
        // Initialize all tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        // Initialize all popovers
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }

    static initializeCustomComponents() {
        // Add custom component initialization here
        this.initializeAdComponents();
        this.initializeSearchComponent();
    }

    static initializeAdComponents() {
        // Initialize ad placeholders
        const adPlaceholders = document.querySelectorAll('.ad-placeholder');
        adPlaceholders.forEach(placeholder => {
            // Add ad initialization logic here
            // This will be replaced with actual ad code (e.g., Google AdSense)
            placeholder.innerHTML = '<div class="bg-light p-3 text-center">Advertisement Space</div>';
        });
    }

    static initializeSearchComponent() {
        const searchInput = document.getElementById('search-tools');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch);
        }
    }

    static handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        const toolCards = document.querySelectorAll('.tool-card');
        
        toolCards.forEach(card => {
            const toolName = card.querySelector('.card-title').textContent.toLowerCase();
            const toolDescription = card.querySelector('.card-text').textContent.toLowerCase();
            
            if (toolName.includes(searchTerm) || toolDescription.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    ComponentLoader.initializeComponents();
}); 