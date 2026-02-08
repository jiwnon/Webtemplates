/**
 * 문의 저장/조회 API (Cloudflare Pages Function + D1)
 * GET  /api/contacts → 목록 조회
 * POST /api/contacts → 문의 저장 (JSON: name, email, phone?, message?, template?)
 */

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}

export async function onRequestGet(context) {
  const { env } = context;
  if (!env.DB) return json({ error: 'DB not configured' }, 503);

  try {
    const { results } = await env.DB.prepare(
      'SELECT id, name, email, phone, message, template, created_at FROM contacts ORDER BY created_at DESC LIMIT 100'
    ).all();
    return json({ data: results });
  } catch (e) {
    return json({ error: e.message }, 500);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env.DB) return json({ error: 'DB not configured' }, 503);

  if (request.headers.get('Content-Type')?.includes('application/json') === false) {
    return json({ error: 'Content-Type: application/json required' }, 400);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  if (!name || !email) return json({ error: 'name, email required' }, 400);

  const phone = body.phone?.trim() ?? null;
  const message = body.message?.trim() ?? null;
  const template = body.template?.trim() ?? null;

  try {
    const stmt = env.DB.prepare(
      'INSERT INTO contacts (name, email, phone, message, template) VALUES (?, ?, ?, ?, ?)'
    ).bind(name, email, phone, message, template);
    const { meta } = await stmt.run();
    return json({ ok: true, id: meta.last_row_id }, 201);
  } catch (e) {
    return json({ error: e.message }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: cors });
}
