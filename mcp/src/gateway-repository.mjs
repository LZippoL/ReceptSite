export class GatewayRepository {
  constructor(url, token, fetcher = fetch) {
    this.url = url;
    this.token = token;
    this.fetcher = fetcher;
  }
  async request(action, kind, args = {}) {
    let response;
    try {
      response = await this.fetcher(this.url, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` },
        body: JSON.stringify({ action, kind, ...args }), signal: AbortSignal.timeout(30000)
      });
    } catch { throw new Error('Supabase content gateway is unavailable. Check connectivity.'); }
    let payload;
    try { payload = await response.json(); } catch { throw new Error('Invalid content gateway response'); }
    if (!response.ok) {
      if (response.status === 401) throw new Error('Content gateway rejected the agent token');
      throw new Error(payload.error || `Content gateway failed (${response.status})`);
    }
    return payload.data;
  }
  list(kind, options) { return this.request('list', kind, { options }); }
  get(kind, id) { return this.request('get', kind, { id }); }
  create(kind, input) { return this.request('create', kind, { input }); }
  update(kind, id, input) { return this.request('update', kind, { id, input }); }
  delete(kind, id, confirmTitle) { return this.request('delete', kind, { id, confirmTitle }); }
}
