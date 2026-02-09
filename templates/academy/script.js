(function () {
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-label', nav.classList.contains('is-open') ? '메뉴 닫기' : '메뉴 열기');
    });
  }

  var form = document.getElementById('apply-form');
  var successEl = document.getElementById('apply-success');
  if (form && successEl) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var phone = fd.get('phone') || '';
      var data = {
        name: fd.get('parentName') || '',
        email: phone ? phone.replace(/\D/g, '') + '@academy' : 'academy@form',
        phone: phone,
        message: [
          '학생: ' + (fd.get('studentName') || ''),
          '학년: ' + (fd.get('grade') || ''),
          '희망과목: ' + (fd.get('course') || ''),
          fd.get('message') || ''
        ].filter(Boolean).join('\n'),
        template: 'academy'
      };

      fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            successEl.hidden = false;
            successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            return res.json().then(function (body) {
              alert(body.error || '접수에 실패했습니다. 전화로 문의해 주세요.');
            });
          }
        })
        .catch(function () {
          alert('접수에 실패했습니다. 전화(02-1234-5678)로 문의해 주세요.');
        });
    });
  }
})();
