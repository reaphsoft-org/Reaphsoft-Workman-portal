// 06/06/2024 09:43
// reaphsoft-workman
// github.com/kahlflekzy

// src/components/ImageUploadAndCrop.js

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { useDropzone } from 'react-dropzone';
import getCroppedImg from './cropImage'; // Helper function to crop the image
import './ImageUploadAndCrop.css';
import {Button} from "react-bootstrap";
import {BsCrop} from "react-icons/bs"; // Custom styles for the component
import { Form  } from "react-bootstrap";

const ImageUploadAndCrop = () => {
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

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, shape);
      console.log('Cropped image:', croppedImage);
      // You can do something with the cropped image (e.g., upload to server)
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, shape]);

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
          <Button onClick={showCroppedImage} type="button" variant="outline-secondary" className="me-3">
            <BsCrop />
          </Button>
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
