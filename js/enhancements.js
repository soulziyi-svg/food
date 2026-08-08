/* ODD TABLE - progressive enhancement layer */
document.addEventListener('DOMContentLoaded', () => {
  const allFoods = [
    ...LOCAL_FOODS.map((food) => ({ ...food, type: 'local', group: food.region })),
    ...HORROR_FOODS.map((food) => ({ ...food, type: 'horror', group: food.category })),
  ];
  const byId = (id) => allFoods.find((food) => food.id === id);
  const storage = {
    get(key, fallback) {
      try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (_) { return fallback; }
    },
    set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
  };

  let favorites = new Set(storage.get('odd-table-favorites', []));
  let activeFood = null;
  let servings = 2;
  let lastFocused = null;
  let modalLastFocused = null;
  let searchType = 'all';
  let searchGroup = 'all';

  const searchInput = document.querySelector('#globalSearch');
  const searchResults = document.querySelector('#searchResults');
  const favoriteCount = document.querySelector('#favoriteCount');
  const ghostToggle = document.querySelector('#ghostToggle');

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
    }[char]));
  }

  function announce(message) {
    let live = document.querySelector('#appAnnouncer');
    if (!live) {
      live = document.createElement('div');
      live.id = 'appAnnouncer';
      live.className = 'sr-only';
      live.setAttribute('aria-live', 'polite');
      document.body.appendChild(live);
    }
    live.textContent = '';
    requestAnimationFrame(() => { live.textContent = message; });
  }

  function updateFavoriteUI() {
    favoriteCount.textContent = favorites.size;
    document.querySelectorAll('[data-favorite-id]').forEach((button) => {
      const selected = favorites.has(button.dataset.favoriteId);
      button.classList.toggle('is-favorite', selected);
      button.setAttribute('aria-pressed', String(selected));
      button.setAttribute('aria-label', selected ? '즐겨찾기에서 삭제' : '즐겨찾기에 저장');
      button.textContent = selected ? '♥' : '♡';
    });
  }

  function toggleFavorite(id) {
    if (favorites.has(id)) favorites.delete(id);
    else favorites.add(id);
    storage.set('odd-table-favorites', [...favorites]);
    updateFavoriteUI();
    announce(favorites.has(id) ? '즐겨찾기에 저장했습니다.' : '즐겨찾기에서 삭제했습니다.');
  }

  function enhanceCards(root = document) {
    root.querySelectorAll('.food-card, .horror-card').forEach((card) => {
      if (card.dataset.enhanced) return;
      card.dataset.enhanced = 'true';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      const food = byId(card.dataset.id);
      card.setAttribute('aria-label', `${food?.name || '음식'} 자세히 보기`);
      const image = card.querySelector('img');
      if (image) {
        image.loading = 'lazy';
        image.decoding = 'async';
      }
      const favorite = document.createElement('button');
      favorite.type = 'button';
      favorite.className = 'card-favorite';
      favorite.dataset.favoriteId = card.dataset.id;
      favorite.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(card.dataset.id);
      });
      card.appendChild(favorite);
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          card.click();
        }
      });
    });
    updateFavoriteUI();
  }

  function openFood(id) {
    const food = byId(id);
    if (!food) return;
    const selector = food.type === 'local' ? `[data-region="${CSS.escape(food.region)}"]` : `[data-category="${CSS.escape(food.category)}"]`;
    document.querySelector(selector)?.click();
    requestAnimationFrame(() => {
      const card = document.querySelector(`[data-id="${CSS.escape(food.id)}"]`);
      card?.click();
    });
  }

  function renderSearchResults() {
    const query = searchInput.value.trim().toLocaleLowerCase('ko');
    const matches = allFoods.filter((food) => {
      const queryMatch = !query || [food.name, food.group, food.summary, food.tagline]
        .filter(Boolean).join(' ').toLocaleLowerCase('ko').includes(query);
      return queryMatch && (searchType === 'all' || food.type === searchType)
        && (searchGroup === 'all' || food.group === searchGroup);
    }).slice(0, 8);
    const groups = [...new Set(allFoods.filter((food) => searchType === 'all' || food.type === searchType).map((food) => food.group))];
    searchResults.innerHTML = `
      <div class="search-filters">
        <button type="button" data-search-type="all" class="${searchType === 'all' ? 'active' : ''}">전체</button>
        <button type="button" data-search-type="local" class="${searchType === 'local' ? 'active' : ''}">향토</button>
        <button type="button" data-search-type="horror" class="${searchType === 'horror' ? 'active' : ''}">호러</button>
        <select id="searchGroupFilter" aria-label="지역 또는 카테고리 선택">
          <option value="all">모든 지역·카테고리</option>
          ${groups.map((group) => `<option value="${escapeHtml(group)}" ${searchGroup === group ? 'selected' : ''}>${escapeHtml(group)}</option>`).join('')}
        </select>
      </div>
      ${matches.length ? matches.map((food) => `
        <button type="button" class="search-result" role="option" data-search-id="${food.id}">
          <img src="${food.image}" alt="" loading="lazy">
          <span><b>${escapeHtml(food.name)}</b><small>${food.type === 'local' ? '향토음식' : '호러음식'} · ${escapeHtml(food.group)}</small></span>
        </button>`).join('') : '<p class="search-results__empty">검색 결과가 없습니다.</p>'}`;
    searchResults.classList.add('is-open');
    searchInput.setAttribute('aria-expanded', 'true');
    announce(`${matches.length}개의 검색 결과가 있습니다.`);
  }

  searchInput.addEventListener('input', renderSearchResults);
  searchInput.addEventListener('focus', renderSearchResults);
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      searchInput.value = '';
      renderSearchResults();
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      searchResults.querySelector('button')?.focus();
    }
  });
  searchResults.addEventListener('click', (event) => {
    const typeButton = event.target.closest('[data-search-type]');
    if (typeButton) {
      searchType = typeButton.dataset.searchType;
      searchGroup = 'all';
      renderSearchResults();
      return;
    }
    const result = event.target.closest('[data-search-id]');
    if (!result) return;
    openFood(result.dataset.searchId);
    searchInput.value = '';
    searchResults.classList.remove('is-open');
    searchInput.setAttribute('aria-expanded', 'false');
  });
  searchResults.addEventListener('change', (event) => {
    if (event.target.id !== 'searchGroupFilter') return;
    searchGroup = event.target.value;
    renderSearchResults();
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search')) {
      searchResults.classList.remove('is-open');
      searchInput.setAttribute('aria-expanded', 'false');
    }
  });

  function buildLayer() {
    const layer = document.createElement('div');
    layer.className = 'enhanced-layer';
    layer.id = 'enhancedLayer';
    layer.innerHTML = `
      <section class="enhanced-panel" role="dialog" aria-modal="true" aria-labelledby="enhancedPanelTitle">
        <button class="enhanced-panel__close" type="button" data-layer-close aria-label="닫기">×</button>
        <div id="enhancedPanelBody"></div>
      </section>`;
    document.body.appendChild(layer);
    layer.addEventListener('click', (event) => {
      if (event.target === layer || event.target.closest('[data-layer-close]')) closeLayer();
    });
    return layer;
  }

  const enhancedLayer = buildLayer();
  const panelBody = enhancedLayer.querySelector('#enhancedPanelBody');

  function openLayer(content) {
    lastFocused = document.activeElement;
    panelBody.innerHTML = content;
    enhancedLayer.classList.add('is-open');
    document.body.classList.add('no-scroll');
    enhancedLayer.querySelector('input, button')?.focus();
  }

  function closeLayer() {
    enhancedLayer.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    lastFocused?.focus();
  }

  function authForm(mode) {
    const signup = mode === 'signup';
    openLayer(`
      <div class="auth-panel">
        <p class="auth-panel__eyebrow">ODD TABLE ACCOUNT</p>
        <h2 id="enhancedPanelTitle">${signup ? '회원가입' : '로그인'}</h2>
        <p>${signup ? '좋아하는 음식을 저장하고 나만의 레시피 목록을 만들어보세요.' : '저장한 음식과 레시피 목록을 이어서 확인하세요.'}</p>
        <form id="authDemoForm" data-auth-mode="${mode}">
          ${signup ? '<label>이름<input name="name" required minlength="2" autocomplete="name"></label>' : ''}
          <label>이메일<input name="email" type="email" required autocomplete="email"></label>
          <label>비밀번호<input name="password" type="password" required minlength="6" autocomplete="current-password"></label>
          <button class="auth-panel__submit" type="submit">${signup ? '계정 만들기' : '로그인'}</button>
        </form>
        <small>로컬 미리보기용 화면으로 입력 정보는 외부로 전송되지 않습니다.</small>
      </div>`);
  }

  document.querySelector('#signupOpen').addEventListener('click', () => authForm('signup'));
  document.querySelector('#loginOpen').addEventListener('click', () => authForm('login'));
  panelBody.addEventListener('submit', (event) => {
    if (event.target.id !== 'authDemoForm') return;
    event.preventDefault();
    const data = new FormData(event.target);
    const name = data.get('name') || String(data.get('email')).split('@')[0];
    storage.set('odd-table-user', { name });
    document.querySelector('#loginOpen').textContent = `${name}님`;
    document.querySelector('#signupOpen').hidden = true;
    closeLayer();
    announce(`${name}님, 환영합니다.`);
  });

  document.querySelector('#favoritesOpen').addEventListener('click', () => {
    const foods = [...favorites].map(byId).filter(Boolean);
    openLayer(`
      <div class="favorites-panel">
        <p class="auth-panel__eyebrow">MY COLLECTION</p>
        <h2 id="enhancedPanelTitle">저장한 음식 <em>${foods.length}</em></h2>
        <div class="favorites-panel__grid">
          ${foods.length ? foods.map((food) => `
            <button type="button" data-open-favorite="${food.id}">
              <img src="${food.image}" alt="" loading="lazy">
              <span><b>${escapeHtml(food.name)}</b><small>${escapeHtml(food.group)}</small></span>
            </button>`).join('') : '<p>아직 저장한 음식이 없습니다.<br>카드의 하트 버튼을 눌러보세요.</p>'}
        </div>
      </div>`);
  });
  panelBody.addEventListener('click', (event) => {
    const item = event.target.closest('[data-open-favorite]');
    if (!item) return;
    closeLayer();
    openFood(item.dataset.openFavorite);
  });

  document.addEventListener('click', (event) => {
    const favorite = event.target.closest('[data-favorite-id]');
    if (!favorite) return;
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(favorite.dataset.favoriteId);
  });

  function scaleIngredient(text, factor) {
    return text.replace(/(\d+(?:\.\d+)?)/g, (match) => {
      const value = Number(match) * factor;
      return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, '');
    });
  }

  function getHorrorProfile(food) {
    const ingredientText = food.ingredients.join(' ');
    const heatTerms = ['청양고추', '고춧가루', '고추장', '핫소스', '칠리', '와사비', '매운'];
    const heatMatches = heatTerms.filter((term) => ingredientText.includes(term)).length;
    const categoryBase = { 한식: 3, 일식: 2, 양식: 2, 음료: 1, 디저트: 1 }[food.category] || 2;
    const spice = Math.min(5, Math.max(1, categoryBase + Math.min(2, heatMatches)));
    const workScore = food.ingredients.length + food.recipe.length * 2;
    const difficulty = workScore >= 16 ? '어려움' : workScore >= 11 ? '보통' : '쉬움';
    const tips = {
      한식: '붉은 양념은 한 번에 넣지 말고 색을 확인하며 나누어 넣으면 핏빛 비주얼과 간을 함께 조절할 수 있어요.',
      일식: '눈알과 촉수 장식은 물기를 충분히 제거한 뒤 마지막에 올려야 형태가 또렷하게 유지돼요.',
      양식: '검은 접시를 차갑게 준비하면 붉은 소스와 치즈 장식의 대비가 더 선명해져요.',
      음료: '얼음과 장식물을 먼저 넣고 음료를 잔 벽을 따라 천천히 부으면 기괴한 층이 오래 유지돼요.',
      디저트: '완성한 장식은 충분히 식힌 디저트 위에 올려야 녹거나 형태가 무너지지 않아요.',
    };
    return { spice, difficulty, tip: tips[food.category] || '장식은 먹기 직전에 올리면 호러 비주얼을 가장 선명하게 유지할 수 있어요.' };
  }

  function renderHorrorProfile(overlay, food) {
    const profile = getHorrorProfile(food);
    let meta = overlay.querySelector('.horror-food-profile');
    if (!meta) {
      meta = document.createElement('section');
      meta.className = 'horror-food-profile';
      overlay.querySelector('#horrorModalTagline').after(meta);
    }
    const peppers = Array.from({ length: 5 }, (_, index) =>
      `<span class="pepper-rating__item${index < profile.spice ? ' is-active' : ''}" aria-hidden="true">🌶️</span>`).join('');
    meta.innerHTML = `
      <div class="horror-food-profile__stats">
        <div><span>맵기 단계</span><strong class="pepper-rating" aria-label="고추 5개 중 ${profile.spice}개">${peppers}</strong></div>
        <div><span>조리 난이도</span><strong class="difficulty-badge difficulty-badge--${profile.difficulty === '쉬움' ? 'easy' : profile.difficulty === '보통' ? 'normal' : 'hard'}">${profile.difficulty}</strong></div>
      </div>
      <div class="horror-food-profile__tip"><b>TIP</b><p>${escapeHtml(profile.tip)}</p></div>`;
  }

  function enhanceModal(overlay, food) {
    if (!food) return;
    activeFood = food;
    servings = 2;
    const isHorror = food.type === 'horror';
    const prefix = isHorror ? 'horrorModal' : 'localModal';
    const list = document.querySelector(`#${prefix}Ingredients`);
    if (isHorror) renderHorrorProfile(overlay, food);
    list.innerHTML = food.ingredients.map((item) => `
      <li><label class="ingredient-check"><input type="checkbox"><span data-base="${escapeHtml(item)}">${escapeHtml(item)}</span></label></li>`).join('');
    let tools = overlay.querySelector('.recipe-tools');
    if (!tools) {
      tools = document.createElement('div');
      tools.className = `recipe-tools${isHorror ? ' recipe-tools--horror' : ''}`;
      overlay.querySelector('.copy-row').before(tools);
    }
    tools.innerHTML = `
      <div class="serving-control" aria-label="인분 조절">
        <span>인분</span><button type="button" data-serving="-1" aria-label="인분 줄이기">−</button>
        <b data-serving-value>2</b><button type="button" data-serving="1" aria-label="인분 늘리기">＋</button>
      </div>
      <button type="button" class="tool-btn" data-modal-favorite="${food.id}">${favorites.has(food.id) ? '♥ 저장됨' : '♡ 저장'}</button>
      <button type="button" class="tool-btn" data-print-recipe>인쇄</button>
      <button type="button" class="tool-btn" data-share-recipe>링크 복사</button>
      <div class="modal-pager"><button type="button" data-food-step="-1">← 이전</button><button type="button" data-food-step="1">다음 →</button></div>`;
    const url = new URL(location.href);
    url.searchParams.set('food', food.id);
    history.replaceState({}, '', url);
    overlay.querySelector('.modal').setAttribute('aria-labelledby', `${prefix}Name`);
    requestAnimationFrame(() => overlay.querySelector('.modal__close')?.focus());
  }

  function currentFoodFromModal(overlay) {
    const local = overlay.id === 'localModalOverlay';
    const name = overlay.querySelector(local ? '#localModalName' : '#horrorModalName')?.textContent;
    const food = allFoods.find((item) => item.name === name && item.type === (local ? 'local' : 'horror'));
    return food;
  }

  ['localModalOverlay', 'horrorModalOverlay'].forEach((id) => {
    const overlay = document.querySelector(`#${id}`);
    new MutationObserver(() => {
      if (overlay.classList.contains('active')) {
        modalLastFocused = document.activeElement;
        enhanceModal(overlay, currentFoodFromModal(overlay));
      }
      else if (!document.querySelector('.modal-overlay.active')) {
        const url = new URL(location.href);
        url.searchParams.delete('food');
        history.replaceState({}, '', url);
        modalLastFocused?.focus();
      }
    }).observe(overlay, { attributes: true, attributeFilter: ['class'] });
  });

  document.addEventListener('click', async (event) => {
    const serving = event.target.closest('[data-serving]');
    if (serving && activeFood) {
      servings = Math.max(1, Math.min(12, servings + Number(serving.dataset.serving)));
      const factor = servings / 2;
      const overlay = serving.closest('.modal-overlay');
      overlay.querySelector('[data-serving-value]').textContent = servings;
      overlay.querySelectorAll('[data-base]').forEach((item) => { item.textContent = scaleIngredient(item.dataset.base, factor); });
    }
    const modalFavorite = event.target.closest('[data-modal-favorite]');
    if (modalFavorite) {
      toggleFavorite(modalFavorite.dataset.modalFavorite);
      modalFavorite.textContent = favorites.has(modalFavorite.dataset.modalFavorite) ? '♥ 저장됨' : '♡ 저장';
    }
    if (event.target.closest('[data-print-recipe]')) window.print();
    if (event.target.closest('[data-share-recipe]')) {
      try { await navigator.clipboard.writeText(location.href); announce('음식 링크를 복사했습니다.'); }
      catch (_) { announce('주소창의 링크를 복사해 주세요.'); }
    }
    const pager = event.target.closest('[data-food-step]');
    if (pager && activeFood) {
      const list = activeFood.type === 'local' ? LOCAL_FOODS : HORROR_FOODS;
      const index = list.findIndex((item) => item.id === activeFood.id);
      const next = list[(index + Number(pager.dataset.foodStep) + list.length) % list.length];
      document.querySelector('.modal-overlay.active .modal__close')?.click();
      openFood(next.id);
    }
  });

  const ghostEnabled = storage.get('odd-table-ghost-enabled', true);
  function setGhostEnabled(enabled) {
    storage.set('odd-table-ghost-enabled', enabled);
    document.body.classList.toggle('ghost-disabled', !enabled);
    ghostToggle.setAttribute('aria-pressed', String(enabled));
    ghostToggle.querySelector('span').textContent = enabled ? '연출 ON' : '연출 OFF';
  }
  setGhostEnabled(ghostEnabled);
  ghostToggle.addEventListener('click', () => setGhostEnabled(ghostToggle.getAttribute('aria-pressed') !== 'true'));

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) enhanceCards(node.matches?.('.food-card, .horror-card') ? node.parentElement : node);
    }));
  });
  observer.observe(document.body, { childList: true, subtree: true });
  enhanceCards();

  document.querySelectorAll('video').forEach((video) => { video.preload = 'metadata'; });
  document.querySelectorAll('img:not(.hero__bg)').forEach((image) => { image.decoding = 'async'; });

  const user = storage.get('odd-table-user', null);
  if (user?.name) {
    document.querySelector('#loginOpen').textContent = `${user.name}님`;
    document.querySelector('#signupOpen').hidden = true;
  }
  updateFavoriteUI();

  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'WebSite', name: 'ODD TABLE',
    description: '향토음식과 호러음식 레시피 아카이브', inLanguage: 'ko-KR',
  });
  document.head.appendChild(schema);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && enhancedLayer.classList.contains('is-open')) closeLayer();
    const activeDialog = enhancedLayer.classList.contains('is-open')
      ? enhancedLayer.querySelector('.enhanced-panel')
      : document.querySelector('.modal-overlay.active .modal');
    if (event.key === 'Tab' && activeDialog) {
      const focusable = [...activeDialog.querySelectorAll('button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])')]
        .filter((element) => !element.disabled && element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && activeFood && document.querySelector('.modal-overlay.active')) {
      const direction = event.key === 'ArrowLeft' ? -1 : 1;
      document.querySelector(`[data-food-step="${direction}"]`)?.click();
    }
  });

  const initialFood = new URL(location.href).searchParams.get('food');
  if (initialFood) setTimeout(() => openFood(initialFood), 150);
});
