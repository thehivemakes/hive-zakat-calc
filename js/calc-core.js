/* calc-core.js — shared utilities for all calculator pages */
const CalcCore = {
  loadParams() {
    const params = new URLSearchParams(window.location.search);
    params.forEach((val, key) => {
      const el = document.getElementById(key);
      if (!el) return;
      if (el.type === 'radio') {
        const radio = document.querySelector(`input[name="${key}"][value="${val}"]`);
        if (radio) radio.checked = true;
      } else { el.value = val; }
    });
  },
  saveParams(fields) {
    const params = new URLSearchParams();
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.value) params.set(id, el.value);
    });
    history.replaceState(null, '', window.location.pathname + '?' + params.toString());
  },
  showResult(id) {
    const el = document.getElementById(id || 'result');
    if (el) el.classList.add('visible');
  },
  fmt(n, d=2) {
    if (isNaN(n) || n === null) return '\u2014';
    return Number(n).toLocaleString('en-US', {minimumFractionDigits: d, maximumFractionDigits: d});
  },
  fmtInt(n) { return isNaN(n) ? '\u2014' : Math.round(n).toLocaleString('en-US'); },
  set(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; },
  get(id) { const el = document.getElementById(id); return el ? parseFloat(el.value) : NaN; },
  getSelect(id) { const el = document.getElementById(id); return el ? el.value : ''; }
};
document.addEventListener('DOMContentLoaded', () => CalcCore.loadParams());
