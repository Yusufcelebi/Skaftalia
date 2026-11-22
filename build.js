const fs = require('fs');
const path = require('path');
const novelsDir = path.join(__dirname, 'novels');

function parseMarkdownChapter(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  let meta = {};
  let body = raw;
  if (raw.startsWith('---\n')) {
    const end = raw.indexOf('\n---\n', 4);
    if (end !== -1) {
      const front = raw.slice(4, end);
      body = raw.slice(end + 5);
      for (const line of front.split('\n')) {
        const m = line.match(/^([\w-]+):\s*(.*)$/);
        if (m) meta[m[1]] = m[2].trim();
      }
    }
  }
  const paragraphs = body.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  const match = path.basename(file).match(/bolum-(\d+)/i);
  const number = match ? Number(match[1]) : 999999;
  return {
    id: path.basename(file, '.md'),
    title: meta.title || `Bölüm ${number}`,
    date: meta.date || '',
    excerpt: meta.excerpt || (paragraphs[0] || '').slice(0, 140),
    content: paragraphs
  };
}

function buildNovel(folder) {
  const dir = path.join(novelsDir, folder);
  const metaPath = path.join(dir, 'roman.json');
  if (!fs.existsSync(metaPath)) return null;
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  const files = fs.readdirSync(dir).filter(f => /^bolum-\d+\.md$/i.test(f)).sort((a,b) => {
    const na = Number(a.match(/\d+/)[0]), nb = Number(b.match(/\d+/)[0]);
    return na - nb;
  });
  meta.chapters = files.map(f => parseMarkdownChapter(path.join(dir, f)));
  return meta;
}
const novels = fs.readdirSync(novelsDir).filter(name => fs.statSync(path.join(novelsDir, name)).isDirectory()).map(buildNovel).filter(Boolean);
fs.writeFileSync(path.join(__dirname, 'generated-content.js'), `const SITE_CONTENT = ${JSON.stringify({novels}, null, 2)};\n`);
console.log(`Roman içeriği üretildi: ${novels.length} roman, ${novels.reduce((n,r)=>n+r.chapters.length,0)} bölüm.`);
