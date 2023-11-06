const observer = (item, callback, settings) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      callback(entry.target);
      observer.unobserve(entry.target);
    });
  }, settings);

  observer.observe(item);
};

export default observer;
