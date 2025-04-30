document.addEventListener('DOMContentLoaded', () => {
    // ======= DYNAMIC DATA =======
    const services = [
      { icon: 'fa-heartbeat', title: 'Cardiology', description: 'Advanced heart care solutions' },
      { icon: 'fa-bone', title: 'Orthopedics', description: 'Bone and joint care specialists' },
      { icon: 'fa-baby', title: 'Pediatrics', description: 'Child healthcare experts' },
      { icon: 'fa-eye', title: 'Ophthalmology', description: 'Vision care and eye surgery' }
    ];
  
    const articles = [
      { title: '10 Tips for Healthy Living', excerpt: 'Discover simple ways to improve your daily health routine...', category: 'Wellness', url: "https://fairbanks.indianapolis.iu.edu/doc/10-Tips-Healthy-Lifestyle.pdf" },
      { title: 'Managing Stress', excerpt: 'Effective techniques to reduce stress in modern life...', category: 'Mental Health', url: "https://www.mentalhealth.org.uk/explore-mental-health/publications/how-manage-and-reduce-stress" },
      { title: 'Diet & Nutrition', excerpt: 'Essential guide to balanced eating habits...', category: 'Nutrition', url: "https://www.niddk.nih.gov/health-information/diet-nutrition" }
    ];
  
    const testimonials = [
      { text: 'MediSphere transformed my healthcare experience!', author: 'Kushagra Agrawal' },
      { text: 'Easy to use and extremely helpful platform.', author: 'Amit Singh' },
      { text: 'Best medical service I have ever used!', author: 'Vandan Krishn Singh' }
    ];
  
    const appointments = [
      {
        type: "hospital",
        name: "Apollo Hospitals",
        location: "Delhi",
        time: "Mon-Fri, 9AM - 5PM",
        doctor: "Dr. R. Mehta"
      },
      {
        type: "clinic",
        name: "Sunshine Clinic",
        location: "Noida",
        time: "Tue-Thu, 10AM - 4PM",
        doctor: "Dr. S. Verma"
      },
      {
        type: "clinic",
        name: "Carewell Clinic",
        location: "Greater Noida",
        time: "Mon-Sat, 8AM - 2PM",
        doctor: "Dr. M. Shah"
      },
      {
        type: "hospital",
        name: "Fortis Hospital",
        location: "Ghaziabad",
        time: "All Days, 24/7",
        doctor: "Dr. A. Sharma"
      }
    ];
  
    // ====== RENDER CARDS ======
    const servicesContainer = document.getElementById('servicesContainer');
    services.forEach(service => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <a href="#" class="service-card-link">
          <i class="fas ${service.icon} fa-3x"></i>
          <h3>${service.title}</h3>
          <p>${service.description}</p>
        </a>`;
      card.querySelector('.service-card-link').addEventListener('click', (e) => {
        e.preventDefault();
        alert(`Redirecting to ${service.title} page... (future link)`);
      });
      servicesContainer.appendChild(card);
    });
  
    const articlesContainer = document.getElementById('articlesContainer');
    articles.forEach(article => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <span class="category">${article.category}</span>
        <h3>${article.title}</h3>
        <p>${article.excerpt}</p>
        <a href="${article.url}" class="read-more" target="_blank">Read More →</a>
      `;
      articlesContainer.appendChild(card);
    });
  
    const clinicsContainer = document.getElementById('clinicsContainer');
    appointments.forEach(appt => {
      const card = document.createElement('div');
      card.className = `card appointment-card ${appt.type}`;
      card.innerHTML = `
        <h3>${appt.name}</h3>
        <p><strong>Location:</strong> ${appt.location}</p>
        <p><strong>Available:</strong> ${appt.time}</p>
        <p><strong>Doctor:</strong> ${appt.doctor}</p>
        <button class="book-btn">Book Appointment</button>
      `;
      clinicsContainer.appendChild(card);
    });
  
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    testimonials.forEach(testimonial => {
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      card.innerHTML = `
        <p class="testimonial-text">"${testimonial.text}"</p>
        <p class="testimonial-author">- ${testimonial.author}</p>
      `;
      testimonialsContainer.appendChild(card);
    });
  
    // ======= APPOINTMENT MODAL =======
    document.querySelectorAll('.book-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('appointmentModal').style.display = 'block';
      });
    });
  
    document.querySelector('.close-appointment').onclick = () => {
      document.getElementById('appointmentModal').style.display = 'none';
    };
  
    window.onclick = (e) => {
      const modal = document.getElementById('appointmentModal');
      if (e.target === modal) modal.style.display = "none";
    };
  
    document.getElementById('appointmentForm').addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('appointmentModal').style.display = 'none';
      alert('Your appointment has been booked! ✅');
    });
  
    // ======= CARD HOVER ANIMATION =======
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  
    // ======= SCROLL ANIMATION =======
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    });
  
    document.querySelectorAll('.card, .section-title').forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    });
  
    // ======= BLOOD MODAL FUNCTIONALITY =======
    const modal = document.getElementById("bloodModal");
    const openBtn = document.getElementById("bloodBtn");
    const closeBtn = document.querySelector(".close");
    const autoBtn = document.getElementById("autoDetectBtn");
    const submitBtn = document.getElementById("submitManualLocation");
    const manualInput = document.getElementById("manualLocation");
  
    openBtn.onclick = (e) => {
      e.preventDefault();
      modal.style.display = "block";
    };
  
    closeBtn.onclick = () => {
      modal.style.display = "none";
    };
  
    window.onclick = (e) => {
      if (e.target === modal) modal.style.display = "none";
    };
  
    autoBtn.onclick = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const location = await reverseGeocode(lat, lon);
          redirectToResultsPage(location);
        }, () => alert("Unable to fetch location."));
      } else {
        alert("Geolocation not supported.");
      }
    };
  
    submitBtn.onclick = () => {
      const location = manualInput.value.trim();
      if (location) {
        redirectToResultsPage(location);
      } else {
        alert("Please enter a location.");
      }
    };
  
    function redirectToResultsPage(location) {
      modal.style.display = "none";
      window.location.href = `/search-blood/?city=${encodeURIComponent(location)}`;
    }
  
    async function reverseGeocode(lat, lon) {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const data = await res.json();
        return data.address.city || data.address.town || data.address.state || "your area";
      } catch {
        return "your area";
      }
    }
  
    // ======= CHATBOT FUNCTIONALITY =======
    document.getElementById('chatToggle').onclick = () => {
      document.getElementById('chatbot').style.display = 'flex';
    };
  
    document.getElementById('chat-close').onclick = () => {
      document.getElementById('chatbot').style.display = 'none';
    };
  
    document.getElementById('sendBtn').onclick = () => sendMessage();
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  
    function sendMessage() {
      const input = document.getElementById('chatInput');
      const msg = input.value.trim();
      if (!msg) return;
  
      addMessage(msg, 'user');
  
      const typingBubble = document.createElement('div');
      typingBubble.className = 'bot-msg typing';
      typingBubble.innerText = 'Dr. MediBot is typing...';
      document.getElementById('chat-body').appendChild(typingBubble);
      document.getElementById('chat-body').scrollTop = 9999;
  
      setTimeout(() => {
        typingBubble.remove();
        const reply = getBotReply(msg.toLowerCase());
        addMessage(reply, 'bot');
      }, 1200);
  
      input.value = '';
    }
  
    function addMessage(msg, type) {
      const bubble = document.createElement('div');
      bubble.className = type + '-msg';
      bubble.innerText = msg;
      document.getElementById('chat-body').appendChild(bubble);
      document.getElementById('chat-body').scrollTop = 9999;
    }
  
    function getBotReply(message) {
      if (message.includes('book')) return "To book an appointment, scroll to the 'Book Appointment' section.";
      if (message.includes('appointment')) return "To book an appointment, scroll to the 'Book Appointment' section.";
      if (message.includes('blood')) return "Use the Blood button in the left menu to find donors near you.";
      if (message.includes('nearest')) return "Please use location input in the top bar to search nearby hospitals.";
      if (message.includes('hello') || message.includes('hi')) return "Hello! How can I assist you today?";
      return "I'm here to help! Try asking about appointments, blood search, or hospitals.";
    }
  });
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.search-container');
    const inputs = form.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                form.submit();
            }
        });
    });
});

  