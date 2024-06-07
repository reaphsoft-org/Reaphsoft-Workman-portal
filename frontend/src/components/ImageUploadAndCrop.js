// 06/06/2024 09:43
// reaphsoft-workman
// github.com/kahlflekzy

// src/components/ImageUploadAndCrop.js

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { useDropzone } from 'react-dropzone';
import getCroppedImg from './cropImage'; // Helper function to crop the image
import './ImageUploadAndCrop.css'; // Custom styles for the component
import { Form  } from "react-bootstrap";

const ImageUploadAndCrop = ({setCroppedImage}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [shape, setShape] = useState('rect'); // 'rect' or 'round'

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

  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, shape);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.log(e);
    }
  }, [imageSrc, setCroppedImage, shape]);

  return (
    <div className="">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {imageSrc ? (
          <div className="crop-container">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={shape === 'square' ? 1 : 1}
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
        <div className="d-flex flex-row my-1">
          <Form.Select value={shape} onChange={(e) => {setShape(e.target.value)}}>
            <option value="rect">Square</option>
            <option value="round">Circle</option>
          </Form.Select>
        </div>
      )}
    </div>
  );
};

export default ImageUploadAndCrop;
