/* ===================== 지역별 향토음식 데이터 ===================== */

const REGIONS = [
  { slug: 'gangwon', name: '강원도' },
  { slug: 'gyeongsang', name: '경상도' },
  { slug: 'jeolla', name: '전라도' },
  { slug: 'busan', name: '부산' },
  { slug: 'jeju', name: '제주도' },
  { slug: 'daegu', name: '대구' },
  { slug: 'daejeon', name: '대전' },
  { slug: 'incheon', name: '인천' },
];

/* seed 문자열은 각 항목의 식별용으로만 쓰이며, 실제 image/thumbs/extraImages 값은
   무관한 랜덤 사진 대신 파일 하단의 로컬 플레이스홀더 생성기로 전부 덮어씌워진다. */
function img(seed, w, h) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

const LOCAL_FOODS = [
  // 강원도
  {
    id: 'local-gangwon-1',
    region: '강원도',
    name: '감자옹심이',
    summary: '강원도 화전민의 삶이 담긴 쫄깃한 감자 수제비',
    origin: '척박한 산간 지역에서 벼농사가 어려웠던 강원도 화전민들이 흔히 구할 수 있던 감자를 갈아 앙금을 가라앉힌 뒤 새알심처럼 빚어 끓여 먹던 것에서 시작되었습니다. 쌀 대신 배를 채우던 구황 음식이 지금은 강원도를 대표하는 향토음식이 되었습니다.',
    ingredients: ['감자', '애호박', '멸치육수', '부추', '다진마늘', '소금'],
    recipe: [
      '감자를 강판에 갈아 물에 가라앉혀 전분과 건더기를 분리한다.',
      '가라앉은 전분과 건더기를 다시 반죽해 동그랗게 옹심이를 빚는다.',
      '멸치육수를 끓이다가 애호박과 옹심이를 넣고 익힌다.',
      '옹심이가 떠오르면 부추와 다진마늘로 마무리한다.',
    ],
    image: img('gangwon-ongsimi-main', 700, 560),
    thumbs: [img('gangwon-ongsimi-1', 500, 500), img('gangwon-ongsimi-2', 500, 500), img('gangwon-ongsimi-3', 500, 500)],
  },
  {
    id: 'local-gangwon-2',
    region: '강원도',
    name: '콧등치기국수',
    summary: '먹을 때 면발이 콧등을 친다는 재미있는 이름의 메밀국수',
    origin: '메밀가루에 밀가루를 살짝 섞어 뽑은 굵고 탄력 있는 면발을 후루룩 넘길 때 면이 튀어 콧등을 친다고 하여 붙은 이름입니다. 정선, 평창 등 강원 산간 지역에서 즐겨 먹던 서민 국수입니다.',
    ingredients: ['메밀가루', '밀가루', '멸치육수', '애호박', '김가루', '양념장'],
    recipe: [
      '메밀가루와 밀가루를 섞어 반죽한 뒤 굵게 면을 뽑는다.',
      '멸치와 다시마로 진한 육수를 우려낸다.',
      '면을 삶아 찬물에 헹군 뒤 그릇에 담는다.',
      '뜨거운 육수를 붓고 애호박, 김가루, 양념장을 올린다.',
    ],
    image: img('gangwon-kotdeung-main', 700, 560),
    thumbs: [img('gangwon-kotdeung-1', 500, 500), img('gangwon-kotdeung-2', 500, 500), img('gangwon-kotdeung-3', 500, 500)],
  },
  {
    id: 'local-gangwon-3',
    region: '강원도',
    name: '양미리구이',
    summary: '겨울 동해안 포구에서 만나는 짭조름한 겨울 별미',
    origin: '매년 11월부터 이듬해 1월까지 동해안 주문진, 강릉 앞바다에서 많이 잡히는 양미리를 연탄불이나 숯불에 통째로 구워 먹던 어촌 음식입니다. 겨울철 별다른 반찬 없이도 술안주와 밥반찬으로 사랑받았습니다.',
    ingredients: ['양미리', '굵은소금', '식용유'],
    recipe: [
      '양미리를 흐르는 물에 씻어 물기를 제거한다.',
      '석쇠에 나란히 올리고 굵은소금을 살짝 뿌린다.',
      '숯불이나 연탄불에서 앞뒤로 노릇하게 굽는다.',
      '뼈째 씹어 먹으며 고소한 맛을 즐긴다.',
    ],
    image: img('gangwon-yangmiri-main', 700, 560),
    thumbs: [img('gangwon-yangmiri-1', 500, 500), img('gangwon-yangmiri-2', 500, 500), img('gangwon-yangmiri-3', 500, 500)],
  },
  {
    id: 'local-gangwon-4',
    region: '강원도',
    name: '황태해장국',
    summary: '눈과 바람으로 빚어낸 대관령 황태의 깊은 시원함',
    origin: '대관령의 매서운 추위와 바람에 명태를 얼리고 녹이기를 반복해 만든 황태로 끓인 해장국입니다. 살이 포슬포슬하게 부풀어 오른 황태의 깊은 감칠맛이 뜨끈한 국물에 그대로 배어듭니다.',
    ingredients: ['황태채', '무', '두부', '계란', '다진마늘', '참기름'],
    recipe: [
      '황태채를 참기름에 달달 볶아 향을 낸다.',
      '물을 붓고 무를 넣어 끓인다.',
      '두부를 큼직하게 썰어 넣고 다진마늘로 간을 맞춘다.',
      '계란을 풀어 넣고 한소끔 더 끓인다.',
    ],
    image: img('gangwon-hwangtae-main', 700, 560),
    thumbs: [img('gangwon-hwangtae-1', 500, 500), img('gangwon-hwangtae-2', 500, 500), img('gangwon-hwangtae-3', 500, 500)],
  },

  // 경상도
  {
    id: 'local-gyeongsang-1',
    region: '경상도',
    name: '안동찜닭',
    summary: '안동 양반가에서 손님상에 올리던 매콤달콤한 닭찜',
    origin: '안동 구시장 상인들이 닭볶음탕에 간장과 당면을 더해 손님들의 입맛을 사로잡으며 전국적으로 알려졌습니다. 지금은 잔치나 명절에 빠지지 않는 안동의 대표 음식입니다.',
    ingredients: ['닭고기', '당면', '감자', '당근', '건고추', '간장', '물엿'],
    recipe: [
      '닭고기를 끓는 물에 데쳐 기름기를 제거한다.',
      '간장, 물엿, 다진마늘로 양념장을 만든다.',
      '닭과 감자, 당근, 건고추를 넣고 양념장에 조린다.',
      '불린 당면을 넣고 국물이 자작해질 때까지 졸인다.',
    ],
    image: img('gyeongsang-jjimdak-main', 700, 560),
    thumbs: [img('gyeongsang-jjimdak-1', 500, 500), img('gyeongsang-jjimdak-2', 500, 500), img('gyeongsang-jjimdak-3', 500, 500)],
  },
  {
    id: 'local-gyeongsang-2',
    region: '경상도',
    name: '진주냉면',
    summary: '해물 육수로 감칠맛을 낸 진주 교방음식',
    origin: '진주 관아의 교방(기생 훈련 기관)에서 손님 접대용으로 내던 고급 음식에서 비롯되었다고 전해집니다. 소고기 육수 대신 멸치와 홍합 등 해물을 우려낸 육수를 쓰는 것이 특징입니다.',
    ingredients: ['메밀면', '멸치', '홍합', '소고기고명', '배', '오이'],
    recipe: [
      '멸치와 홍합, 다시마로 해물 육수를 우려낸다.',
      '육수를 차게 식힌 뒤 기름기를 걷어낸다.',
      '메밀면을 삶아 찬물에 헹궈 사리를 만든다.',
      '고명으로 소고기볶음, 배, 오이를 얹고 육수를 붓는다.',
    ],
    image: img('gyeongsang-naengmyeon-main', 700, 560),
    thumbs: [img('gyeongsang-naengmyeon-1', 500, 500), img('gyeongsang-naengmyeon-2', 500, 500), img('gyeongsang-naengmyeon-3', 500, 500)],
  },
  {
    id: 'local-gyeongsang-3',
    region: '경상도',
    name: '아귀찜',
    summary: '못생겼지만 감칠맛 넘치는 경상도식 매운 찜',
    origin: '한때 그물에 걸려도 버려지던 못생긴 아귀를, 마산 부둣가 상인들이 콩나물과 매운 양념으로 쪄내며 별미로 재탄생시켰습니다. 지금은 마산을 넘어 경상도 전역의 인기 음식이 되었습니다.',
    ingredients: ['아귀', '콩나물', '미더덕', '건고추', '고춧가루', '전분물'],
    recipe: [
      '아귀를 손질해 큼직하게 토막 낸다.',
      '고춧가루, 다진마늘로 매운 양념장을 만든다.',
      '콩나물과 미더덕을 깔고 아귀와 양념장을 올려 찐다.',
      '전분물을 풀어 걸쭉하게 마무리한다.',
    ],
    image: img('gyeongsang-agujjim-main', 700, 560),
    thumbs: [img('gyeongsang-agujjim-1', 500, 500), img('gyeongsang-agujjim-2', 500, 500), img('gyeongsang-agujjim-3', 500, 500)],
  },
  {
    id: 'local-gyeongsang-4',
    region: '경상도',
    name: '문어숙회',
    summary: '경조사상에 꼭 오르는 쫄깃한 경상도 문어',
    origin: '경상도에서는 잔치나 제사에 문어가 빠지면 안 될 정도로 귀하게 여겨졌습니다. 통째로 삶아 얇게 썰어내는 문어숙회는 손님 대접의 정성을 보여주는 음식이었습니다.',
    ingredients: ['문어', '무', '월계수잎', '소주', '초고추장'],
    recipe: [
      '냄비에 무와 월계수잎, 소주를 넣고 물을 끓인다.',
      '문어 다리부터 물에 넣었다 빼기를 반복해 모양을 잡는다.',
      '문어를 통째로 넣어 삶은 뒤 건져 식힌다.',
      '얇게 썰어 초고추장과 함께 낸다.',
    ],
    image: img('gyeongsang-munau-main', 700, 560),
    thumbs: [img('gyeongsang-munau-1', 500, 500), img('gyeongsang-munau-2', 500, 500), img('gyeongsang-munau-3', 500, 500)],
  },

  // 전라도
  {
    id: 'local-jeolla-1',
    region: '전라도',
    name: '홍어삼합',
    summary: '삭힌 홍어와 묵은지, 돼지고기가 만든 강렬한 조화',
    origin: '흑산도 인근에서 잡힌 홍어를 옹기에 삭혀 저장성을 높이던 것에서 유래했습니다. 삭힌 홍어의 강한 향을 삶은 돼지고기와 묵은지가 부드럽게 감싸주는 궁합이 전라도 잔치상의 상징이 되었습니다.',
    ingredients: ['삭힌 홍어', '삶은 돼지고기', '묵은지', '막걸리'],
    recipe: [
      '홍어를 얇게 포 떠서 썬다.',
      '돼지고기를 삶아 얇게 편 썬다.',
      '묵은지를 물기를 짜서 준비한다.',
      '홍어, 돼지고기, 묵은지를 함께 싸서 한입에 먹는다.',
    ],
    image: img('jeolla-hongeo-main', 700, 560),
    thumbs: [img('jeolla-hongeo-1', 500, 500), img('jeolla-hongeo-2', 500, 500), img('jeolla-hongeo-3', 500, 500)],
  },
  {
    id: 'local-jeolla-2',
    region: '전라도',
    name: '꼬막무침',
    summary: '보성 갯벌이 키운 쫄깃하고 달큰한 겨울 조개',
    origin: '전라도 보성, 벌교 갯벌은 예로부터 꼬막이 많이 나는 곳으로 유명했습니다. 겨울철 살이 오른 꼬막을 살짝 삶아 매콤새콤한 양념에 무쳐 먹는 것이 전라도식 밥상의 겨울 별미입니다.',
    ingredients: ['꼬막', '고춧가루', '간장', '다진마늘', '쪽파', '깨소금'],
    recipe: [
      '꼬막을 소금물에 담가 해감한다.',
      '끓는 물에 살짝 데쳐 한쪽 껍데기를 벗긴다.',
      '고춧가루, 간장, 다진마늘로 양념장을 만든다.',
      '꼬막에 양념장을 끼얹고 쪽파와 깨소금을 올린다.',
    ],
    image: img('jeolla-kkomak-main', 700, 560),
    thumbs: [img('jeolla-kkomak-1', 500, 500), img('jeolla-kkomak-2', 500, 500), img('jeolla-kkomak-3', 500, 500)],
  },
  {
    id: 'local-jeolla-3',
    region: '전라도',
    name: '재첩국',
    summary: '섬진강 새벽 강바람과 함께 떠먹던 뽀얀 국물',
    origin: '섬진강 하구 하동, 광양 일대에서 새벽에 강바닥을 훑어 잡아 올린 재첩으로 끓인 국입니다. 해장에 좋다 하여 새벽 재첩국을 사려는 손님들의 발걸음이 끊이지 않았습니다.',
    ingredients: ['재첩', '부추', '다진마늘', '소금'],
    recipe: [
      '재첩을 맑은 물에 여러 번 헹궈 해감한다.',
      '냄비에 재첩과 물을 넣고 끓인다.',
      '재첩 입이 벌어지면 다진마늘로 간을 맞춘다.',
      '부추를 송송 썰어 올려 마무리한다.',
    ],
    image: img('jeolla-jaecheop-main', 700, 560),
    thumbs: [img('jeolla-jaecheop-1', 500, 500), img('jeolla-jaecheop-2', 500, 500), img('jeolla-jaecheop-3', 500, 500)],
  },
  {
    id: 'local-jeolla-4',
    region: '전라도',
    name: '갓김치',
    summary: '알싸한 향이 매력인 여수 돌산의 붉은 김치',
    origin: '전라남도 여수 돌산도의 해풍을 맞고 자란 돌산갓으로 담근 김치입니다. 갓 특유의 알싸하고 쌉싸름한 향이 젓갈의 깊은 감칠맛과 어우러져 전라도 김치 문화를 대표합니다.',
    ingredients: ['돌산갓', '멸치액젓', '찹쌀풀', '고춧가루', '다진마늘', '생강'],
    recipe: [
      '갓을 소금물에 절였다가 헹궈 물기를 뺀다.',
      '찹쌀풀에 고춧가루, 멸치액젓, 다진마늘, 생강을 섞어 양념을 만든다.',
      '갓 줄기 사이사이에 양념을 고루 바른다.',
      '통에 담아 서늘한 곳에서 하루 숙성시킨다.',
    ],
    image: img('jeolla-gatkimchi-main', 700, 560),
    thumbs: [img('jeolla-gatkimchi-1', 500, 500), img('jeolla-gatkimchi-2', 500, 500), img('jeolla-gatkimchi-3', 500, 500)],
  },

  // 부산
  {
    id: 'local-busan-1',
    region: '부산',
    name: '밀면',
    summary: '피란 시절 냉면 대신 밀가루로 뽑아낸 부산의 여름 국수',
    origin: '한국전쟁 피란 시절 냉면 재료인 메밀을 구하기 어려워지자 밀가루와 전분으로 면을 뽑아 대신하던 것이 밀면의 시작입니다. 지금은 부산을 대표하는 여름철 별미가 되었습니다.',
    ingredients: ['밀가루면', '소고기육수', '무절임', '삶은계란', '오이', '양념장'],
    recipe: [
      '소고기 사골로 육수를 우려 차게 식힌다.',
      '밀가루와 전분을 섞어 뽑은 면을 삶아 헹군다.',
      '그릇에 면을 담고 육수를 붓는다.',
      '무절임, 삶은계란, 오이를 올리고 양념장을 곁들인다.',
    ],
    image: img('busan-milmyeon-main', 700, 560),
    thumbs: [img('busan-milmyeon-1', 500, 500), img('busan-milmyeon-2', 500, 500), img('busan-milmyeon-3', 500, 500)],
  },
  {
    id: 'local-busan-2',
    region: '부산',
    name: '돼지국밥',
    summary: '부둣가 일꾼들의 든든한 한 끼, 뽀얀 사골국물',
    origin: '피란민들이 부산항 근처에서 돼지 뼈를 오래 고아 국물을 내고 밥을 말아 먹던 것에서 유래했습니다. 부둣가와 시장 노동자들의 든든한 한 끼로 자리 잡으며 부산의 상징적인 음식이 되었습니다.',
    ingredients: ['돼지뼈', '돼지고기', '밥', '부추', '새우젓', '다진양념'],
    recipe: [
      '돼지뼈를 여러 번 데쳐 잡내를 제거한다.',
      '뼈와 고기를 넣고 뽀얗게 우러날 때까지 오래 끓인다.',
      '뚝배기에 밥과 삶은 고기를 담고 국물을 붓는다.',
      '부추와 새우젓, 다진양념으로 간을 맞춰 먹는다.',
    ],
    image: img('busan-gukbap-main', 700, 560),
    thumbs: [img('busan-gukbap-1', 500, 500), img('busan-gukbap-2', 500, 500), img('busan-gukbap-3', 500, 500)],
  },
  {
    id: 'local-busan-3',
    region: '부산',
    name: '씨앗호떡',
    summary: '부산 남포동 겨울 골목을 채우는 달콤 고소한 간식',
    origin: '기존의 설탕 호떡에 해바라기씨, 호박씨 등 견과류 씨앗 속을 가득 채운 부산 남포동식 호떡입니다. 씹을수록 고소한 맛이 더해져 부산의 겨울 길거리 간식으로 큰 인기를 얻었습니다.',
    ingredients: ['찹쌀반죽', '흑설탕', '계핏가루', '해바라기씨', '호박씨', '식용유'],
    recipe: [
      '찹쌀반죽을 발효시켜 동그랗게 나눈다.',
      '흑설탕과 계핏가루를 섞어 속을 만든다.',
      '반죽에 속을 채우고 기름 두른 팬에 눌러 굽는다.',
      '컵에 담아 씨앗 토핑을 듬뿍 올려 낸다.',
    ],
    image: img('busan-hotteok-main', 700, 560),
    thumbs: [img('busan-hotteok-1', 500, 500), img('busan-hotteok-2', 500, 500), img('busan-hotteok-3', 500, 500)],
  },
  {
    id: 'local-busan-4',
    region: '부산',
    name: '동래파전',
    summary: '조선시대 임금님 진상품이었던 두툼한 해물파전',
    origin: '동래읍성 인근에서 임금님께 진상하기 위해 만들었다는 이야기가 전해질 만큼 정성이 담긴 파전입니다. 쪽파를 가득 깔고 해물과 찹쌀 반죽을 더해 두툼하게 부쳐내는 것이 특징입니다.',
    ingredients: ['쪽파', '찹쌀가루', '밀가루', '조갯살', '새우', '계란'],
    recipe: [
      '쪽파를 다듬어 팬에 가지런히 깐다.',
      '찹쌀가루와 밀가루를 섞어 묽은 반죽을 만든다.',
      '조갯살과 새우를 올리고 반죽을 붓는다.',
      '계란물을 얹어 노릇하게 앞뒤로 지진다.',
    ],
    image: img('busan-pajeon-main', 700, 560),
    thumbs: [img('busan-pajeon-1', 500, 500), img('busan-pajeon-2', 500, 500), img('busan-pajeon-3', 500, 500)],
  },

  // 제주도
  {
    id: 'local-jeju-1',
    region: '제주도',
    name: '몸국',
    summary: '돼지고기 육수에 모자반을 더한 제주 잔치 국물',
    origin: '제주에서는 돼지를 잡는 큰 잔치 때 뼈와 내장을 오래 고은 육수에 해조류인 모자반(몸)을 넣어 몸국을 끓였습니다. 손님들에게 든든한 한 끼를 대접하던 제주 특유의 잔치 음식입니다.',
    ingredients: ['돼지뼈육수', '모자반', '돼지고기', '메밀가루', '소금'],
    recipe: [
      '돼지뼈와 고기를 오래 삶아 진한 육수를 낸다.',
      '모자반을 깨끗이 씻어 잘게 다진다.',
      '육수에 모자반과 삶은 고기를 넣고 끓인다.',
      '메밀가루를 풀어 걸쭉하게 농도를 맞춘다.',
    ],
    image: img('jeju-momguk-main', 700, 560),
    thumbs: [img('jeju-momguk-1', 500, 500), img('jeju-momguk-2', 500, 500), img('jeju-momguk-3', 500, 500)],
  },
  {
    id: 'local-jeju-2',
    region: '제주도',
    name: '고기국수',
    summary: '제주 잔치의 마무리를 장식하던 돼지고기 국수',
    origin: '제주 전통 혼례나 상례에서 손님을 접대한 뒤 마지막으로 돼지고기 삶은 육수에 국수를 말아 대접하던 것에서 비롯되었습니다. 지금은 제주를 찾는 이들이 꼭 찾는 향토음식이 되었습니다.',
    ingredients: ['중면', '돼지고기육수', '삶은돼지고기편육', '대파', '다진마늘'],
    recipe: [
      '돼지고기를 통째로 삶아 육수를 낸다.',
      '삶은 고기는 건져 얇게 편 썬다.',
      '중면을 삶아 찬물에 헹군 뒤 그릇에 담는다.',
      '뜨거운 육수를 붓고 편육과 대파를 올린다.',
    ],
    image: img('jeju-gogigooksu-main', 700, 560),
    thumbs: [img('jeju-gogigooksu-1', 500, 500), img('jeju-gogigooksu-2', 500, 500), img('jeju-gogigooksu-3', 500, 500)],
  },
  {
    id: 'local-jeju-3',
    region: '제주도',
    name: '빙떡',
    summary: '메밀전에 무나물을 돌돌 말아낸 제주 명절떡',
    origin: '척박한 화산섬 제주에서 잘 자라는 메밀로 얇게 전을 부치고, 그 안에 삶은 무채를 넣어 돌돌 말아 만든 떡입니다. 제사와 명절상에 빠지지 않는 제주 고유의 떡입니다.',
    ingredients: ['메밀가루', '무', '참기름', '소금', '깨소금'],
    recipe: [
      '메밀가루를 물에 풀어 얇은 반죽을 만든다.',
      '팬에 반죽을 얇게 펴 전을 부친다.',
      '무를 채 썰어 삶은 뒤 참기름과 소금으로 무친다.',
      '전 위에 무나물을 올리고 돌돌 말아낸다.',
    ],
    image: img('jeju-bingtteok-main', 700, 560),
    thumbs: [img('jeju-bingtteok-1', 500, 500), img('jeju-bingtteok-2', 500, 500), img('jeju-bingtteok-3', 500, 500)],
  },
  {
    id: 'local-jeju-4',
    region: '제주도',
    name: '갈치조림',
    summary: '은빛 갈치와 매콤한 양념이 어우러진 제주 밥도둑',
    origin: '제주 앞바다에서 은빛으로 잡히는 두툼한 갈치를 무와 함께 매콤하게 조려낸 제주 가정식입니다. 살이 두툼하고 기름져 조려도 부서지지 않는 제주 갈치의 특징이 잘 드러납니다.',
    ingredients: ['갈치', '무', '고춧가루', '간장', '다진마늘', '청양고추'],
    recipe: [
      '갈치를 손질해 큼직하게 토막 낸다.',
      '냄비 바닥에 무를 깔고 갈치를 올린다.',
      '고춧가루, 간장, 다진마늘로 만든 양념을 끼얹는다.',
      '국물을 끼얹어가며 중불에서 조린다.',
    ],
    image: img('jeju-galchi-main', 700, 560),
    thumbs: [img('jeju-galchi-1', 500, 500), img('jeju-galchi-2', 500, 500), img('jeju-galchi-3', 500, 500)],
  },

  // 대구
  {
    id: 'local-daegu-1',
    region: '대구',
    name: '막창구이',
    summary: '대구 안지랑 골목에서 시작된 쫄깃한 서민 별미',
    origin: '소나 돼지의 막창(넷째 위)을 손질해 연탄불에 구워 먹던 것이 대구 안지랑 곱창골목을 중심으로 발달했습니다. 쫄깃하면서도 고소한 식감으로 대구의 대표 야식 문화가 되었습니다.',
    ingredients: ['막창', '소금', '후춧가루', '들기름', '부추무침'],
    recipe: [
      '막창을 여러 번 씻어 냄새를 제거한다.',
      '들기름과 소금, 후춧가루로 밑간한다.',
      '달군 불판에 막창을 올려 굽는다.',
      '가위로 잘라 부추무침과 함께 낸다.',
    ],
    image: img('daegu-makchang-main', 700, 560),
    thumbs: [img('daegu-makchang-1', 500, 500), img('daegu-makchang-2', 500, 500), img('daegu-makchang-3', 500, 500)],
  },
  {
    id: 'local-daegu-2',
    region: '대구',
    name: '뭉티기',
    summary: '썰어낸 모양이 뭉텅뭉텅하다 하여 붙은 대구식 육회',
    origin: '갓 잡은 소의 신선한 살코기를 얇게 썰지 않고 두툼하게 뭉텅뭉텅 썰어냈다 하여 뭉티기라는 이름이 붙었습니다. 신선도가 생명인 만큼 대구의 오래된 정육식당에서 즐겨 먹던 음식입니다.',
    ingredients: ['소고기 우둔살', '참기름', '마늘', '통깨', '배'],
    recipe: [
      '신선한 소고기를 두툼하게 썬다.',
      '접시에 배를 깔아 놓는다.',
      '썰어낸 고기를 배 위에 올린다.',
      '참기름과 마늘, 통깨를 곁들여 낸다.',
    ],
    image: img('daegu-mungtigi-main', 700, 560),
    thumbs: [img('daegu-mungtigi-1', 500, 500), img('daegu-mungtigi-2', 500, 500), img('daegu-mungtigi-3', 500, 500)],
  },
  {
    id: 'local-daegu-3',
    region: '대구',
    name: '납작만두',
    summary: '한국전쟁 피란민이 빚어낸 얇고 담백한 만두',
    origin: '피란 시절 귀한 고기 대신 당면과 부추로 소를 채우고 얇게 눌러 부친 것에서 시작되었습니다. 대구 골목 분식집에서 어묵 국물에 찍어 먹는 방식으로 자리 잡았습니다.',
    ingredients: ['만두피', '당면', '부추', '간장양념', '어묵국물'],
    recipe: [
      '당면과 부추를 잘게 썰어 소를 만든다.',
      '만두피에 소를 얇게 펴 넣고 반으로 접는다.',
      '팬에 기름을 두르고 납작하게 눌러 굽는다.',
      '뜨거운 어묵 국물에 찍어 먹는다.',
    ],
    image: img('daegu-napjak-main', 700, 560),
    thumbs: [img('daegu-napjak-1', 500, 500), img('daegu-napjak-2', 500, 500), img('daegu-napjak-3', 500, 500)],
  },
  {
    id: 'local-daegu-4',
    region: '대구',
    name: '동인동찜갈비',
    summary: '매콤함이 폭발하는 대구 동인동 골목의 명물',
    origin: '대구 동인동의 작은 골목 식당들에서 갈비를 매운 고춧가루 양념에 바짝 조려내며 시작된 음식입니다. 국물 없이 매콤 짭짤하게 조려낸 것이 특징으로 대구의 매운맛을 대표합니다.',
    ingredients: ['소갈비', '고춧가루', '마늘', '대파', '통깨'],
    recipe: [
      '소갈비를 찬물에 담가 핏물을 뺀다.',
      '갈비를 삶아 부드럽게 초벌한다.',
      '고춧가루, 마늘로 만든 매운 양념에 조린다.',
      '대파와 통깨를 뿌려 매콤하게 마무리한다.',
    ],
    image: img('daegu-dongin-main', 700, 560),
    thumbs: [img('daegu-dongin-1', 500, 500), img('daegu-dongin-2', 500, 500), img('daegu-dongin-3', 500, 500)],
  },

  // 대전
  {
    id: 'local-daejeon-1',
    region: '대전',
    name: '대전칼국수',
    summary: '얼큰한 육수에 두부 두루치기를 곁들이는 대전식 칼국수',
    origin: '대전은 예로부터 칼국수 골목이 발달해 다양한 스타일의 칼국수 문화가 자리 잡았습니다. 특히 매콤한 두부두루치기를 곁들여 먹는 방식이 대전만의 독특한 상차림으로 유명합니다.',
    ingredients: ['칼국수면', '멸치육수', '애호박', '김가루', '두부두루치기'],
    recipe: [
      '멸치와 다시마로 육수를 우려낸다.',
      '칼국수면을 넣고 끓인다.',
      '애호박을 채 썰어 넣고 한소끔 끓인다.',
      '두부두루치기를 곁들여 함께 낸다.',
    ],
    image: img('daejeon-kalguksu-main', 700, 560),
    thumbs: [img('daejeon-kalguksu-1', 500, 500), img('daejeon-kalguksu-2', 500, 500), img('daejeon-kalguksu-3', 500, 500)],
  },
  {
    id: 'local-daejeon-2',
    region: '대전',
    name: '두부두루치기',
    summary: '칼국수의 단짝, 매콤하게 볶아낸 대전식 두부 요리',
    origin: '대전 칼국수 골목 상인들이 두부에 매콤한 양념과 돼지고기를 더해 볶아내며 칼국수와 함께 곁들이는 문화가 생겼습니다. 밥반찬으로도, 술안주로도 손색없는 대전의 명물입니다.',
    ingredients: ['두부', '돼지고기', '고춧가루', '양파', '대파', '고추장'],
    recipe: [
      '두부를 도톰하게 썰어 노릇하게 지진다.',
      '돼지고기를 고춧가루 양념에 볶는다.',
      '양파와 대파를 넣고 함께 볶는다.',
      '지진 두부를 넣고 양념이 배도록 볶는다.',
    ],
    image: img('daejeon-dubu-main', 700, 560),
    thumbs: [img('daejeon-dubu-1', 500, 500), img('daejeon-dubu-2', 500, 500), img('daejeon-dubu-3', 500, 500)],
  },
  {
    id: 'local-daejeon-3',
    region: '대전',
    name: '오징어무침 칼국수',
    summary: '매콤새콤한 오징어무침을 얹어 비벼먹는 대전식 별미',
    origin: '칼국수에 새콤달콤 매운 오징어무침을 고명으로 올려 비벼 먹는 대전 특유의 조합입니다. 시원한 칼국수 국물과 매콤한 오징어무침이 함께 어우러지는 것이 특징입니다.',
    ingredients: ['칼국수면', '오징어', '고춧가루', '식초', '설탕', '오이'],
    recipe: [
      '오징어를 데쳐 채 썬다.',
      '고춧가루, 식초, 설탕으로 새콤달콤 무침 양념을 만든다.',
      '오징어와 오이를 양념에 무친다.',
      '삶은 칼국수면 위에 오징어무침을 듬뿍 올린다.',
    ],
    image: img('daejeon-ojingeo-main', 700, 560),
    thumbs: [img('daejeon-ojingeo-1', 500, 500), img('daejeon-ojingeo-2', 500, 500), img('daejeon-ojingeo-3', 500, 500)],
  },
  {
    id: 'local-daejeon-4',
    region: '대전',
    name: '대전식 곱창전골',
    summary: '얼큰한 국물에 야채가 가득한 대전 곱창골목의 전골',
    origin: '대전 곱창골목 상인들이 신선한 곱창에 채소를 듬뿍 넣고 얼큰하게 끓여내며 발전한 음식입니다. 곱창의 쫄깃함과 채소의 시원한 맛이 어우러진 국물이 특징입니다.',
    ingredients: ['소곱창', '대파', '깻잎', '고춧가루', '들깻가루', '떡'],
    recipe: [
      '곱창을 밀가루로 여러 번 씻어 손질한다.',
      '육수에 고춧가루 양념을 풀어 끓인다.',
      '곱창과 떡을 넣고 끓인다.',
      '대파와 깻잎, 들깻가루를 올려 마무리한다.',
    ],
    image: img('daejeon-gopchang-main', 700, 560),
    thumbs: [img('daejeon-gopchang-1', 500, 500), img('daejeon-gopchang-2', 500, 500), img('daejeon-gopchang-3', 500, 500)],
  },

  // 인천
  {
    id: 'local-incheon-1',
    region: '인천',
    name: '인천 짜장면',
    summary: '개항과 함께 태어난 대한민국 짜장면의 고향',
    origin: '인천 차이나타운은 짜장면이 처음 탄생한 곳으로 알려져 있습니다. 개항 이후 인천항에 정착한 화교들이 춘장에 캐러멜을 더해 한국인 입맛에 맞춘 짜장면을 만들어 팔기 시작했습니다.',
    ingredients: ['중화면', '춘장', '돼지고기', '양파', '감자', '전분물'],
    recipe: [
      '춘장을 기름에 볶아 텁텁한 맛을 없앤다.',
      '돼지고기와 양파, 감자를 큼직하게 썰어 볶는다.',
      '볶은 춘장을 넣고 물을 부어 끓인다.',
      '전분물로 농도를 맞추고 삶은 면에 부어낸다.',
    ],
    image: img('incheon-jjajang-main', 700, 560),
    thumbs: [img('incheon-jjajang-1', 500, 500), img('incheon-jjajang-2', 500, 500), img('incheon-jjajang-3', 500, 500)],
  },
  {
    id: 'local-incheon-2',
    region: '인천',
    name: '인천식 냉면',
    summary: '실향민의 그리움이 담긴 인천 노포의 냉면',
    origin: '한국전쟁 이후 이북 실향민들이 인천에 정착하며 고향의 냉면을 재현한 것에서 비롯되었습니다. 담백한 육수와 쫄깃한 면발로 오랜 시간 인천 시민들의 사랑을 받아온 음식입니다.',
    ingredients: ['메밀면', '소고기육수', '동치미국물', '무절임', '삶은계란'],
    recipe: [
      '소고기 육수와 동치미 국물을 섞어 살얼음이 되도록 얼린다.',
      '메밀면을 삶아 찬물에 헹궈 사리를 만든다.',
      '그릇에 면을 담고 살얼음 육수를 붓는다.',
      '무절임과 삶은계란을 고명으로 올린다.',
    ],
    image: img('incheon-naengmyeon-main', 700, 560),
    thumbs: [img('incheon-naengmyeon-1', 500, 500), img('incheon-naengmyeon-2', 500, 500), img('incheon-naengmyeon-3', 500, 500)],
  },
  {
    id: 'local-incheon-3',
    region: '인천',
    name: '쫄면',
    summary: '냉면 공장의 실수에서 탄생한 인천의 발명품',
    origin: '1970년대 인천의 한 냉면 공장에서 면 뽑는 기계의 구멍이 잘못되어 우연히 두껍고 쫄깃한 면이 만들어졌고, 이를 매콤하게 비벼 먹으면서 쫄면이 탄생했다고 전해집니다.',
    ingredients: ['쫄면 면발', '고추장', '식초', '설탕', '양배추', '오이'],
    recipe: [
      '고추장, 식초, 설탕으로 새콤달콤한 양념장을 만든다.',
      '쫄면 면발을 삶아 찬물에 비벼가며 헹군다.',
      '양배추와 오이를 채 썰어 준비한다.',
      '면과 채소에 양념장을 넣고 골고루 비빈다.',
    ],
    image: img('incheon-jjolmyeon-main', 700, 560),
    thumbs: [img('incheon-jjolmyeon-1', 500, 500), img('incheon-jjolmyeon-2', 500, 500), img('incheon-jjolmyeon-3', 500, 500)],
  },
  {
    id: 'local-incheon-4',
    region: '인천',
    name: '소래포구 젓갈',
    summary: '서해 갯벌의 짭조름한 맛을 담은 인천의 젓갈',
    origin: '인천 소래포구는 서해에서 갓 잡은 어패류가 모이는 포구로, 오래전부터 신선한 재료로 젓갈을 담가온 곳입니다. 밥도둑으로 불리는 감칠맛 나는 젓갈들이 포구 시장을 가득 채웁니다.',
    ingredients: ['새우', '소금', '까나리액젓', '고춧가루', '다진마늘'],
    recipe: [
      '신선한 새우를 소금에 버무려 항아리에 담는다.',
      '서늘한 곳에서 일정 기간 숙성시킨다.',
      '숙성된 새우젓에 고춧가루와 다진마늘을 넣어 무친다.',
      '통에 담아 냉장 보관하며 밥반찬으로 즐긴다.',
    ],
    image: img('incheon-jeotgal-main', 700, 560),
    thumbs: [img('incheon-jeotgal-1', 500, 500), img('incheon-jeotgal-2', 500, 500), img('incheon-jeotgal-3', 500, 500)],
  },
];

/* ===================== 엽기 호러 음식 데이터 ===================== */

const HORROR_CATEGORIES = [
  { slug: 'korean', name: '한식' },
  { slug: 'japanese', name: '일식' },
  { slug: 'western', name: '양식' },
  { slug: 'drink', name: '음료' },
  { slug: 'dessert', name: '디저트' },
];

const HORROR_FOODS = [
  // 한식
  {
    id: 'horror-korean-1',
    category: '한식',
    name: '피 흘리는 옥수수',
    tagline: '바삭한 옥수수 사이로 붉은 치즈가 피처럼 흘러내립니다.',
    ingredients: ['찐 옥수수', '레드체다치즈', '토마토소스', '후춧가루'],
    recipe: [
      '옥수수를 찜통에 쪄서 준비한다.',
      '레드체다치즈와 토마토소스를 섞어 붉은 소스를 만든다.',
      '옥수수 위에 소스를 듬뿍 끼얹는다.',
      '전자레인지에 돌려 치즈가 흘러내리도록 녹인다.',
    ],
    image: img('horror-corn-main', 700, 560),
    extraImages: [img('horror-corn-1', 500, 500), img('horror-corn-2', 500, 500)],
  },
  {
    id: 'horror-korean-2',
    category: '한식',
    name: '핏빛 김치찌개',
    tagline: '펄펄 끓는 붉은 국물 속에서 무언가 꿈틀거리는 것 같습니다.',
    ingredients: ['묵은지', '돼지고기', '고춧가루', '문어다리', '두부'],
    recipe: [
      '묵은지와 돼지고기를 진하게 볶는다.',
      '고춧가루를 듬뿍 넣어 핏빛 국물을 만든다.',
      '데친 문어다리를 국물 위에 촉수처럼 띄운다.',
      '두부를 큼직하게 썰어 넣고 끓인다.',
    ],
    image: img('horror-kimchi-main', 700, 560),
    extraImages: [img('horror-kimchi-1', 500, 500), img('horror-kimchi-2', 500, 500)],
  },
  {
    id: 'horror-korean-3',
    category: '한식',
    name: '악마의 눈알 순대',
    tagline: '순대 접시 위에서 수십 개의 눈알이 당신을 지켜봅니다.',
    ingredients: ['순대', '메추리알', '먹물', '소금', '들기름'],
    recipe: [
      '메추리알을 삶아 먹물에 담가 검은 눈동자를 만든다.',
      '순대를 큼직하게 썰어 접시에 담는다.',
      '눈알 메추리알을 순대 사이사이에 올린다.',
      '들기름과 소금을 곁들여 낸다.',
    ],
    image: img('horror-sundae-main', 700, 560),
    extraImages: [img('horror-sundae-1', 500, 500), img('horror-sundae-2', 500, 500)],
  },
  {
    id: 'horror-korean-4',
    category: '한식',
    name: '저주받은 육회',
    tagline: '붉은 촛농처럼 흘러내리는 소스가 접시를 물들입니다.',
    ingredients: ['소고기 육회', '고추기름', '메추리알노른자', '배', '통깨'],
    recipe: [
      '신선한 소고기를 얇게 채 썬다.',
      '접시에 배를 깔고 육회를 산처럼 쌓는다.',
      '고추기름을 촛농처럼 흘려가며 두른다.',
      '메추리알노른자를 얹고 통깨를 뿌린다.',
    ],
    image: img('horror-yukhoe-main', 700, 560),
    extraImages: [img('horror-yukhoe-1', 500, 500), img('horror-yukhoe-2', 500, 500)],
  },

  // 일식
  {
    id: 'horror-japanese-1',
    category: '일식',
    name: '유령 초밥',
    tagline: '흰 쌀밥 유령들이 접시 위를 둥둥 떠다니는 듯합니다.',
    ingredients: ['초밥용 밥', '오징어', '김', '검은깨'],
    recipe: [
      '초밥용 밥을 유령 모양으로 동그랗게 빚는다.',
      '얇게 썬 오징어를 유령 몸통에 덮는다.',
      '김을 잘라 눈과 입 모양을 만든다.',
      '검은깨로 눈동자를 콕콕 찍어 완성한다.',
    ],
    image: img('horror-ghostsushi-main', 700, 560),
    extraImages: [img('horror-ghostsushi-1', 500, 500), img('horror-ghostsushi-2', 500, 500)],
  },
  {
    id: 'horror-japanese-2',
    category: '일식',
    name: '촉수 우동',
    tagline: '그릇 밖으로 삐져나온 촉수가 꿈틀대는 것 같습니다.',
    ingredients: ['우동면', '오징어다리', '가쓰오다시', '먹물', '쪽파'],
    recipe: [
      '가쓰오다시에 먹물을 살짝 풀어 검은 국물을 만든다.',
      '우동면을 삶아 그릇에 담는다.',
      '데친 오징어다리를 그릇 가장자리에 촉수처럼 걸쳐 놓는다.',
      '검은 국물을 붓고 쪽파를 뿌린다.',
    ],
    image: img('horror-tentacleudon-main', 700, 560),
    extraImages: [img('horror-tentacleudon-1', 500, 500), img('horror-tentacleudon-2', 500, 500)],
  },
  {
    id: 'horror-japanese-3',
    category: '일식',
    name: '눈알 회덮밥',
    tagline: '수십 개의 눈동자가 밥 위에서 반짝이며 당신을 바라봅니다.',
    ingredients: ['연어', '흰살생선', '메추리알', '연어알', '초고추장'],
    recipe: [
      '연어와 흰살생선을 먹기 좋게 썬다.',
      '메추리알을 삶아 눈알 모양으로 손질한다.',
      '밥 위에 회와 눈알 메추리알을 가득 올린다.',
      '연어알을 흩뿌리고 초고추장을 곁들인다.',
    ],
    image: img('horror-eyeballbowl-main', 700, 560),
    extraImages: [img('horror-eyeballbowl-1', 500, 500), img('horror-eyeballbowl-2', 500, 500)],
  },
  {
    id: 'horror-japanese-4',
    category: '일식',
    name: '저주받은 타코야키',
    tagline: '겉은 멀쩡해 보이지만 한 입 베어물면 검은 속이 흘러나옵니다.',
    ingredients: ['타코야키 반죽', '문어', '먹물', '블랙마요네즈', '가쓰오부시'],
    recipe: [
      '반죽에 먹물을 섞어 검게 물들인다.',
      '틀에 반죽을 붓고 문어를 넣어 동그랗게 굽는다.',
      '블랙마요네즈를 지그재그로 뿌린다.',
      '가쓰오부시를 올려 살아있는 듯 흔들리게 낸다.',
    ],
    image: img('horror-takoyaki-main', 700, 560),
    extraImages: [img('horror-takoyaki-1', 500, 500), img('horror-takoyaki-2', 500, 500)],
  },

  // 양식
  {
    id: 'horror-western-1',
    category: '양식',
    name: '거미줄 피자',
    tagline: '치즈가 늘어나며 만드는 끈적한 거미줄이 접시를 뒤덮습니다.',
    ingredients: ['피자도우', '토마토소스', '모짜렐라치즈', '검은올리브'],
    recipe: [
      '도우에 토마토소스를 바른다.',
      '모짜렐라치즈를 듬뿍 올려 굽는다.',
      '검은올리브로 거미 모양을 만들어 올린다.',
      '치즈를 길게 늘여 거미줄 모양을 연출한다.',
    ],
    image: img('horror-spiderpizza-main', 700, 560),
    extraImages: [img('horror-spiderpizza-1', 500, 500), img('horror-spiderpizza-2', 500, 500)],
  },
  {
    id: 'horror-western-2',
    category: '양식',
    name: '핏빛 파스타',
    tagline: '접시 위로 검붉은 소스가 마치 상처에서 흐르듯 번집니다.',
    ingredients: ['스파게티면', '토마토소스', '오징어먹물', '홍합', '파슬리'],
    recipe: [
      '토마토소스에 오징어먹물을 섞어 검붉게 만든다.',
      '스파게티면을 삶아 소스에 볶는다.',
      '데친 홍합을 껍데기째 올려 장식한다.',
      '파슬리를 뿌려 마무리한다.',
    ],
    image: img('horror-bloodpasta-main', 700, 560),
    extraImages: [img('horror-bloodpasta-1', 500, 500), img('horror-bloodpasta-2', 500, 500)],
  },
  {
    id: 'horror-western-3',
    category: '양식',
    name: '뇌 모양 스테이크 타르타르',
    tagline: '주름진 붉은 살덩이가 접시 위에서 꿈틀거리는 것 같습니다.',
    ingredients: ['소고기 안심', '양파', '케이퍼', '달걀노른자', '후춧가루'],
    recipe: [
      '소고기 안심을 잘게 다진다.',
      '양파와 케이퍼를 다져 섞는다.',
      '뇌 모양 틀에 담아 주름 모양을 잡는다.',
      '달걀노른자를 얹고 후춧가루를 뿌린다.',
    ],
    image: img('horror-braintartare-main', 700, 560),
    extraImages: [img('horror-braintartare-1', 500, 500), img('horror-braintartare-2', 500, 500)],
  },
  {
    id: 'horror-western-4',
    category: '양식',
    name: '좀비 버거',
    tagline: '초록빛 번과 검붉은 소스가 만들어내는 부패한 비주얼.',
    ingredients: ['초록색 번', '패티', '블랙치즈', '핏빛 소스', '피클'],
    recipe: [
      '반죽에 식용색소를 넣어 초록색 번을 만든다.',
      '패티를 두툼하게 구워 준비한다.',
      '블랙치즈를 패티 위에 녹인다.',
      '핏빛 소스를 흘러내리듯 뿌리고 번으로 덮는다.',
    ],
    image: img('horror-zombieburger-main', 700, 560),
    extraImages: [img('horror-zombieburger-1', 500, 500), img('horror-zombieburger-2', 500, 500)],
  },

  // 음료
  {
    id: 'horror-drink-1',
    category: '음료',
    name: '눈알 얼음 아메리카노',
    tagline: '시원한 커피 속, 눈알 얼음이 둥둥 떠서 당신을 응시합니다.',
    ingredients: ['아메리카노', '리치', '블루베리', '얼음틀'],
    recipe: [
      '리치 안에 블루베리를 넣어 눈알 모양을 만든다.',
      '눈알 모양을 얼음틀에 넣고 물을 부어 얼린다.',
      '차가운 아메리카노를 컵에 붓는다.',
      '눈알 얼음을 띄워 완성한다.',
    ],
    image: img('horror-eyeballcoffee-main', 700, 560),
    extraImages: [img('horror-eyeballcoffee-1', 500, 500), img('horror-eyeballcoffee-2', 500, 500)],
  },
  {
    id: 'horror-drink-2',
    category: '음료',
    name: '핏빛 칵테일',
    tagline: '잔 아래로 서서히 퍼지는 붉은 그라데이션이 섬뜩합니다.',
    ingredients: ['석류시럽', '탄산수', '레몬즙', '체리'],
    recipe: [
      '잔에 석류시럽을 먼저 붓는다.',
      '얼음을 채우고 탄산수를 천천히 붓는다.',
      '레몬즙을 살짝 더해 층을 만든다.',
      '체리를 올려 핏빛 방울처럼 장식한다.',
    ],
    image: img('horror-bloodcocktail-main', 700, 560),
    extraImages: [img('horror-bloodcocktail-1', 500, 500), img('horror-bloodcocktail-2', 500, 500)],
  },
  {
    id: 'horror-drink-3',
    category: '음료',
    name: '독약 슬러시',
    tagline: '형광빛 초록 슬러시가 마치 독극물처럼 스산하게 빛납니다.',
    ingredients: ['청포도시럽', '얼음', '탄산수', '식용색소'],
    recipe: [
      '청포도시럽에 식용색소를 더해 진한 초록빛을 만든다.',
      '얼음과 함께 블렌더에 곱게 간다.',
      '컵에 담고 탄산수를 살짝 섞는다.',
      '드라이아이스 연출로 안개를 더한다.',
    ],
    image: img('horror-poisonslush-main', 700, 560),
    extraImages: [img('horror-poisonslush-1', 500, 500), img('horror-poisonslush-2', 500, 500)],
  },
  {
    id: 'horror-drink-4',
    category: '음료',
    name: '거미줄 라떼',
    tagline: '우유 거품 위로 그려진 거미줄이 스멀스멀 퍼져나갑니다.',
    ingredients: ['에스프레소', '우유', '초콜릿시럽'],
    recipe: [
      '에스프레소를 컵에 내린다.',
      '거품 낸 우유를 부어 라떼를 만든다.',
      '초콜릿시럽으로 거미줄 모양을 그린다.',
      '이쑤시개로 무늬를 퍼뜨려 완성한다.',
    ],
    image: img('horror-spiderlatte-main', 700, 560),
    extraImages: [img('horror-spiderlatte-1', 500, 500), img('horror-spiderlatte-2', 500, 500)],
  },

  // 디저트
  {
    id: 'horror-dessert-1',
    category: '디저트',
    name: '손가락 쿠키',
    tagline: '잘려나간 손가락처럼 생긴 쿠키가 접시 가득 놓여 있습니다.',
    ingredients: ['버터쿠키반죽', '아몬드', '붉은잼'],
    recipe: [
      '쿠키반죽을 손가락 모양으로 길게 빚는다.',
      '칼로 마디 자국을 얕게 낸다.',
      '한쪽 끝에 아몬드를 손톱처럼 붙인다.',
      '굽기 전 손톱 아래에 붉은잼을 살짝 발라 굽는다.',
    ],
    image: img('horror-fingercookie-main', 700, 560),
    extraImages: [img('horror-fingercookie-1', 500, 500), img('horror-fingercookie-2', 500, 500)],
  },
  {
    id: 'horror-dessert-2',
    category: '디저트',
    name: '묘비 티라미수',
    tagline: '초코 파우더 무덤 사이로 비스듬히 꽂힌 작은 묘비들.',
    ingredients: ['마스카포네크림', '커피시럽', '초코쿠키', '코코아파우더'],
    recipe: [
      '커피시럽에 적신 쿠키를 컵 바닥에 깐다.',
      '마스카포네크림을 층층이 올린다.',
      '코코아파우더를 흙처럼 뿌려 덮는다.',
      '초코쿠키를 묘비 모양으로 잘라 꽂는다.',
    ],
    image: img('horror-tombstonetiramisu-main', 700, 560),
    extraImages: [img('horror-tombstonetiramisu-1', 500, 500), img('horror-tombstonetiramisu-2', 500, 500)],
  },
  {
    id: 'horror-dessert-3',
    category: '디저트',
    name: '뇌 모양 젤리',
    tagline: '탱글탱글 흔들리는 주름진 젤리가 그릇 위에서 진동합니다.',
    ingredients: ['젤라틴', '포도주스', '식용색소', '연유'],
    recipe: [
      '포도주스에 젤라틴을 녹여 붉은 젤리액을 만든다.',
      '뇌 모양 실리콘 틀에 부어 굳힌다.',
      '틀에서 조심스럽게 꺼낸다.',
      '연유를 살짝 뿌려 광택을 낸다.',
    ],
    image: img('horror-brainjelly-main', 700, 560),
    extraImages: [img('horror-brainjelly-1', 500, 500), img('horror-brainjelly-2', 500, 500)],
  },
  {
    id: 'horror-dessert-4',
    category: '디저트',
    name: '유령 머랭',
    tagline: '어둠 속에서 하얗게 떠오르는 작은 유령들이 속삭입니다.',
    ingredients: ['달걀흰자', '설탕', '초콜릿펜'],
    recipe: [
      '달걀흰자와 설탕을 단단하게 거품 낸다.',
      '짤주머니에 담아 유령 모양으로 짠다.',
      '낮은 온도에서 바삭하게 굽는다.',
      '초콜릿펜으로 눈과 입을 그려 완성한다.',
    ],
    image: img('horror-ghostmeringue-main', 700, 560),
    extraImages: [img('horror-ghostmeringue-1', 500, 500), img('horror-ghostmeringue-2', 500, 500)],
  },
];

/* ===================== 로컬 플레이스홀더 이미지 =====================
   실제 촬영/생성 사진이 없는 상태에서 무관한 랜덤 사진(picsum.photos)을 그대로 쓰지 않기 위해,
   각 카드의 음식명 + 지역/카테고리를 그대로 표시하는 로컬 SVG 플레이스홀더로 교체한다.
   실제 이미지가 준비되면 해당 항목의 image / thumbs / extraImages 를 실제 파일 경로로
   바꾸기만 하면 되고, 이 블록은 그대로 두어도 무방하다(교체된 항목엔 영향 없음). */
function escapeSvgText(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* 음식 형태를 짐작할 수 있는 단순 라인아트 아이콘.
   "이미지 추가" UI처럼 보이던 원+플러스 아이콘 대신, 각 음식의 실제 조리 형태
   (그릇/국수/구이/전/회/만두/피자/버거/디저트/음료/옥수수/접시)를 그려 넣는다. */
function iconMarkup(type, cx, cy, r, accent) {
  const sw = Math.max(2, r * 0.07);
  switch (type) {
    case 'soup':
      return `
        <path d="M ${cx - r},${cy} Q ${cx - r},${cy + r * 0.9} ${cx},${cy + r * 0.9} Q ${cx + r},${cy + r * 0.9} ${cx + r},${cy} Z" fill="none" stroke="${accent}" stroke-width="${sw}"/>
        <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.22}" fill="none" stroke="${accent}" stroke-width="${sw}"/>
        <path d="M ${cx - r * 0.35},${cy - r * 0.5} q ${r * 0.15},-${r * 0.25} 0,-${r * 0.5}" fill="none" stroke="${accent}" stroke-width="${sw * 0.7}" stroke-linecap="round" opacity="0.8"/>
        <path d="M ${cx},${cy - r * 0.55} q ${r * 0.15},-${r * 0.25} 0,-${r * 0.5}" fill="none" stroke="${accent}" stroke-width="${sw * 0.7}" stroke-linecap="round" opacity="0.8"/>
        <path d="M ${cx + r * 0.35},${cy - r * 0.5} q ${r * 0.15},-${r * 0.25} 0,-${r * 0.5}" fill="none" stroke="${accent}" stroke-width="${sw * 0.7}" stroke-linecap="round" opacity="0.8"/>`;
    case 'noodle':
      return `
        <path d="M ${cx - r},${cy} Q ${cx - r},${cy + r * 0.9} ${cx},${cy + r * 0.9} Q ${cx + r},${cy + r * 0.9} ${cx + r},${cy} Z" fill="none" stroke="${accent}" stroke-width="${sw}"/>
        <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.22}" fill="none" stroke="${accent}" stroke-width="${sw}"/>
        <path d="M ${cx - r * 0.5},${cy + r * 0.15} q ${r * 0.25},-${r * 0.25} ${r * 0.5},0 q ${r * 0.25},${r * 0.25} ${r * 0.5},0" fill="none" stroke="${accent}" stroke-width="${sw * 0.6}" stroke-linecap="round" opacity="0.85"/>`;
    case 'grill':
      return `
        <line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="${accent}" stroke-width="${sw * 0.7}" stroke-linecap="round"/>
        <circle cx="${cx - r * 0.5}" cy="${cy}" r="${r * 0.22}" fill="none" stroke="${accent}" stroke-width="${sw * 0.7}"/>
        <circle cx="${cx}" cy="${cy}" r="${r * 0.22}" fill="none" stroke="${accent}" stroke-width="${sw * 0.7}"/>
        <circle cx="${cx + r * 0.5}" cy="${cy}" r="${r * 0.22}" fill="none" stroke="${accent}" stroke-width="${sw * 0.7}"/>
        <path d="M ${cx - r * 0.15},${cy + r * 0.35} q ${r * 0.15},${r * 0.35} 0,${r * 0.55} q -${r * 0.15},-${r * 0.2} 0,-${r * 0.55}" fill="${accent}" opacity="0.6"/>`;
    case 'pancake':
      return `
        <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.55}" fill="none" stroke="${accent}" stroke-width="${sw}"/>
        <circle cx="${cx - r * 0.4}" cy="${cy - r * 0.05}" r="${r * 0.08}" fill="${accent}" opacity="0.75"/>
        <circle cx="${cx + r * 0.1}" cy="${cy + r * 0.15}" r="${r * 0.08}" fill="${accent}" opacity="0.75"/>
        <circle cx="${cx + r * 0.45}" cy="${cy - r * 0.1}" r="${r * 0.08}" fill="${accent}" opacity="0.75"/>`;
    case 'slice':
      return [-0.3, 0, 0.3].map((o) =>
        `<rect x="${cx + r * o - r * 0.12}" y="${cy - r * 0.55}" width="${r * 0.24}" height="${r * 1.1}" rx="${r * 0.1}" fill="none" stroke="${accent}" stroke-width="${sw * 0.75}" transform="rotate(${o * 40} ${cx + r * o} ${cy})"/>`
      ).join('');
    case 'dumpling':
      return `
        <path d="M ${cx - r},${cy + r * 0.4} Q ${cx},${cy + r * 0.7} ${cx + r},${cy + r * 0.4}" fill="none" stroke="${accent}" stroke-width="${sw * 0.7}"/>
        <circle cx="${cx - r * 0.45}" cy="${cy - r * 0.05}" r="${r * 0.32}" fill="none" stroke="${accent}" stroke-width="${sw * 0.7}"/>
        <circle cx="${cx + r * 0.45}" cy="${cy - r * 0.05}" r="${r * 0.32}" fill="none" stroke="${accent}" stroke-width="${sw * 0.7}"/>
        <circle cx="${cx}" cy="${cy - r * 0.35}" r="${r * 0.32}" fill="none" stroke="${accent}" stroke-width="${sw * 0.7}"/>`;
    case 'pizza':
      return `
        <path d="M ${cx},${cy - r} L ${cx - r * 0.85},${cy + r * 0.6} Q ${cx},${cy + r * 0.85} ${cx + r * 0.85},${cy + r * 0.6} Z" fill="none" stroke="${accent}" stroke-width="${sw}"/>
        <circle cx="${cx - r * 0.15}" cy="${cy - r * 0.1}" r="${r * 0.09}" fill="${accent}"/>
        <circle cx="${cx + r * 0.25}" cy="${cy + r * 0.15}" r="${r * 0.09}" fill="${accent}"/>
        <circle cx="${cx - r * 0.05}" cy="${cy + r * 0.35}" r="${r * 0.09}" fill="${accent}"/>`;
    case 'burger':
      return `
        <path d="M ${cx - r * 0.9},${cy - r * 0.45} Q ${cx},${cy - r * 1.05} ${cx + r * 0.9},${cy - r * 0.45} Z" fill="none" stroke="${accent}" stroke-width="${sw}"/>
        <line x1="${cx - r * 0.9}" y1="${cy - r * 0.15}" x2="${cx + r * 0.9}" y2="${cy - r * 0.15}" stroke="${accent}" stroke-width="${sw * 0.7}"/>
        <line x1="${cx - r * 0.9}" y1="${cy + r * 0.2}" x2="${cx + r * 0.9}" y2="${cy + r * 0.2}" stroke="${accent}" stroke-width="${sw * 0.7}"/>
        <path d="M ${cx - r * 0.9},${cy + r * 0.5} L ${cx + r * 0.9},${cy + r * 0.5}" stroke="${accent}" stroke-width="${sw}" stroke-linecap="round"/>`;
    case 'dessert':
      return `
        <path d="M ${cx - r * 0.7},${cy + r * 0.5} L ${cx - r * 0.7},${cy - r * 0.1} Q ${cx},${cy - r * 0.6} ${cx + r * 0.7},${cy - r * 0.1} L ${cx + r * 0.7},${cy + r * 0.5} Z" fill="none" stroke="${accent}" stroke-width="${sw}"/>
        <circle cx="${cx}" cy="${cy - r * 0.75}" r="${r * 0.13}" fill="${accent}"/>`;
    case 'drink':
      return `
        <path d="M ${cx - r * 0.6},${cy - r * 0.6} L ${cx - r * 0.4},${cy + r * 0.7} Q ${cx},${cy + r * 0.85} ${cx + r * 0.4},${cy + r * 0.7} L ${cx + r * 0.6},${cy - r * 0.6} Z" fill="none" stroke="${accent}" stroke-width="${sw}"/>
        <line x1="${cx + r * 0.15}" y1="${cy - r * 0.9}" x2="${cx + r * 0.35}" y2="${cy - r * 0.2}" stroke="${accent}" stroke-width="${sw * 0.6}" stroke-linecap="round"/>
        <circle cx="${cx - r * 0.15}" cy="${cy - r * 0.05}" r="${r * 0.07}" fill="${accent}" opacity="0.75"/>
        <circle cx="${cx + r * 0.05}" cy="${cy + r * 0.25}" r="${r * 0.07}" fill="${accent}" opacity="0.75"/>`;
    case 'corn':
      return `
        <ellipse cx="${cx}" cy="${cy}" rx="${r * 0.42}" ry="${r * 0.95}" fill="none" stroke="${accent}" stroke-width="${sw}"/>
        ${[-0.5, -0.166, 0.166, 0.5].map((f) => `<line x1="${cx - r * 0.42}" y1="${cy + r * 0.95 * f}" x2="${cx + r * 0.42}" y2="${cy + r * 0.95 * f}" stroke="${accent}" stroke-width="${sw * 0.5}" opacity="0.75"/>`).join('')}`;
    default:
      return `
        <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.42}" fill="none" stroke="${accent}" stroke-width="${sw}"/>
        <ellipse cx="${cx}" cy="${cy}" rx="${r * 0.55}" ry="${r * 0.24}" fill="none" stroke="${accent}" stroke-width="${sw * 0.6}" opacity="0.7"/>`;
  }
}

function buildPlaceholder(name, tag, w, h, theme, note, iconType) {
  const isHorror = theme === 'horror';
  const bg1 = isHorror ? '#0d0d0d' : '#21302B';
  const bg2 = isHorror ? '#3a0a06' : '#33463f';
  const accent = isHorror ? '#B8180A' : '#FFC200';
  const nameSize = Math.max(15, Math.round(w * 0.05));
  const tagSize = Math.max(11, Math.round(w * 0.03));
  const noteSize = Math.max(9, Math.round(w * 0.022));
  const iconR = Math.min(w, h) * 0.15;
  const iconCy = h * 0.36;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg1}"/>
        <stop offset="100%" stop-color="${bg2}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <rect x="16" y="16" width="${w - 32}" height="${h - 32}" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="9 7" opacity="0.4"/>
    ${iconMarkup(iconType, w / 2, iconCy, iconR, accent)}
    <text x="50%" y="${h * 0.62}" text-anchor="middle" font-family="Pretendard, sans-serif" font-size="${nameSize}" font-weight="700" fill="#F6F3EA">${escapeSvgText(name)}</text>
    <text x="50%" y="${h * 0.62 + nameSize + 10}" text-anchor="middle" font-family="Pretendard, sans-serif" font-size="${tagSize}" fill="${accent}" letter-spacing="1">${escapeSvgText(tag)}</text>
    <text x="50%" y="${h - 22}" text-anchor="middle" font-family="Pretendard, sans-serif" font-size="${noteSize}" fill="#F6F3EA" opacity="0.55">${escapeSvgText(note)}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/* 52개 음식 각각의 실제 조리 형태에 맞춘 아이콘 지정 (이름 기준 1:1 매핑) */
const PLACEHOLDER_ICONS = {
  '감자옹심이': 'soup', '콧등치기국수': 'noodle', '양미리구이': 'grill', '황태해장국': 'soup',
  '안동찜닭': 'soup', '진주냉면': 'noodle', '아귀찜': 'soup', '문어숙회': 'slice',
  '홍어삼합': 'slice', '꼬막무침': 'plate', '재첩국': 'soup', '갓김치': 'plate',
  '밀면': 'noodle', '돼지국밥': 'soup', '씨앗호떡': 'pancake', '동래파전': 'pancake',
  '몸국': 'soup', '고기국수': 'noodle', '빙떡': 'pancake', '갈치조림': 'soup',
  '막창구이': 'grill', '뭉티기': 'slice', '납작만두': 'dumpling', '동인동찜갈비': 'grill',
  '대전칼국수': 'noodle', '두부두루치기': 'grill', '오징어무침 칼국수': 'noodle', '대전식 곱창전골': 'soup',
  '인천 짜장면': 'noodle', '인천식 냉면': 'noodle', '쫄면': 'noodle', '소래포구 젓갈': 'plate',
  '피 흘리는 옥수수': 'corn', '핏빛 김치찌개': 'soup', '악마의 눈알 순대': 'slice', '저주받은 육회': 'slice',
  '유령 초밥': 'dumpling', '촉수 우동': 'noodle', '눈알 회덮밥': 'noodle', '저주받은 타코야키': 'dumpling',
  '거미줄 피자': 'pizza', '핏빛 파스타': 'noodle', '뇌 모양 스테이크 타르타르': 'slice', '좀비 버거': 'burger',
  '눈알 얼음 아메리카노': 'drink', '핏빛 칵테일': 'drink', '독약 슬러시': 'drink', '거미줄 라떼': 'drink',
  '손가락 쿠키': 'dessert', '묘비 티라미수': 'dessert', '뇌 모양 젤리': 'dessert', '유령 머랭': 'dessert',
};

/* picsum 시드 문자열(예: 'gangwon-ongsimi-main')을 그대로 실제 파일명 규칙으로 재사용한다.
   docs/image-prompts.md 에 정리된 "예상 파일 경로"와 100% 동일한 이름이 나온다. */
function seedFromUrl(url) {
  const m = url.match(/seed\/([^/]+)\//);
  return m ? m[1] : '';
}

LOCAL_FOODS.forEach((f) => {
  const icon = PLACEHOLDER_ICONS[f.name] || 'plate';
  const mainSlug = seedFromUrl(f.image).replace(/-main$/, '');
  const thumbSlugs = f.thumbs.map(seedFromUrl);

  f.imageFallback = buildPlaceholder(f.name, f.region, 700, 560, 'local', '실제 사진 촬영 예정', icon);
  f.thumbsFallback = thumbSlugs.map((_, i) =>
    buildPlaceholder(f.name, f.region, 500, 500, 'local', `실제 사진 촬영 예정 (${i + 1}/${thumbSlugs.length})`, icon)
  );

  /* 실제 파일이 이 경로에 준비되면 자동으로 그 사진이 쓰이고, 없으면 위 플레이스홀더로 대체된다
     (main.js의 img onerror 처리). */
  f.image = `image/local/${mainSlug}.png`;
  f.thumbs = thumbSlugs.map((slug) => `image/local/${slug}.png`);
});

HORROR_FOODS.forEach((f) => {
  const icon = PLACEHOLDER_ICONS[f.name] || 'plate';
  const mainSlug = seedFromUrl(f.image).replace(/-main$/, '');
  const extraSlugs = f.extraImages.map(seedFromUrl);

  f.imageFallback = buildPlaceholder(f.name, f.category, 700, 560, 'horror', '실제 사진 촬영 예정', icon);
  f.extraImagesFallback = extraSlugs.map((_, i) =>
    buildPlaceholder(f.name, f.category, 500, 500, 'horror', `실제 사진 촬영 예정 (${i + 1}/${extraSlugs.length})`, icon)
  );

  f.image = `image/horror/${mainSlug}.png`;
  f.extraImages = extraSlugs.map((slug) => `image/horror/${slug}.png`);
});
