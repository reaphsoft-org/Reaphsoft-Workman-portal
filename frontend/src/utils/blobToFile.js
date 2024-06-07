// 07/06/2024 09:05
// reaphsoft-workman
// github.com/kahlflekzy

const blobToFile = (blob, fileName) => {
  return new File([blob], fileName, { type: 'image/png' });
};

export default blobToFile;
