import React from 'react'

const ProductImage = ({productImage , productName}) => {
  return (
    <div className="p-[16px]">
      <img
        src={productImage}
        alt={productName}
        className="w-full h-[688px] object-cover rounded-lg"
      />
    </div>
  );
}

export default ProductImage
