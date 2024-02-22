export default (src) => {
  const image = document.createElement('img');
  image.setAttribute('lazy', `${src}?random=${Math.random()}`);

  return document.body.appendChild(image);
};
