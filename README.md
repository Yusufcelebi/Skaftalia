# Satır Arası — Roman / Parça parça yazı sitesi

Bu proje statik bir web sitesidir. GitHub Pages veya Cloudflare Pages ile ücretsiz yayımlanabilir.

## Yazı ekleme
1. `content.js` dosyasını aç.
2. `SITE_CONTENT` içindeki `novels` dizisinde romanını bul veya yeni roman nesnesi ekle.
3. Romanın `chapters` dizisine yeni bölüm ekle.
4. Bölümün `content` alanında her paragraf ayrı bir tırnaklı dizi elemanı olsun.

Örnek:
```js
{
  id: "ikinci-bolum",
  title: "İkinci Bölüm",
  date: "24 Kasım 2026",
  excerpt: "Bölümden kısa bir alıntı...",
  content: [
    "Birinci paragraf burada.",
    "İkinci paragraf burada."
  ]
}
```

## GitHub'a yükleme
- GitHub'da yeni bir repository oluştur.
- Bu klasördeki tüm dosyaları repository'ye yükle (index.html, styles.css, script.js, content.js).
- Repository'nin ana dalında `index.html` kökte olmalı.

## Cloudflare Pages
- Cloudflare hesabında **Workers & Pages → Create → Pages → Connect to Git**.
- GitHub repository'ni seç.
- Framework preset: **None**
- Build command: boş bırak.
- Build output directory: `/` (veya proje kökü; Cloudflare arayüzünün istediği biçime göre `.`)
- Deploy et. Sonrasında istersen kendi domainini Pages projesine bağlayabilirsin.

## Önemli
- Bu site backend kullanmaz, yazılar `content.js` içindedir.
- Her yazı güncellemesinde dosyayı değiştirip GitHub'a commit/push edince Cloudflare otomatik deploy eder.
- İçerik metinleri HTML olarak değil, JavaScript stringleri olarak eklenir; okuyucu ekranında otomatik biçimde güvenli metin olarak gösterilir.
