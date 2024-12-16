document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const gallery = document.querySelector('.gallery-container');
  let index = 0;

  prevBtn.addEventListener('click', () => {
      if (index > 0) {
          index--;
          updateGallery();
      }
  });

  nextBtn.addEventListener('click', () => {
      if (index < gallery.children.length - 1) {
          index++;
          updateGallery();
      }
  });

  function updateGallery() {
      const width = gallery.children[0].offsetWidth;
      gallery.style.transform = `translateX(${-index * width}px)`;
  }
});
