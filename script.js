// Modal functionality
function openModal(title, price, imageSrc, description) {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.querySelector('.modal-description');
    
    modalTitle.textContent = title;
    modalPrice.textContent = price;
    modalImage.src = imageSrc;
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
    const icon = section.querySelector('.menu-icon');
    
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        icon.textContent = '▼';
        section.classList.add('expanded');
    } else {
        content.style.display = 'none';
        icon.textContent = '▶';
        section.classList.remove('expanded');
    }
}

// Initialize all menus as collapsed when page loads
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('main section');
    
    sections.forEach(section => {
        const title = section.querySelector('h2');
        const content = section.querySelector('ul');
        
        // Create clickable header
        const header = document.createElement('div');
        header.className = 'menu-header';
        header.innerHTML = `
            <span class="menu-icon">▶</span>
            <span class="menu-title">${title.textContent}</span>
        `;
        header.onclick = () => toggleMenu(section);
        
        // Replace h2 with clickable header
        title.parentNode.replaceChild(header, title);
        
        // Initially hide content
        content.style.display = 'none';
    });
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
