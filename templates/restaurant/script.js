// 모바일 네비게이션 토글
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    navToggle.setAttribute('aria-label', nav.style.display === 'flex' ? '메뉴 닫기' : '메뉴 열기');
  });
}
