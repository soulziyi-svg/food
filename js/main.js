/* ==========================================================================
   ODD TABLE - main.js
   ========================================================================== */

function $(sel, ctx) {
  return (ctx || document).querySelector(sel);
}
function $$(sel, ctx) {
  return Array.from((ctx || document).querySelectorAll(sel));
}

document.addEventListener('DOMContentLoaded', () => {

  /* ======================================================================
     0. 공통 유틸
     ====================================================================== */
  function smoothScrollTo(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  /* 실제 이미지 파일(image/local, image/horror)이 아직 없으면 로드 실패 시
     자동으로 아이콘 플레이스홀더로 대체한다. 파일이 준비되면 별도 코드 수정 없이
     바로 실제 사진이 보인다. */
  function withFallback(imgEl, fallbackSrc) {
    if (!imgEl || !fallbackSrc) return;
    imgEl.onerror = () => {
      imgEl.onerror = null;
      imgEl.src = fallbackSrc;
    };
  }

  function copyText(text, feedbackEl) {
    const done = () => {
      feedbackEl.classList.add('show');
      setTimeout(() => feedbackEl.classList.remove('show'), 2500);
    };
    const fallback = () => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (err) { /* noop */ }
      document.body.removeChild(ta);
      done();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else {
      fallback();
    }
  }

  /* ======================================================================
     1. 헤더 / 햄버거 사이드메뉴
     ====================================================================== */
  const sideMenu = $('#sideMenu');
  const sideOverlay = $('#sideOverlay');
  const header = $('#header');

  function updateHeaderTransparency() {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', updateHeaderTransparency, { passive: true });
  updateHeaderTransparency();

  function openSideMenu() {
    sideMenu.classList.add('active');
    sideOverlay.classList.add('active');
    document.body.classList.add('no-scroll');
  }
  function closeSideMenu() {
    sideMenu.classList.remove('active');
    sideOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  $('#hamburgerBtn').addEventListener('click', openSideMenu);
  $('#sideMenuClose').addEventListener('click', closeSideMenu);
  sideOverlay.addEventListener('click', closeSideMenu);

  $$('.accordion__trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const id = trigger.dataset.acc;
      const panel = document.querySelector(`[data-acc-panel="${id}"]`);
      const wasActive = trigger.classList.contains('active');
      $$('.accordion__trigger').forEach((t) => t.classList.remove('active'));
      $$('.accordion__panel').forEach((p) => p.classList.remove('active'));
      if (!wasActive) {
        trigger.classList.add('active');
        panel.classList.add('active');
      }
    });
  });

  $('#sideRegionList').innerHTML = REGIONS.map(
    (r) => `<li><a href="#content1" data-region-link="${r.name}">${r.name}</a></li>`
  ).join('');
  $('#sideHorrorList').innerHTML = HORROR_CATEGORIES.map(
    (c) => `<li><a href="#content2" data-category-link="${c.name}">${c.name}</a></li>`
  ).join('');

  $('#navLocalList').innerHTML = REGIONS.map((r) => {
    const foods = LOCAL_FOODS.filter((f) => f.region === r.name);
    return `
      <li class="main-nav__cascade-item">
        <a href="#content1" data-region-link="${r.name}">${r.name}<span class="main-nav__arrow">›</span></a>
        <ul class="main-nav__flyout main-nav__flyout--local">
          ${foods.map((f) => `<li><a href="#content1" data-local-food-id="${f.id}">${f.name}</a></li>`).join('')}
        </ul>
      </li>
    `;
  }).join('');
  $('#navHorrorList').innerHTML = HORROR_CATEGORIES.map((c) => {
    const foods = HORROR_FOODS.filter((f) => f.category === c.name);
    return `
      <li class="main-nav__cascade-item">
        <a href="#content2" data-category-link="${c.name}">${c.name}<span class="main-nav__arrow">›</span></a>
        <ul class="main-nav__flyout main-nav__flyout--horror">
          ${foods.map((f) => `<li><a href="#content2" data-horror-food-id="${f.id}">${f.name}</a></li>`).join('')}
        </ul>
      </li>
    `;
  }).join('');

  /* 헤더 향토음식/호러음식 호버 서브메뉴: 링크에서 드롭다운으로 마우스를 옮기는 사이에
     바로 닫혀버리지 않도록, 벗어난 뒤에도 약간의 유예시간(300ms)을 두고 닫는다.
     서브메뉴 자체에 마우스가 있는 동안에도 계속 열린 상태로 유지된다. */
  $$('.main-nav__item').forEach((item) => {
    let hideTimer = null;
    const openSubmenu = () => {
      clearTimeout(hideTimer);
      item.classList.add('submenu-open');
    };
    const scheduleCloseSubmenu = () => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => item.classList.remove('submenu-open'), 300);
    };
    item.addEventListener('mouseenter', openSubmenu);
    item.addEventListener('mouseleave', scheduleCloseSubmenu);
    item.addEventListener('focusin', openSubmenu);
    item.addEventListener('focusout', scheduleCloseSubmenu);
  });

  document.addEventListener('click', (e) => {
    const scrollEl = e.target.closest('[data-scroll]');
    if (scrollEl) {
      e.preventDefault();
      smoothScrollTo(scrollEl.dataset.scroll);
      closeSideMenu();
    }
    const regionLink = e.target.closest('[data-region-link]');
    if (regionLink) {
      e.preventDefault();
      selectLocalTab(regionLink.dataset.regionLink);
      smoothScrollTo('#content1');
      closeSideMenu();
    }
    const categoryLink = e.target.closest('[data-category-link]');
    if (categoryLink) {
      e.preventDefault();
      selectHorrorTab(categoryLink.dataset.categoryLink);
      smoothScrollTo('#content2');
      closeSideMenu();
    }
    const localFoodLink = e.target.closest('[data-local-food-id]');
    if (localFoodLink) {
      e.preventDefault();
      const food = LOCAL_FOODS.find((f) => f.id === localFoodLink.dataset.localFoodId);
      if (food) openLocalModal(food);
    }
    const horrorFoodLink = e.target.closest('[data-horror-food-id]');
    if (horrorFoodLink) {
      e.preventDefault();
      const food = HORROR_FOODS.find((f) => f.id === horrorFoodLink.dataset.horrorFoodId);
      if (food) openHorrorModal(food);
    }
  });

  /* ======================================================================
     2. HERO 슬라이더
     ====================================================================== */
  const heroTrack = $('#heroTrack');
  const heroSlides = $$('.hero__slide');
  const heroDots = $('#heroDots');
  let heroIndex = 0;
  let autoplayTimer = null;

  heroDots.innerHTML = heroSlides
    .map((_, i) => `<button class="hero__dot${i === 0 ? ' active' : ''}" data-i="${i}" aria-label="${i + 1}번 슬라이드"></button>`)
    .join('');

  function goToSlide(i) {
    heroIndex = (i + heroSlides.length) % heroSlides.length;
    heroTrack.style.transform = `translateX(-${heroIndex * (100 / heroSlides.length)}%)`;
    $$('.hero__dot').forEach((d, idx) => d.classList.toggle('active', idx === heroIndex));
  }

  function startAutoplay() {
    autoplayTimer = setInterval(() => goToSlide(heroIndex + 1), 5000);
  }
  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  $('#heroPrev').addEventListener('click', () => { goToSlide(heroIndex - 1); resetAutoplay(); });
  $('#heroNext').addEventListener('click', () => { goToSlide(heroIndex + 1); resetAutoplay(); });
  heroDots.addEventListener('click', (e) => {
    const btn = e.target.closest('.hero__dot');
    if (!btn) return;
    goToSlide(+btn.dataset.i);
    resetAutoplay();
  });
  heroSlides.forEach((slide) => {
    slide.addEventListener('click', (e) => {
      if (e.target.closest('.hero__cta')) return;
      smoothScrollTo(slide.dataset.target);
    });
  });

  startAutoplay();

  /* ======================================================================
     3. CONTENT1 : 향토음식 탭 + 카드
     ====================================================================== */
  const localTabsEl = $('#localTabs');
  const localGridEl = $('#localGrid');

  localTabsEl.innerHTML = REGIONS.map(
    (r) => `<button class="tab-btn" data-region="${r.name}">${r.name}</button>`
  ).join('');

  function renderLocalGrid(regionName) {
    const items = LOCAL_FOODS.filter((f) => f.region === regionName);
    localGridEl.innerHTML = items.map((f) => `
      <div class="food-card" data-id="${f.id}">
        <img class="food-card__img" src="${f.image}" alt="${f.name}">
        <div class="food-card__base">
          <p class="food-card__region">${f.region}</p>
          <h3 class="food-card__name">${f.name}</h3>
        </div>
        <div class="food-card__overlay">
          <p class="food-card__desc">${f.summary}</p>
          <span class="food-card__more">자세히 보기 →</span>
        </div>
      </div>
    `).join('');
    $$('.food-card', localGridEl).forEach((card) => {
      const food = LOCAL_FOODS.find((f) => f.id === card.dataset.id);
      if (food) withFallback($('.food-card__img', card), food.imageFallback);
    });
  }

  function selectLocalTab(regionName) {
    $$('.tab-btn', localTabsEl).forEach((b) => b.classList.toggle('active', b.dataset.region === regionName));
    renderLocalGrid(regionName);
  }

  localTabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    selectLocalTab(btn.dataset.region);
  });

  localGridEl.addEventListener('click', (e) => {
    const card = e.target.closest('.food-card');
    if (!card) return;
    const food = LOCAL_FOODS.find((f) => f.id === card.dataset.id);
    if (food) openLocalModal(food);
  });

  selectLocalTab(REGIONS[0].name);

  /* ======================================================================
     4. 향토음식 상세 모달
     ====================================================================== */
  const localModalOverlay = $('#localModalOverlay');
  let currentLocalFood = null;

  function buildLocalRecipeText(food) {
    return `[${food.region}] ${food.name}\n\n■ 유래\n${food.origin}\n\n■ 재료\n${food.ingredients.join(', ')}\n\n■ 레시피\n${food.recipe.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
  }

  function openLocalModal(food) {
    currentLocalFood = food;
    $('#localModalRegion').textContent = food.region;
    $('#localModalName').textContent = food.name;
    $('#localModalOrigin').textContent = food.origin;
    $('#localModalIngredients').innerHTML = food.ingredients.map((i) => `<li>${i}</li>`).join('');
    $('#localModalRecipe').innerHTML = food.recipe.map((s) => `<li>${s}</li>`).join('');

    const mainImg = $('#localModalMainImg');
    mainImg.src = food.image;
    withFallback(mainImg, food.imageFallback);

    const thumbsEl = $('#localModalThumbs');
    thumbsEl.innerHTML = food.thumbs.map((t) => `<img src="${t}" data-src="${t}">`).join('');
    $$('img', thumbsEl).forEach((img, i) => {
      withFallback(img, food.thumbsFallback[i]);
      img.addEventListener('click', () => {
        mainImg.src = img.dataset.src;
        withFallback(mainImg, food.thumbsFallback[i]);
        $$('img', thumbsEl).forEach((t) => t.classList.remove('active'));
        img.classList.add('active');
      });
    });

    $('#localModalCopyFeedback').classList.remove('show');
    localModalOverlay.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeLocalModal() {
    localModalOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  $('#localModalClose').addEventListener('click', closeLocalModal);
  localModalOverlay.addEventListener('click', (e) => {
    if (e.target === localModalOverlay) closeLocalModal();
  });
  $('#localModalCopy').addEventListener('click', () => {
    if (!currentLocalFood) return;
    copyText(buildLocalRecipeText(currentLocalFood), $('#localModalCopyFeedback'));
  });

  /* ======================================================================
     5. TRANSITION SECTION - 스크롤에 따른 배경/텍스트 연출
     ====================================================================== */
  const transitionEl = $('#transition');
  const transitionTextEl = $('#transitionText');
  const COLOR_PINE = [33, 48, 43];
  const COLOR_BLACK = [9, 9, 9];
  const COLOR_BLOOD = [184, 24, 10];

  function lerp(a, b, f) {
    return Math.round(a + (b - a) * f);
  }
  function colorAt(t) {
    let c;
    if (t < 0.5) {
      const f = t / 0.5;
      c = [lerp(COLOR_PINE[0], COLOR_BLACK[0], f), lerp(COLOR_PINE[1], COLOR_BLACK[1], f), lerp(COLOR_PINE[2], COLOR_BLACK[2], f)];
    } else {
      const f = (t - 0.5) / 0.5;
      c = [lerp(COLOR_BLACK[0], COLOR_BLOOD[0], f), lerp(COLOR_BLACK[1], COLOR_BLOOD[1], f), lerp(COLOR_BLACK[2], COLOR_BLOOD[2], f)];
    }
    return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
  }

  let transitionTicking = false;
  function updateTransition() {
    transitionTicking = false;
    const rect = transitionEl.getBoundingClientRect();
    const wh = window.innerHeight;
    let t = (wh - rect.top) / (wh + rect.height);
    t = Math.max(0, Math.min(1, t));
    transitionEl.style.backgroundColor = colorAt(t);
    transitionTextEl.classList.toggle('show', t > 0.42);
  }
  window.addEventListener('scroll', () => {
    if (!transitionTicking) {
      requestAnimationFrame(updateTransition);
      transitionTicking = true;
    }
  });
  window.addEventListener('resize', updateTransition);
  updateTransition();

  /* ======================================================================
     6. CONTENT2 : 호러음식 탭 + 카드
     ====================================================================== */
  const horrorTabsEl = $('#horrorTabs');
  const horrorGridEl = $('#horrorGrid');

  horrorTabsEl.innerHTML = HORROR_CATEGORIES.map(
    (c) => `<button class="tab-btn--horror" data-category="${c.name}">${c.name}</button>`
  ).join('');

  function renderHorrorGrid(categoryName) {
    const items = HORROR_FOODS.filter((f) => f.category === categoryName);
    horrorGridEl.innerHTML = items.map((f) => `
      <div class="horror-card" data-id="${f.id}">
        <img class="horror-card__img" src="${f.image}" alt="${f.name}">
        <div class="horror-card__overlay-black"></div>
        <div class="horror-card__overlay-gradient"></div>
        <h3 class="horror-card__name">${f.name}</h3>
        <p class="horror-card__desc">${f.tagline}</p>
        <span class="horror-card__more">자세히 보기 →</span>
      </div>
    `).join('');

    $$('.horror-card', horrorGridEl).forEach((card) => {
      const imgEl = $('.horror-card__img', card);
      const food = HORROR_FOODS.find((f) => f.id === card.dataset.id);
      if (food) withFallback(imgEl, food.imageFallback);
      card.addEventListener('mouseenter', () => {
        imgEl.classList.remove('glitching');
        void imgEl.offsetWidth;
        imgEl.classList.add('glitching');
      });
    });
  }

  function selectHorrorTab(categoryName) {
    $$('.tab-btn--horror', horrorTabsEl).forEach((b) => b.classList.toggle('active', b.dataset.category === categoryName));
    renderHorrorGrid(categoryName);
  }

  horrorTabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn--horror');
    if (!btn) return;
    selectHorrorTab(btn.dataset.category);
  });

  horrorGridEl.addEventListener('click', (e) => {
    const card = e.target.closest('.horror-card');
    if (!card) return;
    const food = HORROR_FOODS.find((f) => f.id === card.dataset.id);
    if (food) openHorrorModal(food);
  });

  selectHorrorTab(HORROR_CATEGORIES[0].name);

  /* ======================================================================
     7. 호러음식 상세 모달
     ====================================================================== */
  const horrorModalOverlay = $('#horrorModalOverlay');
  let currentHorrorFood = null;

  function buildHorrorRecipeText(food) {
    return `[${food.category}] ${food.name}\n${food.tagline}\n\n■ 재료\n${food.ingredients.join(', ')}\n\n■ 레시피\n${food.recipe.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
  }

  function openHorrorModal(food) {
    currentHorrorFood = food;
    $('#horrorModalCategory').textContent = food.category;
    $('#horrorModalName').textContent = food.name;
    $('#horrorModalTagline').textContent = food.tagline;
    $('#horrorModalIngredients').innerHTML = food.ingredients.map((i) => `<li>${i}</li>`).join('');
    $('#horrorModalRecipe').innerHTML = food.recipe.map((s) => `<li>${s}</li>`).join('');

    const mainImg = $('#horrorModalMainImg');
    mainImg.src = food.image;
    withFallback(mainImg, food.imageFallback);

    const gridEl = $('#horrorModalGrid');
    gridEl.innerHTML = food.extraImages.map((t) => `<img src="${t}" data-src="${t}">`).join('');
    $$('img', gridEl).forEach((img, i) => {
      withFallback(img, food.extraImagesFallback[i]);
      img.addEventListener('click', () => {
        mainImg.src = img.dataset.src;
        withFallback(mainImg, food.extraImagesFallback[i]);
      });
    });

    $('#horrorModalCopyFeedback').classList.remove('show');
    horrorModalOverlay.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeHorrorModal() {
    horrorModalOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  $('#horrorModalClose').addEventListener('click', closeHorrorModal);
  horrorModalOverlay.addEventListener('click', (e) => {
    if (e.target === horrorModalOverlay) closeHorrorModal();
  });
  $('#horrorModalCopy').addEventListener('click', () => {
    if (!currentHorrorFood) return;
    copyText(buildHorrorRecipeText(currentHorrorFood), $('#horrorModalCopyFeedback'));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLocalModal();
      closeHorrorModal();
      closeSideMenu();
    }
  });

  /* ======================================================================
     8. 귀신 인터랙션 (랜덤 이동 + 점프스케어 + 말풍선 + 숨겨진 레시피)
     ====================================================================== */
  /* 귀신 아이콘 클릭 시 image/monster 폴더의 변신 영상 중 하나가 랜덤으로 재생된다. */
  const GHOST_VIDEOS = [
    'image/monster/ghost-transforms-woman.mp4',
    'image/monster/ghost-transforms-cute-girl.mp4',
  ];

  const ghostLayer = $('#ghostLayer');

  const ghostIcon = document.createElement('img');
  ghostIcon.src = 'image/03.png';
  ghostIcon.className = 'ghost-icon';
  ghostIcon.alt = '날카로운 손톱을 세우고 비명을 지르는 소름 돋는 귀신 아이콘';
  ghostIcon.style.left = '40px';
  ghostIcon.style.top = '180px';
  ghostIcon.style.transition = 'left 4s ease-in-out, top 4s ease-in-out';
  ghostLayer.appendChild(ghostIcon);

  const ghostBubble = document.createElement('div');
  ghostBubble.className = 'ghost-bubble';
  ghostBubble.style.transition = 'left 4s ease-in-out, top 4s ease-in-out';
  ghostBubble.innerHTML = '귀신을 3번 잡으면<strong>숨겨진 호러 레시피 발견!</strong>';
  ghostLayer.appendChild(ghostBubble);

  function positionGhostBubble(x, y) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    let bx = x + 52;
    if (bx + 240 > w - 10) bx = x - 250;
    if (bx < 10) bx = 10;
    let by = y - 20;
    if (by < 110) by = y + 50;
    if (by + 100 > h - 10) by = h - 110;
    ghostBubble.style.left = `${bx}px`;
    ghostBubble.style.top = `${by}px`;
  }

  let ghostMoveTimer = null;
  function moveGhost() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const margin = 50;
    const x = margin + Math.random() * Math.max(1, w - 2 * margin - 40);
    const y = 130 + Math.random() * Math.max(1, h - 260);
    const duration = 3500 + Math.random() * 3500;
    ghostIcon.style.transitionDuration = `${duration}ms`;
    ghostBubble.style.transitionDuration = `${duration}ms`;
    ghostIcon.style.left = `${x}px`;
    ghostIcon.style.top = `${y}px`;
    positionGhostBubble(x, y);
    ghostMoveTimer = setTimeout(moveGhost, duration + 800 + Math.random() * 1800);
  }
  moveGhost();

  const jumpscareOverlay = $('#jumpscareOverlay');
  const jumpscareVideo = $('#jumpscareVideo');
  let lastGhostIndex = -1;
  let jumpscareHideTimer = null;

  function showJumpscare() {
    let idx;
    do {
      idx = Math.floor(Math.random() * GHOST_VIDEOS.length);
    } while (idx === lastGhostIndex && GHOST_VIDEOS.length > 1);
    lastGhostIndex = idx;

    jumpscareVideo.pause();
    jumpscareVideo.src = GHOST_VIDEOS[idx];
    jumpscareVideo.currentTime = 0;
    jumpscareOverlay.classList.remove('fadeout');
    jumpscareOverlay.classList.add('active', 'zoom', 'shake');
    jumpscareVideo.play().catch(() => {});

    setTimeout(() => jumpscareOverlay.classList.remove('shake'), 400);

    clearTimeout(jumpscareHideTimer);
    jumpscareHideTimer = setTimeout(() => {
      jumpscareOverlay.classList.add('fadeout');
      setTimeout(() => {
        jumpscareVideo.pause();
        jumpscareOverlay.classList.remove('active', 'zoom', 'fadeout');
      }, 1000);
    }, 5000);
  }

  const toastEl = $('#toast');
  function showToast() {
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 6000);
  }
  toastEl.addEventListener('click', () => {
    toastEl.classList.remove('show');
    const randomFood = HORROR_FOODS[Math.floor(Math.random() * HORROR_FOODS.length)];
    openHorrorModal(randomFood);
  });

  let ghostClickCount = 0;
  let hiddenRecipeUnlocked = sessionStorage.getItem('oddtable_hidden_unlocked') === '1';

  ghostIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    showJumpscare();
    ghostClickCount += 1;
    if (ghostClickCount >= 3 && !hiddenRecipeUnlocked) {
      hiddenRecipeUnlocked = true;
      sessionStorage.setItem('oddtable_hidden_unlocked', '1');
      setTimeout(showToast, 5300);
    }
  });

  /* ======================================================================
     13. 먹방 영상 (MUKBANG VIDEOS)
     ====================================================================== */
  const mukbangBackdrop = $('#mukbangBackdrop');
  const mukbangItems = $$('.mukbang__item');

  function closeMukbangItem(item) {
    item.classList.remove('is-active');
    mukbangBackdrop.classList.remove('active');
  }

  mukbangItems.forEach((item) => {
    const video = $('.mukbang__video', item);
    const muteBtn = $('.mukbang__mute-btn', item);

    item.addEventListener('click', () => {
      const willActivate = !item.classList.contains('is-active');
      mukbangItems.forEach(closeMukbangItem);
      if (willActivate) {
        item.classList.add('is-active');
        mukbangBackdrop.classList.add('active');
        video.play().catch(() => {});
      }
    });

    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      const unmuted = !video.muted;
      muteBtn.classList.toggle('is-unmuted', unmuted);
      muteBtn.setAttribute('aria-pressed', String(!unmuted));
      muteBtn.setAttribute('aria-label', unmuted ? '음소거 하기' : '음소거 해제');
    });
  });

  mukbangBackdrop.addEventListener('click', () => {
    mukbangItems.forEach(closeMukbangItem);
  });

});
