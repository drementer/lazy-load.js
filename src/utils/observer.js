export default (item, callback, settings) => {
  const handleIntersection = (entries, observer) => {
    const handleEntry = (entry) => {
      if (!entry.isIntersecting) return;
      callback(entry.target);
      observer.unobserve(entry.target);
    };
    entries.forEach(handleEntry);
  };

  const observer = new IntersectionObserver(handleIntersection, settings);
  observer.observe(item);
};
