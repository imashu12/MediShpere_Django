document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Content
    const services = [
        { icon: 'fa-heartbeat', title: 'Cardiology', description: 'Advanced heart care solutions' },
        { icon: 'fa-bone', title: 'Orthopedics', description: 'Bone and joint care specialists' },
        { icon: 'fa-baby', title: 'Pediatrics', description: 'Child healthcare experts' },
        { icon: 'fa-eye', title: 'Ophthalmology', description: 'Vision care and eye surgery' }
    ];

    const articles = [
        { title: '10 Tips for Healthy Living', excerpt: 'Discover simple ways to improve your daily health routine...', category: 'Wellness',url:"https://fairbanks.indianapolis.iu.edu/doc/10-Tips-Healthy-Lifestyle.pdf" },
        { title: 'Managing Stress', excerpt: 'Effective techniques to reduce stress in modern life...', category: 'Mental Health', url:"https://www.mentalhealth.org.uk/explore-mental-health/publications/how-manage-and-reduce-stress" },
        { title: 'Diet & Nutrition', excerpt: 'Essential guide to balanced eating habits...', category: 'Nutrition', url:"https://www.niddk.nih.gov/health-information/diet-nutrition" }
    ];

    const testimonials = [
        { text: 'MediSphere transformed my healthcare experience!', author: 'Kushagra Agrawal' },
        { text: 'Easy to use and extremely helpful platform.', author: 'Amit Singh' },
        { text: 'Best medical service I\'ve ever used!', author: 'Vandan Krishn Singh' }
    ];

    // Populate Services
    const servicesContainer = document.getElementById('servicesContainer');
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <i class="fas ${service.icon} fa-3x"></i>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        servicesContainer.appendChild(card);
    });

    // Populate Articles
    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <span class="category">${article.category}</span>
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <a href="${article.url}" class="read-more">Read More →</a>
        `;
        articlesContainer.appendChild(card);
    });

    // Populate Testimonials
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <p class="testimonial-text">"${testimonial.text}"</p>
            <p class="testimonial-author">– ${testimonial.author}</p>
        `;
        testimonialsContainer.appendChild(card);
    });

    // Card Hover Effects
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        })
    });

    document.querySelectorAll('.card, .section-title').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});