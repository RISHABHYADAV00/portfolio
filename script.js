// Simple interactions and modern animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Typed.js for the hero section
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: ['Web Developer', 'Freelancer', 'UI/UX Enthusiast', 'Digital Creator'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // Initialize VanillaTilt for 3D interactions
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    // Magnetic Button Effect
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transition = 'none';
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            btn.style.transform = `translate(0px, 0px) scale(1)`;
        });
    });

    // Add subtle reveal animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply starting styles to elements that should animate in
    const elementsToAnimate = [
        ...document.querySelectorAll('.service-card'),
        ...document.querySelectorAll('.info-item'),
        document.querySelector('.cta-section'),
        document.querySelector('.contact-form-container')
    ];

    elementsToAnimate.forEach((el, index) => {
        if(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;
            observer.observe(el);
        }
    });

    // Form submission handling (WhatsApp Integration)
    const form = document.querySelector('.contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            
            // Extract input values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Prepare WhatsApp link
            const whatsappNumber = "919548941304";
            const formattedMessage = `*New Lead from Portfolio Website!* 🚀%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A%0A*Message:*%0A${message}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${formattedMessage}`;
            
            // Button loading state
            btn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Opening WhatsApp...`;
            btn.style.opacity = '0.8';
            btn.style.background = '#25D366'; // WhatsApp green
            
            setTimeout(() => {
                // Open WhatsApp in new tab
                window.open(whatsappUrl, '_blank');
                
                btn.innerHTML = `<i class="fa-solid fa-check"></i> Successfully Redirected!`;
                btn.style.opacity = '1';
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = 'var(--accent-gradient)';
                }, 3000);
            }, 1200);
        });
    }
});
