(function () {
  'use strict';

  document.body.classList.add('loaded');

  // 모바일 메뉴
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
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
    var bottom = window.scrollY + window.innerHeight;
    fadeEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var elTop = rect.top + window.scrollY;
      if (elTop < bottom - 80) el.classList.add('visible');
    });
  }
  window.addEventListener('scroll', checkFade);
  window.addEventListener('load', checkFade);

  // "신청하기" / "같이해요" → 모달
  var modal = document.getElementById('modal-apply');
  document.querySelectorAll('.btn-apply').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  document.querySelectorAll('.modal-close').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
      }
    });
  });
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
      }
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  });

  // 참여 폼 제출
  var form = document.getElementById('participate-form');
  var formSuccess = document.getElementById('form-success');
  if (form && formSuccess) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      formSuccess.classList.remove('hidden');
      form.reset();
    });
  }
})();
