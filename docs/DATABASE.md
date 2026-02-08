# 데이터베이스 환경 (Cloudflare D1)

이 프로젝트는 **Cloudflare D1**(서버리스 SQLite)을 사용할 수 있습니다. 문의/예약 등을 저장하는 API가 포함되어 있습니다.

## 구성

| 항목 | 설명 |
|------|------|
| **DB** | Cloudflare D1 (SQLite 호환) |
| **스키마** | `database/schema.sql` |
| **API** | `GET/POST /api/contacts` (Pages Function) |

## 1. D1 데이터베이스 생성

```bash
cd e:\Github\Webtemplates
npx wrangler d1 create webtemplates-db
```

출력된 **database_id** 를 복사합니다.

## 2. 스키마 적용 (최초 1회)

```bash
# database_id 를 아래에 넣고 실행
npx wrangler d1 execute webtemplates-db --remote --file=./database/schema.sql
```

`wrangler.toml` 에서 `database_id` 가 비어 있으면, `[[d1_databases]]` 의 `database_id = "복사한_id"` 로 넣어 두면 로컬에서도 사용할 수 있습니다.

## 3. Pages 프로젝트에 D1 연결

Git으로 배포한 Pages에는 **대시보드**에서 D1을 연결해야 합니다.

1. [Cloudflare 대시보드](https://dash.cloudflare.com) → **Workers & Pages** → **webtemplates** (Pages 프로젝트)
2. **Settings** → **Functions** → **Bindings**
3. **Add binding** → **D1 database**
   - **Variable name**: `DB`
   - **D1 database**: `webtemplates-db` 선택
4. 저장 후 다음 배포부터 `/api/contacts` 에서 DB가 사용됩니다.

## 4. API 사용법

### 문의 저장 (POST)

```bash
curl -X POST https://your-site.pages.dev/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"홍길동","email":"hong@example.com","message":"문의합니다.","template":"agency"}'
```

### 문의 목록 조회 (GET)

```bash
curl https://your-site.pages.dev/api/contacts
```

프론트엔드에서는 `fetch('/api/contacts', { method: 'POST', body: JSON.stringify({...}) })` 로 호출하면 됩니다.

## 5. 로컬에서 테스트

D1과 Functions를 함께 쓰려면 Pages 로컬 서버를 사용합니다.

1. `wrangler.toml` 에 `database_id` 입력
2. 로컬 DB 생성 및 스키마 적용:
   ```bash
   npx wrangler d1 execute webtemplates-db --local --file=./database/schema.sql
   ```
3. Pages 로컬 실행:
   ```bash
   npx wrangler pages dev . --d1=DB=webtemplates-db
   ```
4. 브라우저에서 `http://localhost:8788/api/contacts` 등으로 확인

## 참고

- [D1 문서](https://developers.cloudflare.com/d1/)
- [Pages Functions 바인딩](https://developers.cloudflare.com/pages/functions/bindings/)
