(function () {
  'use strict';

  /**
   * In-memory data model. Each quote: { text: string, author?: string, category: string }
   * Loaded from localStorage if available, else seeded with defaults.
   */
  const STORAGE_KEY = 'dynamicQuoteGenerator.v1';

  /** @type {{ quotes: Array<{text: string, author?: string, category: string}> }} */
  const state = {
    quotes: []
  };

  const $ = (sel) => document.querySelector(sel);

  function readFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.quotes)) return null;
      return parsed;
    } catch (_) {
      return null;
    }
  }

  function writeToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ quotes: state.quotes }));
    } catch (_) {
      // storage can fail in private modes; ignore gracefully
    }
  }

  function seedDefaultsIfEmpty() {
    if (state.quotes.length > 0) return;
    state.quotes = [
      { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', category: 'Inspiration' },
      { text: 'If you can dream it, you can do it.', author: 'Walt Disney', category: 'Inspiration' },
      { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman', category: 'Productivity' },
      { text: 'Well begun is half done.', author: 'Aristotle', category: 'Productivity' },
      { text: 'Life is what happens when you’re busy making other plans.', author: 'John Lennon', category: 'Life' },
      { text: 'Turn your wounds into wisdom.', author: 'Oprah Winfrey', category: 'Life' }
    ];
  }

  function getCategories() {
    const categories = new Set(state.quotes.map(q => q.category.trim()).filter(Boolean));
    return Array.from(categories).sort((a, b) => a.localeCompare(b));
  }

  function renderCategories() {
    const select = $('#category-select');
    if (!select) return;
    const categories = getCategories();
    select.innerHTML = categories.map(cat => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join('');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function chooseRandomQuote(quotes) {
    if (!quotes || quotes.length === 0) return null;
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }

  // Step 2 requirement: showRandomQuote
  function showRandomQuote() {
    const category = $('#category-select')?.value?.trim();
    const authorFilter = $('#author-filter')?.value?.trim().toLowerCase();

    let pool = state.quotes;
    if (category) {
      pool = pool.filter(q => q.category.toLowerCase() === category.toLowerCase());
    }
    if (authorFilter) {
      pool = pool.filter(q => (q.author || '').toLowerCase().includes(authorFilter));
    }

    const picked = chooseRandomQuote(pool);
    const quoteTextEl = $('#quote-text');
    const quoteAuthorEl = $('#quote-author');
    if (!picked) {
      if (quoteTextEl) quoteTextEl.textContent = 'No quotes found. Try another category or add one!';
      if (quoteAuthorEl) quoteAuthorEl.textContent = '';
      return;
    }

    if (quoteTextEl) quoteTextEl.textContent = picked.text;
    if (quoteAuthorEl) quoteAuthorEl.textContent = picked.author ? `— ${picked.author}` : '';
  }

  // Step 2 requirement: createAddQuoteForm (injects simple form UI as provided in prompt)
  function createAddQuoteForm(containerSelector = '#messages') {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div style="display:grid; gap:8px; margin-top:8px;">
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button id="newQuoteAddBtn" type="button">Add Quote</button>
      </div>
    `;
    container.appendChild(wrapper);

    const addBtn = wrapper.querySelector('#newQuoteAddBtn');
    addBtn?.addEventListener('click', addQuote);
  }

  // Step 3 requirement: addQuote - adds a quote dynamically
  function addQuote() {
    // Try the dedicated fields first (from prompt's simple UI)
    const textInput = document.getElementById('newQuoteText');
    const catInput = document.getElementById('newQuoteCategory');

    // Fallback to the richer form fields in the main layout if present
    const fallbackText = document.getElementById('new-quote');
    const fallbackAuthor = document.getElementById('new-author');
    const fallbackCategory = document.getElementById('new-category');

    const text = (textInput?.value || fallbackText?.value || '').trim();
    const category = (catInput?.value || fallbackCategory?.value || '').trim();
    const author = (fallbackAuthor?.value || '').trim();

    const msgEl = $('#messages');

    if (!text || !category) {
      if (msgEl) showMessage('Please provide both quote text and category.', 'warn');
      return;
    }

    state.quotes.push({ text, author: author || undefined, category });
    writeToStorage();
    renderCategories();

    // If newly added category is selected, refresh quote view; else keep as-is
    const select = $('#category-select');
    if (select && select.value && select.value.toLowerCase() === category.toLowerCase()) {
      showRandomQuote();
    }

    if (msgEl) showMessage('Quote added!', 'ok');

    // Clear inputs
    if (textInput) textInput.value = '';
    if (catInput) catInput.value = '';
    if (fallbackText) fallbackText.value = '';
    if (fallbackAuthor) fallbackAuthor.value = '';
    if (fallbackCategory) fallbackCategory.value = '';
  }

  function handleCopy() {
    const text = $('#quote-text')?.textContent || '';
    if (!text) return;
    navigator.clipboard?.writeText(text)
      .then(() => showMessage('Quote copied to clipboard.', 'ok'))
      .catch(() => showMessage('Unable to copy right now.', 'warn'));
  }

  function bindEvents() {
    $('#new-quote-btn')?.addEventListener('click', showRandomQuote);
    $('#copy-btn')?.addEventListener('click', handleCopy);

    $('#add-category-btn')?.addEventListener('click', () => {
      const input = $('#new-category');
      const val = input?.value?.trim();
      const msgEl = $('#messages');
      if (!val) {
        if (msgEl) showMessage('Please provide a category name.', 'warn');
        return;
      }
      // add a placeholder entry so the category appears even before any quote
      if (!state.quotes.some(q => q.category.toLowerCase() === val.toLowerCase())) {
        state.quotes.push({ text: `Category created: ${val}`, category: val });
        writeToStorage();
        renderCategories();
        if (msgEl) showMessage(`Category "${val}" added.`, 'ok');
      } else {
        if (msgEl) showMessage(`Category "${val}" already exists.`, 'warn');
      }
      if (input) input.value = '';
    });

    $('#add-quote-btn')?.addEventListener('click', addQuote);

    // Re-render quotes when filters change to keep UX snappy
    $('#category-select')?.addEventListener('change', showRandomQuote);
    $('#author-filter')?.addEventListener('input', () => {
      // do not spam randomization; just refresh selection if exists
      showRandomQuote();
    });
  }

  function showMessage(text, tone = 'muted') {
    const el = $('#messages');
    if (!el) return;
    el.textContent = String(text);
    el.style.color = tone === 'ok'
      ? 'var(--ok)'
      : tone === 'warn'
        ? 'var(--warn)'
        : 'var(--muted)';
  }

  function init() {
    const stored = readFromStorage();
    if (stored) {
      state.quotes = stored.quotes;
    }
    seedDefaultsIfEmpty();
    renderCategories();
    bindEvents();
    createAddQuoteForm(); // inject the simple form per prompt
    // Initial message
    if (state.quotes.length) {
      showMessage('Select a category and press "Show Quote" to begin.', 'muted');
    }
  }

  // Expose globally the required functions if needed
  window.showRandomQuote = showRandomQuote;
  window.createAddQuoteForm = createAddQuoteForm;
  window.addQuote = addQuote;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
