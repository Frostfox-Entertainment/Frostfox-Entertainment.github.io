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

const betaForm = document.getElementById('betaForm');
const betaSuccess = document.getElementById('betaSuccess');

betaForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        product: document.getElementById('product').value,
        experience: document.getElementById('experience').value
    };
    
    console.log('Beta Form Submitted:', formData);
    
    betaForm.style.display = 'none';
    betaSuccess.style.display = 'block';
    
    setTimeout(() => {
        betaForm.reset();
        betaForm.style.display = 'block';
        betaSuccess.style.display = 'none';
    }, 5000);
});

const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    console.log('Contact Form Submitted:', formData);
    
    contactForm.style.display = 'none';
    contactSuccess.style.display = 'block';
    
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        contactSuccess.style.display = 'none';
    }, 5000);
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    const featuredProduct = document.querySelector('.featured-product');
    const modals = document.querySelectorAll('.game-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    if (featuredProduct) {
        const productId = featuredProduct.getAttribute('data-product');
        const modal = document.getElementById(`${productId}-modal`);
        
        const featuredLearnMore = featuredProduct.querySelector('.featured-learn-more');
        if (featuredLearnMore) {
            featuredLearnMore.addEventListener('click', function(e) {
                e.stopPropagation();
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }
    }
    
    productCards.forEach(card => {
        const gameId = card.getAttribute('data-game');
        const modal = document.getElementById(`${gameId}-modal`);
        
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('learn-more-btn')) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
        
        const learnMoreBtn = card.querySelector('.learn-more-btn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.game-modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
    
    modals.forEach(modal => {
        const modalContent = modal.querySelector('.modal-content');
        let isDown = false;
        let startY;
        let scrollTop;
        
        modalContent.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.tagName === 'IFRAME') {
                return;
            }
            isDown = true;
            startY = e.pageY - modalContent.offsetTop;
            scrollTop = modalContent.scrollTop;
        });
        
        modalContent.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        modalContent.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        modalContent.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const y = e.pageY - modalContent.offsetTop;
            const walk = (y - startY) * 2;
            modalContent.scrollTop = scrollTop - walk;
        });
    });
});