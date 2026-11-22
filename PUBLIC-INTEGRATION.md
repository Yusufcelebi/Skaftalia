# Public site connection (for the existing Skaftalia site)

This admin package is additive. It needs Supabase credentials + database first. To make published chapters appear on the public home page, add the following integration to the existing `script.js` **inside the same file**, at its very end (after `renderNovels(); renderLatest();`). The main site currently uses `SITE_CONTENT` and the two render functions, so this block reuses them.

1. Copy `supabase-config.js` next to the main site's `index.html` (adjust the path if you place it elsewhere).
2. Add this block at the end of `script.js`:

```js
(async function loadCloudPublishedPosts(){
  const cfg = window.SKAFTALIA_SUPABASE;
  if (!cfg || !cfg.url || cfg.url.includes('YOUR_') || !cfg.anonKey || cfg.anonKey.includes('YOUR_')) return;
  try {
    const response = await fetch(`${cfg.url}/rest/v1/skaftalia_posts?select=*&status=eq.published&order=novel_id.asc,chapter_number.asc`, {
      headers: { apikey: cfg.anonKey, Authorization: `Bearer ${cfg.anonKey}` }
    });
    if (!response.ok) throw new Error(`Supabase ${response.status}`);
    const posts = await response.json();
    for (const post of posts) {
      let novel = SITE_CONTENT.novels.find(n => n.id === post.novel_id);
      if (!novel) {
        novel = { id: post.novel_id, title: post.novel_title, subtitle: post.novel_subtitle || '', genre: post.genre || 'Roman', status: 'Devam ediyor', description: post.novel_description || '', accent: post.accent || 'amber', chapters: [] };
        SITE_CONTENT.novels.push(novel);
      }
      const chapter = { id: `cloud-${post.id}`, title: post.chapter_title, date: post.published_date || '', excerpt: post.excerpt || '', content: String(post.body || '').split(/\\n\\s*\\n/).filter(Boolean) };
      const oldIndex = novel.chapters.findIndex(c => c.id === chapter.id);
      if (oldIndex >= 0) novel.chapters[oldIndex] = chapter; else novel.chapters.push(chapter);
    }
    for (const novel of SITE_CONTENT.novels) novel.chapters.sort((a,b)=>Number(a.chapter_number||0)-Number(b.chapter_number||0));
    renderNovels(); renderLatest();
  } catch (err) { console.warn('Published posts could not be loaded from cloud:', err); }
})();
```

3. In the site's existing `index.html`, add `supabase-config.js` **before** `script.js` (but after `generated-content.js`):

```html
<script src="supabase-config.js"></script>
<script src="generated-content.js"></script>
<script src="script.js"></script>
```

This uses the Supabase anon/public key only. Never use a service-role key in browser code. The database RLS rules in `supabase-schema.sql` make published posts public and keep draft records visible only to their author.
