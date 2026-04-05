// ----------------------------- DATA ---------------------------------
  const dishesSlider = [
    { name: "Truffle Risotto", desc: "Carnaroli rice, black truffle, aged parmesan", price: "$48", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format" },
    { name: "Wagyu Tomahawk", desc: "A5 Japanese wagyu, smoked bordelaise", price: "$129", img: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2031&auto=format" },
    { name: "Lobster Bisque", desc: "Maine lobster, cognac cream", price: "$34", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format" },
    { name: "Molten Chocolate", desc: "Gold leaf, vanilla bean gelato", price: "$22", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1887&auto=format" }
  ];

  const menuItems = [
    { category: "Starters", name: "Crispy Calamari", desc: "Saffron aioli, lemon zest", price: "$18", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2070&auto=format" },
    { category: "Starters", name: "Beef Tartare", desc: "Quail egg, toasted brioche", price: "$24", img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2070&auto=format" },
    { category: "Main Course", name: "Herb-Crusted Lamb", desc: "Rosemary jus, potato puree", price: "$49", img: "https://images.unsplash.com/photo-1604909052743-94ebf480ec87?q=80&w=1935&auto=format" },
    { category: "Main Course", name: "Wild Mushroom Pasta", desc: "Truffle oil, pecorino", price: "$38", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2032&auto=format" },
    { category: "Desserts", name: "Crème Brûlée", desc: "Vanilla bean, caramelized top", price: "$14", img: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=2070&auto=format" },
    { category: "Desserts", name: "Tiramisu", desc: "Mascarpone, espresso", price: "$15", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1887&auto=format" },
    { category: "Drinks", name: "Old Fashioned", desc: "Bourbon, angostura", price: "$22", img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format" },
    { category: "Drinks", name: "Sommelier Selection", desc: "Red / White pairing", price: "$55", img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1887&auto=format" }
  ];

  const testimonials = [
    { name: "Sophia Chen", review: "A transcendental dining journey. Every dish was a work of art. The service is flawless.", avatar: "fa-star" },
    { name: "Marcus Wright", review: "The atmosphere, the wine list, and the wagyu — unmatched elegance. Will return.", avatar: "fa-star" },
    { name: "Isabella Rossi", review: "Noir redefines luxury. The truffle risotto is pure perfection.", avatar: "fa-star" }
  ];

  // Helper: render slider
  let sliderIndex = 0;
  function renderSlider() {
    const track = document.getElementById('sliderTrack');
    track.innerHTML = dishesSlider.map(dish => `
      <div class="dish-card">
        <img src="${dish.img}" alt="${dish.name}">
        <div class="dish-info">
          <h4>${dish.name}</h4>
          <p style="font-size:0.85rem; color:#ccc;">${dish.desc}</p>
          <span class="price">${dish.price}</span>
        </div>
      </div>
    `).join('');
    updateSliderPosition();
  }
  function updateSliderPosition() {
    const track = document.getElementById('sliderTrack');
    const cardWidth = document.querySelector('.dish-card')?.offsetWidth + 28 || 328;
    track.style.transform = `translateX(-${sliderIndex * cardWidth}px)`;
  }
  function nextSlide() { if(sliderIndex < dishesSlider.length-1) sliderIndex++; else sliderIndex=0; updateSliderPosition(); }
  function prevSlide() { if(sliderIndex > 0) sliderIndex--; else sliderIndex=dishesSlider.length-1; updateSliderPosition(); }
  window.addEventListener('resize', () => updateSliderPosition());

  // render testimonials
  function renderTestimonials() {
    const grid = document.getElementById('testimonialsGrid');
    grid.innerHTML = testimonials.map(t => `
      <div class="testimonial-card glass-card">
        <i class="fas ${t.avatar}" style="font-size: 2rem;"></i>
        <p style="font-style:italic; margin: 1rem 0;">“${t.review}”</p>
        <h4>— ${t.name}</h4>
      </div>
    `).join('');
  }

  // menu rendering with filter
  let activeCategory = "Starters";
  function renderMenu() {
    const filtered = menuItems.filter(item => item.category === activeCategory);
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = filtered.map(item => `
      <div class="menu-item glass-card">
        <img src="${item.img}" alt="${item.name}">
        <div class="menu-item-content">
          <div style="display:flex; justify-content:space-between;"><h3>${item.name}</h3><span class="menu-price">${item.price}</span></div>
          <p style="font-size:0.85rem; margin-top: 0.5rem;">${item.desc}</p>
        </div>
      </div>
    `).join('');
  }
  function initTabs() {
    const categories = [...new Set(menuItems.map(i => i.category))];
    const tabsDiv = document.getElementById('menuTabs');
    tabsDiv.innerHTML = categories.map(cat => `<button class="tab-btn ${activeCategory===cat ? 'active' : ''}" data-cat="${cat}">${cat}</button>`).join('');
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeCategory = btn.dataset.cat;
        renderMenu();
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    renderMenu();
  }

  // Animated counters (Intersection Observer)
  const counters = {
    years: 0, customers: 0, dishes: 0,
    targetYears: 18, targetCustomers: 6240, targetDishes: 124
  };
  let counted = false;
  function animateCounters() {
    if(counted) return;
    counted = true;
    const updateCounter = (element, target, duration = 1800) => {
      let start = 0, stepTime = 16;
      let steps = duration / stepTime;
      let increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if(current >= target) {
          element.innerText = target.toLocaleString();
          clearInterval(interval);
        } else element.innerText = Math.floor(current).toLocaleString();
      }, stepTime);
    };
    updateCounter(document.getElementById('yearsCount'), counters.targetYears);
    updateCounter(document.getElementById('customersCount'), counters.targetCustomers);
    updateCounter(document.getElementById('dishesCount'), counters.targetDishes);
  }

  // Scroll reveal & counter observer
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('active');
        if(entry.target.id === 'about' && !counted) animateCounters();
      }
    });
  }, { threshold: 0.2 });
  revealElements.forEach(el => observer.observe(el));

  // navbar sticky & smooth scroll & mobile toggle
  document.querySelectorAll('.nav-links a, .scroll-indicator, .btn-primary[href="#menu"], .btn-outline[href="#contact"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const hash = this.getAttribute('href');
      if(hash && hash.startsWith('#')) {
        e.preventDefault();
        const targetId = hash.substring(1);
        const targetSec = document.getElementById(targetId);
        if(targetSec) targetSec.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('navLinks')?.classList.remove('show');
      }
    });
  });
  document.getElementById('scrollDownBtn')?.addEventListener('click', () => {
    const featuredSection = document.querySelector('.slider-container')?.parentElement;
    featuredSection?.scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('menuToggle')?.addEventListener('click', () => {
    document.getElementById('navLinks')?.classList.toggle('show');
  });
  document.getElementById('reserveTableBtn')?.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });

  // contact form simple alert
  document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`✨ Thank you! We'll contact you shortly.`);
    e.target.reset();
  });

  // slider event listeners
  document.getElementById('prevSlide')?.addEventListener('click', prevSlide);
  document.getElementById('nextSlide')?.addEventListener('click', nextSlide);
  window.addEventListener('load', () => {
    renderSlider();
    renderTestimonials();
    initTabs();
    // adjust slider width after load
    setTimeout(updateSliderPosition, 100);
  });
  window.addEventListener('resize', () => { updateSliderPosition(); });
  // Additional manual force
  setInterval(() => { if(document.querySelector('.dish-card')) updateSliderPosition(); }, 200);
  // for any dynamic window