// nav scroll style
addEventListener('scroll', () => {
  document.querySelector('nav .bar').style.background =
    scrollY > 40 ? 'rgba(20,18,14,.85)' : 'rgba(20,18,14,.55)';
});

// reveal on scroll
const io = new IntersectionObserver(
  (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
  { threshold: .12 }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// count up
const cio = new IntersectionObserver(
  (es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    cio.unobserve(e.target);
    const to = +e.target.dataset.to, suf = e.target.dataset.suffix || '';
    let n = 0;
    const step = () => {
      n += Math.ceil(to / 40);
      if (n >= to) n = to;
      e.target.innerHTML = n + suf;
      if (n < to) requestAnimationFrame(step);
    };
    step();
  }),
  { threshold: .6 }
);
document.querySelectorAll('.num').forEach((el) => cio.observe(el));

// hero role randomizer on hover
(function () {
  const role = document.querySelector('.hero-role');
  const title = role?.querySelector('.role-title');
  if (!role || !title) return;

  const base = role.dataset.defaultRole || 'Brand Marketing Manager';
  const roles = [
    'Creative Planner',
    'Marketing Executive',
    'Video Editor',
    'Digital Marketing Executive',
    'Designer',
    'Account',
    'Vibe Coder',
  ];
  let timer = null;
  let last = -1;

  function pickRole() {
    let next = Math.floor(Math.random() * roles.length);
    if (roles.length > 1) {
      while (next === last) next = Math.floor(Math.random() * roles.length);
    }
    last = next;
    role.classList.add('has-alt-role');
    role.classList.add('is-swapping');
    window.setTimeout(() => {
      title.textContent = roles[next];
      role.classList.remove('is-swapping');
    }, 260);
  }

  role.addEventListener('mouseenter', () => {
    pickRole();
    timer = window.setInterval(pickRole, 1180);
  });

  role.addEventListener('mouseleave', () => {
    window.clearInterval(timer);
    timer = null;
    role.classList.add('is-swapping');
    window.setTimeout(() => {
      title.textContent = base;
      role.classList.remove('has-alt-role', 'is-swapping');
    }, 220);
  });
})();

// case-study photo sliders
(function () {
  if (!document.body.classList.contains('case-page')) return;

  const page = decodeURIComponent(location.pathname.split('/').pop() || '');
  const placeholder = (label) => ({ label });
  const caseSliders = {
    'bell-home-xay-kenh-online-tu-con-so-0.html': [
      { src: '../case-assets/bell-home-green-consumption.webp', alt: 'Bell Home green consumption' },
      { src: '../case-assets/bell-home-live-square.webp', alt: 'Bell Home livestream' },
      { src: '../case-assets/bell-home-partnership-square.webp', alt: 'Bell Home partnership' },
      { src: '../case-assets/bell-home-tiktok-channel.webp', alt: 'TikTok Bell Home' },
      { src: '../case-assets/bell-home-facebook-channel.webp', alt: 'Facebook Bell Home' },
    ],
    'catier-brand-do-an-cho-thu-cung.html': [
      { src: '../case-assets/catier-pet-food-hero.webp', alt: 'Catier pet food' },
      { src: '../case-assets/catier-combo-129k.webp', alt: 'Catier combo 129K' },
      { src: '../case-assets/catier-food-choice.webp', alt: 'Catier food choice' },
      { src: '../case-assets/catier-photo-01.webp', alt: 'Catier pet photo 01' },
      { src: '../case-assets/catier-photo-02.webp', alt: 'Catier pet photo 02' },
    ],
    'colgate-multi-product-content-campaign.html': [
      { src: '../case-assets/colgate-mega-livestream-hung-huynh.webp', alt: 'Colgate mega livestream' },
      { src: '../case-assets/colgate-livestream-pewpew.webp', alt: 'Colgate livestream PewPew' },
      { src: '../case-assets/colgate-livestream-norinpham.webp', alt: 'Colgate livestream NorinPham' },
      { src: '../case-assets/colgate-livestream-nguyen-thi.webp', alt: 'Colgate livestream TikTok Shop' },
      { src: '../case-assets/colgate-slider-sc2.webp', alt: 'Colgate TikTok Shop livestream campaign' },
    ],
    'dalat-hasfarm-digital-shelf-talker.html': [
      { src: '../assets/proj-bg-dalat-hasfarm-sky.webp', alt: 'Dalat Hasfarm brand visual' },
      { src: '../case-assets/dalat-hasfarm-slider-01.webp', alt: 'Dalat Hasfarm flower 01' },
      { src: '../case-assets/dalat-hasfarm-slider-02.webp', alt: 'Dalat Hasfarm flower 02' },
      { src: '../case-assets/dalat-hasfarm-slider-03.webp', alt: 'Dalat Hasfarm flower 03' },
      { src: '../case-assets/dalat-hasfarm-slider-04.webp', alt: 'Dalat Hasfarm flower 04' },
    ],
    'kalite-product-communication-may-ep-cham.html': [
      { src: '../case-assets/kalite-kl530-may-ep-cham.webp', alt: 'Kalite may ep cham' },
      { src: '../case-assets/kalite-kl530-thanh-am-mien-nui.webp', alt: 'Kalite thanh am mien nui' },
      { src: '../assets/proj-03.webp', alt: 'Kalite project visual' },
      placeholder('Anh 04'),
      placeholder('Anh 05'),
    ],
    'kalite-campaign-tet-khong-dau-thi-se-giau.html': [
      { src: '../case-assets/kalite-khong-dau-thi-se-giau.webp', alt: 'Kalite khong dau thi se giau' },
      { src: '../case-assets/kalite-kl530-thanh-am-mien-nui.webp', alt: 'Kalite thanh am mien nui' },
      { src: '../case-assets/kalite-kl530-may-ep-cham.webp', alt: 'Kalite may ep cham' },
      placeholder('Anh 04'),
      placeholder('Anh 05'),
    ],
    'ladi-group-multi-brand-ecosystem.html': [
      { src: '../case-assets/ladi-slider-atelier-011.webp', alt: 'Ladi Atelier dining corner' },
      { src: '../case-assets/ladi-slider-casa-030.webp', alt: 'Ladi Casa living corner' },
      { src: '../case-assets/ladi-slider-hang-bong-002.webp', alt: 'Ladi Hang Bong bedroom interior' },
      { src: '../case-assets/ladi-slider-nha-tho-t2-012.webp', alt: 'Ladi Nha Tho floor 2 interior' },
      { src: '../case-assets/ladi-slider-nha-tho-t3-041.webp', alt: 'Ladi Nha Tho floor 3 interior' },
      { src: '../case-assets/ladi-slider-valley-022.webp', alt: 'Ladi Valley kitchen interior' },
      { src: '../case-assets/ladi-slider-studio-011.webp', alt: 'Ladi Studio interior' },
    ],
    'lazada-video-campaign-ngay-sale-lon.html': [
      { src: '../case-assets/lazada-slider-01.webp', alt: 'Lazada sale visual 01' },
      { src: '../case-assets/lazada-slider-02.webp', alt: 'Lazada sale visual 02' },
      { src: '../case-assets/lazada-slider-03.webp', alt: 'Lazada sale visual 03' },
      { src: '../case-assets/lazada-slider-04.webp', alt: 'Lazada sale visual 04' },
      { src: '../case-assets/lazada-slider-05.webp', alt: 'Lazada sale visual 05' },
    ],
    'lotteria-series-chau-giang-ne.html': [
      { src: '../assets/proj-bg-lotteria.webp', alt: 'Lotteria Chau Giang ne' },
      { src: '../Logo/lotteria logo.webp', alt: 'Lotteria logo' },
      placeholder('Anh 03'),
      placeholder('Anh 04'),
      placeholder('Anh 05'),
    ],
    'pho-de-nhat-bi-quyet-gia-truyen.html': [
      { src: '../case-assets/pho-slider-06.webp', alt: 'Ph? ? Nh?t visual 01' },
      { src: '../case-assets/pho-slider-07.webp', alt: 'Ph? ? Nh?t visual 02' },
      { src: '../case-assets/pho-slider-08.webp', alt: 'Ph? ? Nh?t visual 03' },
      { src: '../case-assets/pho-slider-09.webp', alt: 'Ph? ? Nh?t visual 04' },
      { src: '../case-assets/pho-slider-10.webp', alt: 'Ph? ? Nh?t visual 05' },
    ],
    'ukg-brand-film-fly-together.html': [
      { src: '../assets/proj-bg-ukg.webp', alt: 'UKG Fly Together' },
      { src: '../Logo/UKG logo.webp', alt: 'UKG logo' },
      placeholder('Anh 03'),
      placeholder('Anh 04'),
      placeholder('Anh 05'),
    ],
    'lang-nuoi-bien-van-don-thuong-hieu-diem-den.html': [
      { src: '../assets/van-don-bg.webp', alt: 'Lang Nuoi Bien Van Don' },
      { src: '../case-assets/van-don-slider-01.webp', alt: 'Van Don visual 01' },
      { src: '../case-assets/van-don-slider-02.webp', alt: 'Van Don visual 02' },
      { src: '../case-assets/van-don-slider-03.webp', alt: 'Van Don visual 03' },
      { src: '../case-assets/van-don-slider-04.webp', alt: 'Van Don visual 04' },
    ],
    'vinfast-e-mobility-social-content.html': [
      { src: '../assets/proj-bg-vinfast-green-future.webp', alt: 'VinFast Green Future' },
      { src: '../case-assets/vinfast-social-01.webp', alt: 'VinFast social visual 01' },
      { src: '../case-assets/vinfast-social-02.webp', alt: 'VinFast social visual 02' },
      { src: '../case-assets/vinfast-social-03.webp', alt: 'VinFast social visual 03' },
      { src: '../case-assets/vinfast-social-04.webp', alt: 'VinFast social visual 04' },
    ],
  };

  const assets = caseSliders[page];
  const actions = document.querySelector('.case-story:last-of-type .case-actions');
  if (!actions) return;

  function buildFigure(item, index) {
    const figure = document.createElement('figure');
    if (item?.src) {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || `Case image ${index + 1}`;
      img.loading = 'lazy';
      figure.appendChild(img);
      return figure;
    }
    figure.className = 'case-image-placeholder';
    const span = document.createElement('span');
    span.textContent = item?.label || `Anh ${String(index + 1).padStart(2, '0')}`;
    figure.appendChild(span);
    return figure;
  }

  const fallbackHero = document.querySelector('.case-media img')?.getAttribute('src');
  const items = (assets && assets.length ? assets : [
    fallbackHero ? { src: fallbackHero, alt: 'Case image' } : placeholder('Anh 01'),
    placeholder('Anh 02'),
    placeholder('Anh 03'),
    placeholder('Anh 04'),
    placeholder('Anh 05'),
  ]);

  const targetCount = items.length || 5;

  let slider = document.querySelector('.case-photo-slider');
  if (!slider) {
    slider = document.createElement('div');
    slider.className = 'case-photo-slider';
    slider.setAttribute('aria-label', 'Hinh anh du an');
    actions.parentNode.insertBefore(slider, actions);
  }

  slider.innerHTML = '';
  items.slice(0, targetCount).forEach((item, index) => {
    slider.appendChild(buildFigure(item, index));
  });
})();

// testimonial slider — hiện 2/3, prev/next
(function () {
  const grid = document.getElementById('testiGrid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.tquote'));
  const total = cards.length; // 3
  let idx = 0; // index của card đầu tiên đang hiện

  function render() {
    cards.forEach((c, i) => {
      const visible = i === idx % total || i === (idx + 1) % total;
      c.style.display = visible ? '' : 'none';
    });
  }

  document.getElementById('testiBtnPrev').addEventListener('click', () => {
    idx = (idx - 1 + total) % total;
    render();
  });
  document.getElementById('testiBtnNext').addEventListener('click', () => {
    idx = (idx + 1) % total;
    render();
  });

  render();
})();

// graceful image fallback — nếu ảnh logo / case chưa có thì ẩn ảnh, hiện chữ thay thế
document.querySelectorAll('.logo-item img, .case-image').forEach((img) => {
  const markBroken = () => img.classList.add('broken');
  img.addEventListener('error', markBroken);
  if (img.complete && img.naturalWidth === 0) markBroken();
});
