(function () {
  'use strict';

  document.body.classList.add('loaded');

  // 모바일 메뉴
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
      menuToggle.setAttribute('aria-label', mobileMenu.classList.contains('hidden') ? '메뉴 열기' : '메뉴 닫기');
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 스크롤 시 fade-in
  var fadeEls = document.querySelectorAll('.fade-in');
  function checkFade() {
    var top = window.scrollY;
    var bottom = top + window.innerHeight;
    fadeEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var elTop = rect.top + top;
      if (elTop < bottom - 80) el.classList.add('visible');
    });
  }
  window.addEventListener('scroll', checkFade);
  window.addEventListener('load', checkFade);

  // 갤러리 라이트박스
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');
  document.querySelectorAll('.gallery-item').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var href = a.getAttribute('href');
      var alt = (a.querySelector('img') || {}).alt || '';
      if (href && lightbox && lightboxImg) {
        lightboxImg.src = href;
        lightboxImg.alt = alt;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      document.body.style.overflow = '';
    }
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // 문의 폼 (구조만, 전송은 나중에 연동)
  var contactForm = document.getElementById('contact-form');
  var contactSuccess = document.getElementById('contact-success');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (contactSuccess) {
        contactSuccess.classList.remove('hidden');
        contactForm.reset();
      }
    });
  }
})();
