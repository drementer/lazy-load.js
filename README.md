# Lazy Load

Sayfa yüklenme hızını artırmak için görsel içeriklerini ekrana yaklaşınca yükler

## Menu

-   [Hızlı Başlangıç](#hizli-baslangic)
-   [Kullanım & Örnekler](#kullanim-ornekler)
-   [Geliştirici](#gelistirici)
-   [Lisans](#lisans)

<div id="hizli-baslangic"></div>

## Hızlı Başlangıç

Terminal kullanarak indir

```bash
  git clone https://github.com/drementer/lazy-load.git
```

<div id="kullanim-ornekler"></div>

## Kullanım & örnekler

### Olması gereken
Normalde bir görsel veya video için src attr'si yardımı ile çekilmesi
gereken dosya belirtilir ve kullanıcı sayfaya girdiği anda  o görsel ekranın görünür alanında olmasa bile tarayıcısı src attr'si ile belirtilen dosyayı çekmeye çalışarak vakit kaybeder.
```html
<img src="./img.png"> <!-- Dosyadan -->
<img src="http://unsplash.it/0?random"> <!-- URL ile -->
<video src="./video.mp4"></video> <!-- Video Örneği -->
```

### Ama artık
Bu yöntemi geliştirme vakti geldi.
src attr'sini data-lazy attr'si ile değiştiriyoruz ve görselin ekranın
görünür alanına gelene kadar yüklenmesine engel olup site performansını
artırıyoruz.
```html
<img data-lazy="./img.png"> <!-- Dosyadan -->
<img data-lazy="http://unsplash.it/0?random"> <!-- URL ile -->
<video data-lazy="./video.mp4"></video> <!-- Video Örneği -->
```

<div id="gelistirici"></div>

## Geliştirici

-   [@drementer](https://github.com/drementer)

<div id="lisans"></div>

## Lisans

[MIT](https://choosealicense.com/licenses/mit/)
