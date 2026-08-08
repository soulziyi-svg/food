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

  const LOCAL_TRAVEL_GUIDE = {
    강원도: {
      restaurant: '강릉감자옹심 강릉본점', address: '강원특별자치도 강릉시 토성로 171',
      phone: '033-648-0340', hours: '10:30~16:00 · 목요일 휴무',
      attraction: '강릉중앙시장 · 월화거리 · 안목해변 커피거리',
      tags: ['강릉여행', '강원도맛집', '강릉중앙시장'],
      source: 'https://kr.datainkorea.com/trip_main/local_view?contentid=133817',
    },
    경상도: {
      restaurant: '예미정', address: '경상북도 안동시 옹정골길 111',
      phone: '054-822-0500', hours: '화~일 11:00~21:00 · 월요일 휴무',
      attraction: '안동하회마을 · 월영교 · 안동찜닭골목',
      tags: ['안동여행', '경상도맛집', '안동종가음식'],
      source: 'https://kroove.co.kr/product/%EC%98%88%EB%AF%B8%EC%A0%95/35012/display/1/',
    },
    전라도: {
      restaurant: '영산홍가', address: '전라남도 나주시 영산포로 197-3',
      phone: '061-334-0585', hours: '10:00~21:00 · 휴무는 방문 전 확인',
      attraction: '영산포 홍어거리 · 금성관 · 영산강 황포돛배',
      tags: ['나주여행', '전라도맛집', '영산포홍어거리'],
      source: 'https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=a3dbc500-d65e-40d4-9675-c99486d03061',
    },
    부산: {
      restaurant: '바삭한밀면', address: '부산광역시 남구 용소로28번길 20',
      phone: '010-7259-2513', hours: '11:00~20:00 · 브레이크타임 15:00~17:00',
      attraction: '광안리해수욕장 · UN기념공원 · 해운대 해변',
      tags: ['부산여행', '부산밀면', '부산로컬맛집'],
      source: 'https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=5c1179db-c1af-49a8-ab45-5e7ce8b76b34',
    },
    제주도: {
      restaurant: '거멍국수', address: '제주특별자치도 서귀포시 안덕면 사계로114번길 53-14',
      phone: '064-792-8787', hours: '08:30~20:30 · 마감시간 변동 가능',
      attraction: '산방산 · 용머리해안 · 사계해변',
      tags: ['제주여행', '제주고기국수', '서귀포맛집'],
      source: 'https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=9ac31a5d-0bfc-4ff2-89f6-eb5aadaf9f69',
    },
    대구: {
      restaurant: '걸리버막창', address: '대구광역시 중구 동성로3길 58-10',
      phone: '053-426-0092', hours: '평일·일요일 17:00~02:00 · 토요일 ~03:00',
      attraction: '동성로 · 서문시장 · 김광석다시그리기길',
      tags: ['대구여행', '대구막창', '대구10미'],
      source: 'https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=000c8cad-de59-414d-a7cd-d09f4b22b80f',
    },
    대전: {
      restaurant: '신도칼국수 본점', address: '대전광역시 동구 대전로825번길 11',
      phone: '042-253-6799', hours: '10:00~19:30 · 브레이크타임 15:00~17:00',
      attraction: '대전역 소제동 · 성심당 본점 · 한밭수목원',
      tags: ['대전여행', '대전칼국수', '대전로컬맛집'],
      source: 'https://www.tabling.co.kr/place/677cc7fe66de5f069875df8b',
    },
    인천: {
      restaurant: 'Xin(씬)', address: '인천광역시 중구 차이나타운로 25',
      phone: '032-761-8889', hours: '11:00~21:00 · 브레이크타임 15:00~17:00',
      attraction: '짜장면박물관 · 송월동 동화마을 · 월미바다열차',
      tags: ['인천여행', '인천차이나타운', '개항장거리'],
      source: 'https://www.diningcode.com/profile.php?rid=uXPlMi8HXmyz',
    },
  };

  function getLocalTip(food) {
    const name = food.name;
    if (/국수|밀면|냉면|쫄면/.test(name)) return '면은 먹기 직전에 삶고 찬 음식은 충분히 헹궈 전분기를 빼야 쫄깃한 식감이 오래 유지돼요.';
    if (/국|찌개|전골|조림/.test(name)) return '국물 요리는 처음부터 간을 세게 하지 말고 충분히 끓인 뒤 마지막에 간을 맞추면 재료의 깊은 맛이 살아나요.';
    if (/구이|막창|파전|만두/.test(name)) return '팬과 불판을 충분히 달군 뒤 재료를 올리고 자주 뒤집지 않으면 겉은 바삭하고 속은 촉촉하게 완성돼요.';
    if (/홍어|꼬막|재첩|문어|육회|젓갈/.test(name)) return '해산물과 생재료는 신선도가 맛을 좌우하므로 구입 즉시 손질하고 차갑게 보관한 뒤 빠르게 조리하세요.';
    return '지역 재료의 본래 향을 살리기 위해 양념은 조금씩 더하고, 완성 직전에 부족한 간을 맞춰보세요.';
  }

  const LOCAL_ORIGIN_CONTEXT = {
    강원도: '강원 산간 지역은 긴 겨울과 척박한 경작 환경 때문에 감자·메밀·옥수수와 동해안 수산물을 활용한 저장 음식과 구황 음식이 발달했습니다. 소박한 재료를 오래 든든하게 먹기 위한 조리법이 오늘날 강원도 음식 특유의 담백함과 깊은 식감으로 이어졌습니다.',
    경상도: '경상도 음식은 내륙의 곡물과 산나물, 남해안의 해산물, 안동을 중심으로 이어진 반가 음식 문화가 함께 어우러져 있습니다. 비교적 진한 간과 선명한 맛은 더운 날씨에 음식을 보관하고 많은 사람이 함께 나누어 먹던 생활 방식과도 관련이 있습니다.',
    전라도: '넓은 평야와 서남해의 갯벌을 함께 품은 전라도는 곡물·채소·해산물이 풍부해 발효와 저장 음식 문화가 특히 발달했습니다. 제철 재료를 아낌없이 활용한 넉넉한 상차림은 손님을 귀하게 대접해 온 남도 음식 문화의 상징으로 자리 잡았습니다.',
    부산: '한국전쟁기 피란민과 항구 노동자, 여러 지역에서 모여든 사람들이 만든 부산 음식은 빠르게 먹을 수 있으면서도 든든한 한 끼가 되는 방향으로 발전했습니다. 항구 도시의 개방성과 시장 문화가 결합되면서 다른 지역의 조리법을 부산식으로 재해석한 음식이 많습니다.',
    제주도: '제주는 바람이 강하고 물이 귀한 화산섬 환경 때문에 메밀·보리·돼지고기·해조류를 알뜰하게 활용하는 음식 문화가 발달했습니다. 공동체 행사와 의례에서 음식을 나누던 전통이 강하며, 재료 본연의 맛을 살리는 단순하고 담백한 조리법이 특징입니다.',
    대구: '대구는 내륙 분지의 더운 기후와 큰 시장을 중심으로 강한 양념, 불맛, 독특한 식감을 강조한 음식이 발달했습니다. 서문시장과 도심 골목의 외식 문화가 성장하면서 서민적인 재료를 개성 있는 별미로 완성한 음식들이 대구를 대표하게 되었습니다.',
    대전: '철도 교통의 중심지였던 대전은 전국의 식재료와 사람들이 오가며 소박하고 푸짐한 면 요리와 두부 음식이 발달했습니다. 시장과 역 주변에서 빠르고 따뜻하게 배를 채우던 음식이 지역민의 일상식으로 정착해 지금의 대전 향토음식 문화를 만들었습니다.',
    인천: '개항 이후 여러 나라의 음식 문화와 항구 노동자의 식생활이 만난 인천에서는 면 요리와 해산물 음식이 독특하게 발전했습니다. 차이나타운·신포시장·연안부두 같은 공간을 중심으로 외래 음식이 지역의 재료와 입맛에 맞게 변화하며 인천만의 향토음식이 되었습니다.',
  };

  function renderDetailedOrigin(food) {
    const origin = document.querySelector('#localModalOrigin');
    const context = LOCAL_ORIGIN_CONTEXT[food.region] || '';
    origin.textContent = `${food.origin} ${context} ${food.name}은 이러한 지역 환경과 생활 방식이 한 그릇에 축적된 음식으로, 단순한 별미를 넘어 지역 주민들의 생업과 계절, 공동체의 기억을 보여주는 향토문화 자산입니다.`;
  }

  function renderLocalTravelProfile(overlay, food) {
    const guide = LOCAL_TRAVEL_GUIDE[food.region];
    if (!guide) return;
    let profile = overlay.querySelector('.local-travel-profile');
    if (!profile) {
      profile = document.createElement('section');
      profile.className = 'local-travel-profile';
      overlay.querySelector('#localModalOrigin').closest('.local-modal__block').after(profile);
    }
    const tel = guide.phone.replace(/[^\d+]/g, '');
    const hashtags = [...guide.tags, food.name.replace(/\s/g, '')];
    profile.innerHTML = `
      <div class="local-travel-profile__heading"><span>주변 추천 맛집</span><strong>${escapeHtml(guide.restaurant)}</strong></div>
      <dl class="local-travel-profile__details">
        <div><dt>주소</dt><dd>${escapeHtml(guide.address)}</dd></div>
        <div><dt>전화번호</dt><dd><a href="tel:${tel}">${escapeHtml(guide.phone)}</a></dd></div>
        <div><dt>영업시간</dt><dd>${escapeHtml(guide.hours)}</dd></div>
        <div><dt>주변 즐길거리</dt><dd>${escapeHtml(guide.attraction)}</dd></div>
      </dl>
      <div class="local-travel-profile__tags">${hashtags.map((tag) => `<span>#${escapeHtml(tag)}</span>`).join('')}</div>
      <p class="local-travel-profile__notice">영업시간·휴무일은 변경될 수 있으니 방문 전 전화로 확인해 주세요. <a href="${guide.source}" target="_blank" rel="noopener noreferrer">정보 확인</a></p>`;

    let tip = overlay.querySelector('.local-tip--recipe');
    if (!tip) {
      tip = document.createElement('section');
      tip.className = 'local-tip local-tip--recipe';
      overlay.querySelector('#localModalRecipe').closest('.local-modal__block').after(tip);
    }
    tip.innerHTML = `<b>TIP</b><p>${escapeHtml(getLocalTip(food))}</p>`;
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
    else {
      renderDetailedOrigin(food);
      renderLocalTravelProfile(overlay, food);
    }
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
    ghostToggle.querySelector('span').textContent = enabled ? '귀신잡기 ON' : '귀신잡기 OFF';
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
