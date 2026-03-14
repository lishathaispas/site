// ===== Mobile Nav Toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }

  // ===== Scroll Reveal =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

  // ===== Testimonial Carousel =====
  const testimonials = [
    { name: "Priya Sharma", text: "Hands down the best Thai massage I've had in Bangalore. The therapists are incredibly skilled and the ambiance is pure luxury. Worth every rupee." },
    { name: "Rahul Menon", text: "Open 24 hours is a lifesaver for someone like me with crazy work hours. The deep tissue massage completely fixed my back pain. Highly recommend!" },
    { name: "Ananya Reddy", text: "The aromatherapy session was divine. The oils they use are premium quality and the entire experience left me feeling rejuvenated for days." },
    { name: "Vikram Patel", text: "I've tried every spa in HSR Layout and Lisha is in a league of its own. The attention to detail and genuine Thai techniques set them apart." },
    { name: "Meera Krishnan", text: "My go-to spot for wellness. The herbal compress therapy is something you won't find easily in Bangalore. Absolutely authentic." },
  ];

  const textEl = document.getElementById('testimonial-text');
  const nameEl = document.getElementById('testimonial-name');
  const dotsContainer = document.getElementById('testimonial-dots');

  if (textEl && nameEl && dotsContainer) {
    let current = 0;

    function render() {
      const t = testimonials[current];
      textEl.textContent = `"${t.text}"`;
      textEl.style.animation = 'none';
      textEl.offsetHeight; // reflow
      textEl.style.animation = 'reveal 0.6s var(--transition-silk)';
      nameEl.textContent = t.name;
      dotsContainer.querySelectorAll('.testimonial-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    testimonials.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
      dot.addEventListener('click', () => { current = i; render(); });
      dotsContainer.appendChild(dot);
    });

    render();
    setInterval(() => { current = (current + 1) % testimonials.length; render(); }, 5000);
  }

  // ===== Contact Form =====
  const form = document.getElementById('contact-form');
  const formContainer = document.getElementById('form-container');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formContainer.innerHTML = `
        <div class="success-msg">
          <div class="text-center">
            <span class="checkmark">✓</span>
            <h3>Thank You</h3>
            <p>We'll contact you shortly to confirm your appointment.</p>
          </div>
        </div>`;
      setTimeout(() => location.reload(), 4000);
    });
  }

  // ===== FAQ Accordion =====
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      
      // Close all others
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Toggle current
      item.classList.toggle('active');
      btn.setAttribute('aria-expanded', !isExpanded);
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = null;
      }
    });
  });
});
