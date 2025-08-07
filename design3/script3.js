document.addEventListener('DOMContentLoaded', () => {

    // --- Data ---
    const heroImages = [
        '../assets/open_hoods.jpg',
        '../assets/white_truck.jpg',
        '../assets/trucks_side.jpg',
        '../assets/shop_vehicles.jpg'
    ];

    const services = [
        { title: "Diagnostics & Repair", content: "At Denver West Diesel, we specialize in advanced engine diagnostics and repair using state-of-the-art equipment and technology to accurately identify issues and get to the root of the problem quickly and efficiently." },
        { title: "Transmissions & Gear", content: "Our in-house transmission and gear shop offers everything from full rebuilds to new installations. We handle slipping, grinding, or complete failures with solutions that fit your needs." },
        { title: "Fleet & Vocational", content: "We provide expert diagnostic and repair services for vocational trucks, utility trucks, dump trucks, and construction vehicles, focusing on minimizing downtime and ensuring every repair is done right." }
    ];

    const testimonials = [
        { author: "Tony", quote: "Always above and beyond excellent service! Lower than the big guys, and they seem to really give the trucks a good once over to find other issues or problems that may exist or occur!" },
        { author: "Kepha", quote: "These guys are awesome. Chris and Zach were extremely helpful, knowledgeable, and expedient in their services. All the gents were top notch in service and experience. Highly recommend!" },
        { author: "CALMAR TRANSPORT INC.", quote: "Highly Professional services offered at very reasonable price. Got our truck fixed even before the promised time. Extremely satisfied with the repairs and overall services." }
    ];
    let currentTestimonial = 0;

    // --- Hero Image Rotator ---
    const heroImageContainer = document.querySelector('.hero-image-reboot');
    if (heroImageContainer) {
        let currentImageIndex = 0;
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            heroImageContainer.style.backgroundImage = `url(${heroImages[currentImageIndex]})`;
        }, 5000);
        heroImageContainer.style.backgroundImage = `url(${heroImages[0]})`;
    }

    // --- Services Tabs ---
    const tabsNav = document.querySelector('.tabs-nav');
    const tabsContent = document.querySelector('.tabs-content');
    if (tabsNav && tabsContent) {
        services.forEach((service, index) => {
            const link = document.createElement('button');
            link.className = 'tab-link';
            link.textContent = service.title;
            link.dataset.tab = index;
            tabsNav.appendChild(link);

            const content = document.createElement('div');
            content.className = 'tab-content';
            content.innerHTML = `<p>${service.content}</p>`;
            content.dataset.tab = index;
            tabsContent.appendChild(content);
        });

        tabsNav.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-link')) {
                const tabIndex = e.target.dataset.tab;
                
                tabsNav.querySelectorAll('.tab-link').forEach(link => link.classList.remove('active'));
                e.target.classList.add('active');
                
                tabsContent.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                tabsContent.querySelector(`.tab-content[data-tab='${tabIndex}']`).classList.add('active');
            }
        });

        // Activate first tab by default
        tabsNav.querySelector('.tab-link').click();
    }
    
    // --- Testimonial Rotator ---
    const testimonialCard = document.querySelector('.testimonial-card-reboot');
    function updateTestimonial() {
        if(testimonialCard) {
            testimonialCard.innerHTML = `
                <p>"${testimonials[currentTestimonial].quote}"</p>
                <footer>- ${testimonials[currentTestimonial].author}</footer>
            `;
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }
    }
    setInterval(updateTestimonial, 6000);
    updateTestimonial();

    // --- Mobile Navigation ---
    const menuToggle = document.querySelector('.menu-toggle-reboot');
    const mainNav = document.querySelector('.main-nav-reboot');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            });
        });
    }

    // --- Active Nav Link on Scroll ---
    const navLinks = document.querySelectorAll('.main-nav-reboot a');
    const sections = document.querySelectorAll('.section-reboot, .hero-reboot');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
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