// Modal functionality
function openModal(title, price, imageSrc, description) {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.querySelector('.modal-description');
    
    modalTitle.textContent = title;
    modalPrice.textContent = price;
    // Fallback image when no specific image is provided
    modalImage.src = imageSrc || 'images/cs.jpg';
    modalImage.alt = title;
    modalDescription.textContent = description;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Collapsible menu functionality
function toggleMenu(section) {
    const content = section.querySelector('ul');
    
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        section.classList.add('expanded');
    } else {
        content.style.display = 'none';
        section.classList.remove('expanded');
    }
}

// Initialize all menus as collapsed when page loads
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('main section');
    
    sections.forEach(section => {
        const title = section.querySelector('h2');
        const content = section.querySelector('ul');
        
        // Create clickable header with icon
        const header = document.createElement('div');
        header.className = 'menu-header';
        
        // Get icon based on menu title
        let icon = '';
        const titleText = title.textContent.toLowerCase();
        
        if (titleText.includes('καφές') || titleText.includes('coffee')) {
            icon = '☕';
        } else if (titleText.includes('ροφήματα') || titleText.includes('drinks')) {
            icon = '🥤';
        } else if (titleText.includes('σφολιάτες') || titleText.includes('pastries')) {
            icon = '🥐';
        } else if (titleText.includes('φαγητό') || titleText.includes('food')) {
            icon = '🍔';
        } else if (titleText.includes('σαλάτες') || titleText.includes('salads')) {
            icon = '🥗';
        } else if (titleText.includes('χυμοί') || titleText.includes('juices')) {
            icon = '🧋';
        } else if (titleText.includes('αναψυκτικά') || titleText.includes('beverages')) {
            icon = '🥤';
        } else {
            icon = '🍽️'; // Default icon
        }
        
        header.innerHTML = `
            <span class="menu-icon">${icon}</span>
            <span class="menu-title">${title.textContent}</span>
        `;
        header.onclick = () => toggleMenu(section);
        
        // Replace h2 with clickable header
        title.parentNode.replaceChild(header, title);
        
        // Initially hide content
        content.style.display = 'none';
    });

    // Sandwich Builder logic
    const builder = document.getElementById('sandwich-builder');
    if (builder) {
        const priceEl = document.getElementById('builder-price');
        const selectionTextEl = document.getElementById('selection-text');
        const resetBtn = document.getElementById('builder-reset');

        const formatPrice = (num) => `€${num.toFixed(2)}`;

        const update = () => {
            const bread = builder.querySelector('input[name="bread"]:checked');
            const ingredients = Array.from(builder.querySelectorAll('input[name="ingredient"]:checked'));
            const breadPrice = bread ? parseFloat(bread.dataset.price || '0') : 0;
            const ingredientsTotal = ingredients.reduce((sum, i) => sum + parseFloat(i.dataset.price || '0'), 0);
            const total = breadPrice + ingredientsTotal;

            // Update price
            priceEl.textContent = formatPrice(total);

            // Update selection text
            const selectedNames = [bread ? bread.value : null]
                .concat(ingredients.map(i => i.value))
                .filter(Boolean);
            selectionTextEl.textContent = selectedNames.join(', ') || 'Καμία επιλογή';
        };

        builder.addEventListener('change', update);
        resetBtn.addEventListener('click', () => {
            const breadDefault = builder.querySelector('input[name="bread"]');
            if (breadDefault) breadDefault.checked = true;
            builder.querySelectorAll('input[name="ingredient"]').forEach(i => { i.checked = false; });
            update();
        });

        // Initialize
        update();
    }
});

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
