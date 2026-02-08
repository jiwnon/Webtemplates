const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const cartCount = document.querySelector('.cart-count');
const cartButtons = document.querySelectorAll('.btn-cart');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    navToggle.setAttribute('aria-label', nav.style.display === 'flex' ? '메뉴 닫기' : '메뉴 열기');
  });
}

// 장바구니 개수 표시 (예시: 클릭 시 +1, 실제로는 API/상태 연동)
if (cartCount && cartButtons.length) {
  let count = 0;
  cartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      count += 1;
      cartCount.textContent = count;
    });
  });
}
