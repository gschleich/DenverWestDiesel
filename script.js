document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const topBar = document.querySelector('.top-bar');

    const hero = document.getElementById('hero');
    const heroImages = [
        'assets/open_hoods.jpg',
        'assets/white_truck.jpg',
        'assets/trucks_side.jpg',
        'assets/shop_vehicles.jpg'
    ];
    let currentImageIndex = 0;

    function changeHeroImage() {
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        hero.style.backgroundImage = `url(${heroImages[currentImageIndex]})`;
    }

    setInterval(changeHeroImage, 5000);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            topBar.style.zIndex = '999';
        } else {
            topBar.style.zIndex = '1001';
        }
    });

    function setBodyPadding() {
        const navbarHeight = navbar.offsetHeight;
        document.body.style.paddingTop = navbarHeight + 'px';
    }

    setBodyPadding();
    window.addEventListener('resize', setBodyPadding);

    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.overlay');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
        overlay.classList.toggle('show');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
            overlay.classList.remove('show');
        });
    });

    overlay.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        overlay.classList.remove('show');
    });

    const readMoreBtn = document.getElementById('read-more-btn');
    const moreText = document.getElementById('more-text');

    readMoreBtn.addEventListener('click', () => {
        const isExpanded = moreText.classList.toggle('show');
        readMoreBtn.classList.toggle('open');
        if (isExpanded) {
            readMoreBtn.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
            moreText.style.maxHeight = moreText.scrollHeight + 'px';
        } else {
            readMoreBtn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
            moreText.style.maxHeight = null;
        }
    });

    const showMoreFaqBtn = document.getElementById('show-more-faq');
    const hiddenFaqs = document.querySelectorAll('[data-faq-hidden]');

    showMoreFaqBtn.addEventListener('click', () => {
        const isShowing = showMoreFaqBtn.textContent.includes('Less');

        hiddenFaqs.forEach(faq => {
            faq.style.display = isShowing ? 'none' : 'block';
        });

        if (isShowing) {
            showMoreFaqBtn.textContent = 'Show More';
        } else {
            showMoreFaqBtn.textContent = 'Show Less';
        }
    });

    /* Design Switcher */
    const designSwitcher = document.querySelector('.design-switcher');
    if (designSwitcher) {
        const switcherToggle = designSwitcher.querySelector('.switcher-toggle');
        switcherToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            designSwitcher.classList.toggle('open');
        });

        document.addEventListener('click', (event) => {
            if (!designSwitcher.contains(event.target)) {
                designSwitcher.classList.remove('open');
            }
        });
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            let scrollTarget = targetElement;
            if (targetId === '#about') {
                scrollTarget = document.querySelector('#about h2');
            } else if (targetId === '#services') {
                scrollTarget = document.querySelector('#services h2');
            }

            let targetPosition;
            if (targetId === '#hero') {
                targetPosition = 0;
            } else {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                targetPosition = scrollTarget.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            }
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

function reveal() {
    var reveals = document.querySelectorAll(".reveal:not(.active)");

    if (reveals.length === 0) {
        window.removeEventListener('scroll', reveal);
        return;
    }

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// To check the scroll position on page load
reveal();

/* Accordion */
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    const icon = header.querySelector('.accordion-icon');

    header.addEventListener('click', () => {
        // Close other accordions
        accordionItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = 0;
                otherItem.querySelector('.accordion-icon').classList.remove('fa-minus');
                otherItem.querySelector('.accordion-icon').classList.add('fa-plus');
            }
        });

        // Toggle current accordion
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        } else {
            content.style.maxHeight = 0;
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    });
}); 

/* Testimonials Carousel */
function setupTestimonialCarousel() {
    const carouselWrapper = document.querySelector('.testimonial-carousel-wrapper');
    if (!carouselWrapper) return;

    const carousel = carouselWrapper.querySelector('.testimonial-container');
    const prevBtn = carouselWrapper.querySelector('.carousel-arrow.prev');
    const nextBtn = carouselWrapper.querySelector('.carousel-arrow.next');
    const dotsContainer = carouselWrapper.querySelector('.carousel-dots');
    
    let slides;
    let currentIndex = 0;
    let totalSlides = 0;
    let isMobile = false;

    function init() {
        isMobile = window.innerWidth <= 992;
        
        if (isMobile) {
            slides = Array.from(carousel.querySelectorAll('.testimonial-card'));
        } else {
            slides = Array.from(carousel.querySelectorAll('.testimonial-slide'));
        }
        
        totalSlides = slides.length;
        
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        goToSlide(0);
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(slideIndex) {
        currentIndex = slideIndex;
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
        updateDots();
    }
    
    prevBtn.addEventListener('click', () => {
        goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide((currentIndex + 1) % totalSlides);
    });

    init();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            init();
        }, 250);
    });
}
setupTestimonialCarousel();

/* Supabase Form Submission */
const supabaseUrl = 'https://frtpfvfnajkpdiwhwbvy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZydHBmdmZuYWprcGRpd2h3YnZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMDMyMDQsImV4cCI6MjA2ODc3OTIwNH0.zGGeiiArmks51rT7-dFZGuDcDZIKZn_WHUOqyDlBY1Q';

const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

const quoteForm = document.getElementById('quote-form');
const submitButton = quoteForm.querySelector('button[type="submit"]');

quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    const formInputs = quoteForm.elements;
    const formData = {
        first_name: formInputs['first-name'].value,
        last_name: formInputs['last-name'].value,
        phone_number: formInputs['phone'].value,
        email: formInputs['email'].value,
        vehicle_make: formInputs['make'].value,
        vehicle_model: formInputs['model'].value,
        vehicle_year: formInputs['year'].value,
        vin: formInputs['vin'].value,
        engine_serial_number: formInputs['engine-serial'].value,
        problem_description: formInputs['problem'].value,
        other_information: formInputs['other'].value,
    };

    const { data, error } = await supabaseClient
        .from('quotes')
        .insert([formData]);

    if (error) {
        console.error('Error submitting quote:', error);
        alert('There was an error submitting your quote. Please try again.');
    } else {
        console.log('Quote submitted successfully:', data);
        alert('Thank you for your submission! We will get back to you as soon as possible.');
        quoteForm.reset();
    }

    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
}); 