// 06/06/2024 09:43
// reaphsoft-workman
// github.com/kahlflekzy

// src/components/ImageUploadAndCrop.js

import React, {forwardRef, useCallback, useImperativeHandle, useState} from 'react';
import Cropper from 'react-easy-crop';
import {useDropzone} from 'react-dropzone';
import getCroppedImg from './cropImage'; // Helper function to crop the image
import './ImageUploadAndCrop.css'; // Custom styles for the component

const ImageUploadAndCrop = forwardRef((_, ref) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const shape = 'round'; // 'rect' or 'round'

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      if (imageSrc) {
        return await getCroppedImg(imageSrc, croppedAreaPixels, shape);
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  }, [imageSrc, croppedAreaPixels]);

  useImperativeHandle(ref, () => ({
    showCroppedImage,
  }));

  return (
    <div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {imageSrc ? (
          <div className="crop-container">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={shape === 'rect' ? 1 : 1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              cropShape={shape}
              onCropComplete={onCropComplete}
            />
          </div>
        ) : (
          <p className="mx-2 my-2 text-center">Drag 'n' drop an image here, or click to select one</p>
        )}
      </div>
      {imageSrc && (
        <div className="d-flex flex-row my-1"></div>
      )}
    </div>
  );
});

export default ImageUploadAndCrop;
