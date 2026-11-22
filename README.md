# Satır Arası — Roman yayın sitesi

Bu sürümde bölümler Markdown (`.md`) dosyalarından otomatik okunur. Her yeni bölüm için JavaScript düzenlemek gerekmez.


## Yeni bölüm eklemek
1. `novels/skaftalya/` klasörüne yeni bir Markdown dosyası oluştur. Örneğin `bolum-03.md`.
2. Dosyanın başına aşağıdaki metadata kısmını yaz:

```md
---
title: Üçüncü Parça
date: 25 Kasım 2026
excerpt: Bu bölümden kısa bir alıntı.
---
```

3. Metadata'dan sonra romanını normal Markdown olarak yaz. Paragraflar arasında boş satır bırak.
4. Kaydet, GitHub'a push et. Netlify build sırasında `build.js` dosyaları tarar ve bölümleri numaralarına göre sıralar.

## Dosya adı kuralı
`bolum-01.md`, `bolum-02.md`, `bolum-03.md` gibi olmalı. Numara sıralaması otomatik yapılır. Başlık dosya içindeki `title` alanından gelir.

## Yeni roman eklemek
`novels/` altında roman için yeni klasör oluştur, içine `roman.json` metadata dosyası koy ve `bolum-01.md` ile başlayarak Markdown bölümlerini ekle. Roman metadata dosyasında `id`, `title`, `subtitle`, `genre`, `status`, `description` ve `accent` alanları bulunabilir.

## Netlify ayarı
`netlify.toml` dosyası build komutunu ve yayın klasörünü tanımlar. Netlify'da Build command `node build.js`, Publish directory `.` olarak kullanılmalıdır.
