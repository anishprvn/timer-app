// components/ImageUpload.tsx
"use client";

import { Button } from '@mui/material';
import { useState, ChangeEvent, useEffect } from 'react';

const ImageUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (preview) {
      document.body.style.backgroundImage = `url(${preview})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    } else {
      document.body.style.backgroundImage = '';
    }

    return () => {
      document.body.style.backgroundImage = '';
    };
  }, [preview]);

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="contained-button-file"
        type="file"
        title="Image upload"
        onChange={handleImageChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Upload Image
        </Button>
      </label>
      {false && (
        <div>
          <h2>Image Preview:</h2>
          {/* <img src={preview} alt="Selected Image" style={{ maxWidth: '300px', maxHeight: '300px' }} /> */}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
