/*!
 * lazy-load.js
 * @description Sayfa yüklenme hızını artırmak için görsel içeriklerini ekranın görünür alanına yaklaşınca yükler.
 *
 * @author drementer
 * @version 1.0.3
 * @license MIT
 * @link https://github.com/drementer/lazy-load.js Repository
 */

const lazyLoadItem = document.querySelectorAll("[lazy-load]");

lazyLoadItem.forEach((item) => {
	const settings = {
		root: null,
		threshold: 1,
		rootMargin: "300px 0px",
	};

	const io = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				return;
			}

			const element = entry.target,
				mediaLink = element.getAttribute("lazy-load");

			element.classList.add("yuklendi");
			element.setAttribute("src", mediaLink);

			observer.disconnect();
		});
	}, settings);

	io.observe(item);
});
