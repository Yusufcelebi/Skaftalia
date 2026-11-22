/*
  YAZILARINI BURADAN EKLE / DÜZENLE.
  Her romanın "chapters" listesine yeni bölüm ekleyebilirsin.
  chapter content alanında her paragrafı ayrı bir dizi elemanı olarak yaz.
*/
const SITE_CONTENT = {
  novels: [
    {
      id: "skaftalya",
      title: "Skaftalya",
      subtitle: "Bir dünyanın içinden parçalar",
      genre: "Bilim kurgu · Dünya kurma",
      status: "Devam ediyor",
      description: "Uzak coğrafyalar, farklı uygarlıklar ve henüz haritası tamamlanmamış bir evren.",
      accent: "amber",
      chapters: [
        {
          id: "ilk-parca",
          title: "İlk Parça",
          date: "23 Kasım 2026",
          excerpt: "Bu romanın ilk satırları burada yer alacak. Bu metni kendi yazınla değiştirebilirsin.",
          content: [
            "Bu, romanının ilk parçası için bir örnek metin. Buraya istediğin kadar paragraf ekleyebilir, örnek cümleleri silebilirsin.",
            "Yeni bir paragraf eklemek için content dizisinin içine tırnak içinde yeni bir metin satırı koy ve önceki satırın sonuna virgül ekle.",
            "Site, romanı ve parçalarını otomatik olarak listeler. Bu örnek bölüm, düzeni test edebilmen için bırakıldı."
          ]
        }
      ]
    },
    {
      id: "yeni-roman",
      title: "Yeni Roman",
      subtitle: "İsimsiz bir çalışma",
      genre: "Roman",
      status: "Taslak",
      description: "Yeni bir hikâye için boş bir başlangıç. Bu alanı kendi romanınla değiştirebilirsin.",
      accent: "blue",
      chapters: []
    }
  ]
};
