// Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');
    
    if (burger) {
        burger.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on outside click
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Service Modals
const serviceCards = document.querySelectorAll('.service-card');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal__close');

serviceCards.forEach(card => {
    card.addEventListener('click', function() {
        const serviceId = this.getAttribute('data-service');
        const modal = document.getElementById('modal-' + serviceId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

modalCloses.forEach(close => {
    close.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Reviews Carousel
const reviewsTrack = document.querySelector('.reviews__track');
const reviewsSlides = document.querySelectorAll('.reviews__slide');
const prevBtn = document.querySelector('.reviews__btn--prev');
const nextBtn = document.querySelector('.reviews__btn--next');
const dots = document.querySelectorAll('.reviews__dot');

let currentSlide = 0;
const totalSlides = reviewsSlides.length;

function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    
    currentSlide = index;
    reviewsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
}

dots.forEach(dot => {
    dot.addEventListener('click', function() {
        goToSlide(parseInt(this.getAttribute('data-slide')));
    });
});

// Auto-play carousel
let autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);

// Pause on hover
const carousel = document.querySelector('.reviews__carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
}

// Feedback Form
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Here you would normally send the data to a server
        alert(`Спасибо, ${name}! Ваша заявка отправлена. Мы свяжемся с вами по номеру ${phone} в ближайшее время.`);
        
        this.reset();
    });
}
