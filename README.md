# 웹서비스 주문제작 템플릿

**🌐 미리보기:** [https://webtemplates.pages.dev](https://webtemplates.pages.dev)

> GitHub 저장소 **오른쪽 About** 옆 ⚙️ 클릭 → **Website**에 위 주소 넣으면 메인에 링크가 뜹니다.

다양한 업종의 웹사이트 주문제작을 위한 템플릿 모음입니다.  
각 템플릿은 해당 업종에 맞는 레이아웃, 톤앤매너, 필수 섹션을 포함하고 있어 바로 커스터마이징하여 사용할 수 있습니다.

## 📁 템플릿 목록

| 업종 | 폴더 | 설명 |
|------|------|------|
| 레스토랑/카페 | `templates/restaurant` | 메뉴, 영업시간, 예약/연락처 |
| 의료/클리닉 | `templates/medical` | 진료과, 예약, 오시는 길 |
| 법률사무소 | `templates/law` | 전문분야, 변호사 소개, 상담 문의 |
| 부동산 | `templates/real-estate` | 매물 갤러리, 지역, 문의 |
| 학원 | `templates/academy` | 강사 프로필, 시간표·수강료, 수강 신청 폼, 학부모 후기, 네이버 예약·카카오톡 |
| 지역아동센터 | `templates/community-center` | 센터 소개, 프로그램, 갤러리, 후원, 문의 (Tailwind) |
| 푸드뱅크 | `templates/foodbank` | 기부·투명성·후원기업·갤러리·참여 (Tailwind, Chart.js) |
| 이커머스/소매 | `templates/ecommerce` | 상품 목록, 장바구니 연동 구조 |
| 에이전시/포트폴리오 | `templates/agency` | 워크 소개, 서비스, 연락처 |

## 자동 배포 (Cloudflare Pages)

`main` 브랜치에 push 하면 GitHub Actions가 Cloudflare Pages에 자동 배포합니다.  
**최초 1회**: GitHub 저장소 **Settings → Secrets and variables → Actions** 에서 `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` 를 추가해 주세요. 자세한 방법은 [docs/DEPLOY.md](docs/DEPLOY.md) 참고.

## 사용 방법

1. 원하는 업종의 `templates/[업종명]` 폴더를 복사합니다.
2. `index.html`, `styles.css` 등에서 텍스트·이미지·색상을 업체 정보에 맞게 수정합니다.
3. 각 템플릿 폴더의 `README.md`에 커스터마이징 가이드가 있습니다.

## 기술 스택

- **HTML5** 시맨틱 마크업
- **CSS3** (Flexbox/Grid, 반응형)
- **Vanilla JavaScript** (필요 시)
- **Cloudflare D1** (선택) 문의/예약 저장용 DB · [docs/DATABASE.md](docs/DATABASE.md) 참고

추가 기능(폼 전송, CMS 연동 등)은 프로젝트별로 확장 가능합니다.

## 라이선스

이 템플릿들은 자유롭게 수정·재배포하여 사용할 수 있습니다.
