export default (item, callback, settings) => {
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      callback(entry.target);
      observer.unobserve(entry.target);
    });
  };

  const observer = new IntersectionObserver(handleIntersection, settings);

  observer.observe(item);
};
