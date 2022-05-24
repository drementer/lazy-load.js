/**
 * Sayfa yüklenme hızını artırmak için
 * görsel içeriklerini ekrana yaklaşınca yükler.
 *
 * @param {Array} elemanlar lazy_load elemanlarının bulunduğu dizi
 * @param {function} io IntersectionObserver Api
 * @param {object} ayarlar io ayarları
 * @param {elemanlar[i]} eleman io'ya gönderilecek eleman
 */
const elemanlar = document.querySelectorAll("[lazy-load]");

elemanlar.forEach((eleman) => {
	const ayarlar = {
		root: null,
		threshold: 1,
		rootMargin: "300px 0px",
	};

	/**
	 * IntersectionObserver Api fonksiyonu
	 *
	 * @param {string} medya_src eleman'ın lazy-load attr'si
	 */
	const io = new IntersectionObserver((entries, observer) => {
		// Eleman her ekrana girdiğinde
		entries.forEach((entry) => {
			// Ekrandan değilse bir şey yapma
			if (!entry.isIntersecting) {
				return;
			}

			// Atamalar
			const eleman = entry.target,
				medya_src = eleman.getAttribute("lazy-load");

			// Ana işlev
			eleman.classList.add("yuklendi");
			eleman.setAttribute("src", medya_src);

			// İlk entry'den sonra observer'ı kapatıyorum
			observer.disconnect();
		});
	}, ayarlar);

	// IntersectionObserver Eleman için çalıştırılıypr
	io.observe(eleman);
});
