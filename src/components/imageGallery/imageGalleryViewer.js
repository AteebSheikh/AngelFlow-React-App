import React from "react";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

const ImageGalleryViewer = ({ images }) => {
  return (
    <div className="slider-wrapper-image">
      <ImageGallery items={images} showPlayButton={false} />
    </div>
  );
};

export default ImageGalleryViewer;
