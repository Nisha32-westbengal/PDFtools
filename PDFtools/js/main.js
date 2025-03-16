// Tool categories data
const toolCategories = [
    {
        name: 'Image Tools',
        icon: 'fa-image',
        color: 'primary',
        count: 10
    },
    {
        name: 'SEO Tools',
        icon: 'fa-search',
        color: 'success',
        count: 10
    },
    {
        name: 'Text Tools',
        icon: 'fa-font',
        color: 'info',
        count: 10
    },
    {
        name: 'Developer Tools',
        icon: 'fa-code',
        color: 'warning',
        count: 10
    },
    {
        name: 'Calculators',
        icon: 'fa-calculator',
        color: 'danger',
        count: 10
    },
    {
        name: 'Unit Converters',
        icon: 'fa-exchange-alt',
        color: 'secondary',
        count: 10
    }
];

// Popular tools data
const popularTools = [
    {
        name: 'Image to PNG',
        description: 'Convert images to PNG format easily',
        icon: 'fa-image',
        url: '/tools/image-to-png.html'
    },
    {
        name: 'Word Counter',
        description: 'Count words, characters, and paragraphs',
        icon: 'fa-calculator',
        url: '/tools/word-counter.html'
    },
    {
        name: 'QR Generator',
        description: 'Create QR codes for any text or URL',
        icon: 'fa-qrcode',
        url: '/tools/qr-generator.html'
    }
    // Add more popular tools as needed
];

// Load header and footer
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        });

    // Load footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    // Initialize categories
    const categoriesContainer = document.getElementById('categories-container');
    if (categoriesContainer) {
        toolCategories.forEach(category => {
            const categoryCard = `
                <div class="col-md-4 col-lg-3">
                    <div class="card h-100 text-center">
                        <div class="card-body">
                            <i class="fas ${category.icon} fa-3x text-${category.color} mb-3"></i>
                            <h5 class="card-title">${category.name}</h5>
                            <p class="card-text">${category.count} tools</p>
                            <a href="/categories/${category.name.toLowerCase().replace(' ', '-')}.html" 
                               class="btn btn-outline-${category.color}">
                                View Tools
                            </a>
                        </div>
                    </div>
                </div>
            `;
            categoriesContainer.innerHTML += categoryCard;
        });
    }

    // Initialize popular tools
    const popularToolsContainer = document.getElementById('popular-tools-container');
    if (popularToolsContainer) {
        popularTools.forEach(tool => {
            const toolCard = `
                <div class="col-md-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <i class="fas ${tool.icon} fa-2x text-primary mb-3"></i>
                            <h5 class="card-title">${tool.name}</h5>
                            <p class="card-text">${tool.description}</p>
                            <a href="${tool.url}" class="btn btn-primary">Use Tool</a>
                        </div>
                    </div>
                </div>
            `;
            popularToolsContainer.innerHTML += toolCard;
        });
    }

    // Initialize search functionality
    const searchInput = document.getElementById('search-tools');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Implement search logic here
            // This will be expanded based on the complete tool list
        });
    }
});

// Handle newsletter subscription
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary') && e.target.previousElementSibling?.matches('input[type="email"]')) {
        const email = e.target.previousElementSibling.value;
        if (email) {
            // Implement newsletter subscription logic
            alert('Thank you for subscribing! We will keep you updated.');
            e.target.previousElementSibling.value = '';
        }
    }
}); 