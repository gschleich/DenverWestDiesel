document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');

    function setBodyPadding() {
        const navbarHeight = navbar.offsetHeight;
        document.body.style.paddingTop = navbarHeight + 'px';
    }

    setBodyPadding();
    window.addEventListener('resize', setBodyPadding);

    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
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