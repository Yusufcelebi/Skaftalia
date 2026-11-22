const grid = document.getElementById('novelGrid');
const latestList = document.getElementById('latestList');
const overlay = document.getElementById('readerOverlay');
let activeNovel = null;
let activeChapterIndex = 0;
let readerFontSize = 19;

const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function renderNovels() {
  grid.innerHTML = SITE_CONTENT.novels.map((novel, index) => {
    const latest = novel.chapters.at(-1);
    return `<article class="novel-card ${novel.accent || ''}">
      <div class="novel-cover"><div class="cover-shape"></div><span class="cover-number">${String(index + 1).padStart(2, '0')}</span><span class="cover-title">${escapeHTML(novel.title)}</span><span class="cover-subtitle">${escapeHTML(novel.subtitle || '')}</span><span class="cover-foot">SATIR ARASI · ${escapeHTML(novel.genre || 'ROMAN')}</span></div>
      <div class="novel-info"><div class="novel-meta"><span>${escapeHTML(novel.genre || 'Roman')}</span><span class="status">${escapeHTML(novel.status || 'Devam ediyor')}</span></div><h3>${escapeHTML(novel.title)}</h3><p>${escapeHTML(novel.description || '')}</p><div class="novel-footer"><span>${novel.chapters.length} ${novel.chapters.length === 1 ? 'parça' : 'parça'}</span>${latest ? `<button class="open-novel" data-novel="${escapeHTML(novel.id)}">Okumaya başla ↗</button>` : `<span class="coming-soon">Yakında</span>`}</div></div>
    </article>`;
  }).join('');
  grid.querySelectorAll('.open-novel').forEach(button => button.addEventListener('click', () => openNovel(button.dataset.novel, 0)));
}
function renderLatest() {
  const all = SITE_CONTENT.novels.flatMap(novel => novel.chapters.map((chapter, index) => ({novel, chapter, index}))).reverse().slice(0, 5);
  if (!all.length) { latestList.innerHTML = '<p class="empty-latest">Henüz bir parça eklenmedi.</p>'; return; }
  latestList.innerHTML = all.map(item => `<button class="latest-item" data-novel="${escapeHTML(item.novel.id)}" data-chapter="${item.index}"><span class="latest-index">${String(item.index + 1).padStart(2, '0')}</span><span class="latest-main"><span class="latest-novel">${escapeHTML(item.novel.title)}</span><strong>${escapeHTML(item.chapter.title)}</strong></span><span class="latest-date">${escapeHTML(item.chapter.date || '')}</span><span class="latest-arrow">↗</span></button>`).join('');
  latestList.querySelectorAll('.latest-item').forEach(button => button.addEventListener('click', () => openNovel(button.dataset.novel, Number(button.dataset.chapter))));
}
function openNovel(novelId, chapterIndex) {
  activeNovel = SITE_CONTENT.novels.find(n => n.id === novelId);
  if (!activeNovel || !activeNovel.chapters.length) return;
  activeChapterIndex = Math.max(0, Math.min(chapterIndex, activeNovel.chapters.length - 1));
  renderReader();
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('reader-open');
}
function renderReader() {
  const chapter = activeNovel.chapters[activeChapterIndex];
  document.getElementById('readerBookLabel').textContent = activeNovel.title;
  document.getElementById('readerChapterNumber').textContent = `BÖLÜM ${String(activeChapterIndex + 1).padStart(2, '0')}`;
  document.getElementById('readerTitle').textContent = chapter.title;
  document.getElementById('readerMeta').textContent = chapter.date || '';
  document.getElementById('readerText').innerHTML = chapter.content.map(paragraph => `<p>${escapeHTML(paragraph)}</p>`).join('');
  document.getElementById('readerText').style.fontSize = `${readerFontSize}px`;
  document.getElementById('previousChapter').disabled = activeChapterIndex === 0;
  document.getElementById('nextChapter').disabled = activeChapterIndex === activeNovel.chapters.length - 1;
}
function closeReader() {
  overlay.classList.remove('is-open'); overlay.setAttribute('aria-hidden', 'true'); document.body.classList.remove('reader-open');
}
document.getElementById('closeReader').addEventListener('click', closeReader);
document.getElementById('previousChapter').addEventListener('click', () => { if (activeChapterIndex > 0) { activeChapterIndex--; renderReader(); } });
document.getElementById('nextChapter').addEventListener('click', () => { if (activeChapterIndex < activeNovel.chapters.length - 1) { activeChapterIndex++; renderReader(); } });
document.getElementById('fontMinus').addEventListener('click', () => { readerFontSize = Math.max(15, readerFontSize - 1); renderReader(); });
document.getElementById('fontPlus').addEventListener('click', () => { readerFontSize = Math.min(27, readerFontSize + 1); renderReader(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && overlay.classList.contains('is-open')) closeReader(); });
const menuButton = document.getElementById('menuButton');
menuButton.addEventListener('click', () => { document.querySelector('.topbar nav').classList.toggle('mobile-open'); });
document.querySelectorAll('.topbar nav a').forEach(link => link.addEventListener('click', () => document.querySelector('.topbar nav').classList.remove('mobile-open')));
document.getElementById('year').textContent = new Date().getFullYear();
renderNovels(); renderLatest();
