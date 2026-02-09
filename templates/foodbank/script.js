(function () {
  'use strict';

  // 모바일 네비
  var navToggle = document.getElementById('nav-toggle');
  var navMobile = document.getElementById('nav-mobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      navMobile.classList.toggle('hidden');
    });
  }

  // 실시간 통계 카운트업
  var statEls = document.querySelectorAll('[data-count]');
  function animateValue(el, end, duration) {
    var start = 0;
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var current = Math.floor(progress * (end - start) + start);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = end;
    }
    requestAnimationFrame(step);
  }
  function runCountUp() {
    var hero = document.querySelector('.bg-gradient-to-br.from-primary-600');
    if (!hero) return;
    var rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    statEls.forEach(function (el) {
      var end = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(end)) return;
      if (el.getAttribute('data-done') === '1') return;
      el.setAttribute('data-done', '1');
      animateValue(el, end, 1500);
    });
  }
  window.addEventListener('scroll', runCountUp);
  window.addEventListener('load', runCountUp);

  // 기부 탭
  document.querySelectorAll('.donate-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tab = btn.getAttribute('data-tab');
      document.querySelectorAll('.donate-tab').forEach(function (b) {
        b.classList.remove('text-primary-600', 'border-primary-600');
        b.classList.add('text-gray-500');
      });
      btn.classList.add('text-primary-600', 'border-b-2', 'border-primary-600');
      btn.classList.remove('text-gray-500');
      document.querySelectorAll('.donate-panel').forEach(function (p) {
        p.classList.add('hidden');
      });
      var panel = document.getElementById('tab-' + tab);
      if (panel) panel.classList.remove('hidden');
    });
  });

  // 모달: 기부 신청
  function openModal(id) {
    var m = document.getElementById('modal-' + id);
    if (m) {
      m.classList.remove('hidden');
      m.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
  }
  function closeModals() {
    document.querySelectorAll('[id^="modal-"]').forEach(function (m) {
      m.classList.add('hidden');
      m.classList.remove('flex');
    });
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-modal'));
    });
  });
  document.querySelectorAll('.modal-close').forEach(function (btn) {
    btn.addEventListener('click', closeModals);
  });
  document.querySelectorAll('[id^="modal-"]').forEach(function (m) {
    m.addEventListener('click', function (e) {
      if (e.target === m) closeModals();
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModals();
  });

  // 기부 폼 제출
  var formDonate = document.getElementById('form-donate');
  if (formDonate) {
    formDonate.addEventListener('submit', function (e) {
      e.preventDefault();
      closeModals();
      alert('기부 신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    });
  }

  // 후원 기업 로고 클릭 → 팝업
  document.querySelectorAll('.sponsor-logo').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-name');
      var detail = btn.getAttribute('data-detail');
      var m = document.getElementById('modal-sponsor');
      if (m && name) {
        var nameEl = document.getElementById('sponsor-name');
        var detailEl = document.getElementById('sponsor-detail');
        if (nameEl) nameEl.textContent = name;
        if (detailEl) detailEl.textContent = detail || '';
        m.classList.remove('hidden');
        m.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // 갤러리 필터
  document.querySelectorAll('.gallery-filter').forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.gallery-filter').forEach(function (b) {
        b.classList.remove('bg-primary-600', 'text-white');
        b.classList.add('bg-gray-200', 'text-gray-600');
      });
      btn.classList.add('bg-primary-600', 'text-white');
      btn.classList.remove('bg-gray-200', 'text-gray-600');
      var filter = i === 0 ? '' : btn.textContent.trim();
      document.querySelectorAll('.gallery-item').forEach(function (item) {
        var cat = item.getAttribute('data-cat');
        if (!filter || cat === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Chart.js: 월별 기부 추이
  var ctx = document.getElementById('chart-monthly');
  if (ctx && typeof Chart !== 'undefined') {
    new Chart(ctx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
        datasets: [{
          label: '기부량 (톤)',
          data: [1.2, 1.5, 2, 2.2, 2.5, 2.8],
          backgroundColor: 'rgba(34, 197, 94, 0.6)',
          borderColor: 'rgb(34, 197, 94)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
})();
