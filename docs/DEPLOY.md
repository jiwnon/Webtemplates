# Cloudflare Pages 자동 배포 설정

`main` 브랜치에 푸시할 때마다 Cloudflare Pages에 자동 배포됩니다.

## 한 번만 설정 (GitHub Secrets)

1. **Cloudflare API 토큰**
   - [Cloudflare 대시보드](https://dash.cloudflare.com/profile/api-tokens) → API 토큰 생성
   - "Edit Cloudflare Workers" 템플릿 또는 사용자 정의: **계정** + **Cloudflare Pages 편집** 권한
   - 생성된 토큰 값을 복사

2. **GitHub 저장소에 Secret 추가**
   - 저장소 **Settings** → **Secrets and variables** → **Actions**
   - **New repository secret** 두 개 추가:
     - `CLOUDFLARE_API_TOKEN`: 위에서 복사한 API 토큰
     - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare 대시보드 오른쪽 아래 **계정 ID** (영문+숫자)

저장 후 `main`에 push 하면 자동으로 배포됩니다.

## 배포 실패 시 (exit code 1)

1. **Secrets 확인**: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` 가 모두 등록되어 있는지 확인
2. **토큰 권한**: API 토큰에 **Cloudflare Pages - Edit** 권한이 포함되어 있는지 확인
3. **프로젝트 존재**: Cloudflare 대시보드 **Workers & Pages** 에서 **webtemplates** 프로젝트가 있는지 확인. 없으면 로컬에서 한 번 `npx wrangler pages project create webtemplates --production-branch=main` 실행 후 다시 푸시
4. **Actions 로그**: GitHub **Actions** 탭에서 실패한 Run을 열어 빨간 에러 메시지 확인 (예: "No account id found", "Project not found", "Unauthorized")
