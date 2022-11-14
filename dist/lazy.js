(()=>{
/*!
 * Loads visual content when it approaches
 * the visible area of ​​the screen to
 * increase page loading speed.
 *
 * @author drementer
 * @version 1.0.4
 * @license MIT
 * @link https://github.com/drementer/lazy-load.js
 */
const t=document.querySelectorAll("[lazy]");window.onload=void t.forEach((t=>{(t=>{new IntersectionObserver(((t,e)=>{t.forEach((t=>{if(!t.isIntersecting)return;let r=t.target,o=r.getAttribute("lazy");r.classList.add("-loaded"),r.removeAttribute("lazy"),r.setAttribute("src",o),e.disconnect()}))}),{root:null,threshold:1,rootMargin:"300px 0px"}).observe(t)})(t)}))})();