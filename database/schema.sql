-- Cloudflare D1 스키마 (문의/예약 등 공통 테이블 예시)
-- 실행: wrangler d1 execute webtemplates-db --remote --file=./database/schema.sql

CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  template TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
