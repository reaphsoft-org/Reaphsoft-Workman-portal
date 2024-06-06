// 06/06/2024 09:44
// reaphsoft-workman
// github.com/kahlflekzy

// src/components/cropImage.js

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

const getCroppedImg = async (imageSrc, pixelCrop, shape, maxSize = 768) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );
  if (shape === 'round') {
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.arc(
      pixelCrop.width / 2,
      pixelCrop.height / 2,
      pixelCrop.width / 2,
      0,
      2 * Math.PI
    );
    ctx.closePath();
    ctx.fill();
  }

  if (canvas.width > maxSize || canvas.height > maxSize) {
    const resizeCanvas = document.createElement('canvas');
    const resizeCtx = resizeCanvas.getContext('2d');

    const scaleFactor = Math.min(maxSize / canvas.width, maxSize / canvas.height);
    resizeCanvas.width = canvas.width * scaleFactor;
    resizeCanvas.height = canvas.height * scaleFactor;

    resizeCtx.drawImage(canvas, 0, 0, resizeCanvas.width, resizeCanvas.height);

    return new Promise((resolve) => {
      resizeCanvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    });
  } else {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    });
  }
};

export default getCroppedImg;
