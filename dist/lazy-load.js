/*!
 * lazy-load.js
 * @description Sayfa yüklenme hızını artırmak için görsel içeriklerini ekranın görünür alanına yaklaşınca yükler
 * 
 * @author drementer
 * @version 1.0.3
 * @license MIT
 * @see {@link https://github.com/drementer/lazy-load.js}
 */
document.querySelectorAll("[lazy-load]").forEach((t => { new IntersectionObserver(((t, e) => { t.forEach((t => { if (!t.isIntersecting) return; const r = t.target, o = r.getAttribute("lazy-load"); r.classList.add("yuklendi"), r.setAttribute("src", o), e.disconnect() })) }), { root: null, threshold: 1, rootMargin: "300px 0px" }).observe(t) }));