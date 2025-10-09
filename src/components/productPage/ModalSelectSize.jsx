import React from "react";

const ModalSelectSize = ({
  product,
  selectedSize,
  setSelectedSize,
  setIsOpen,
  handleConfirmAddToCart,
}) => {
  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <img
          src={product.image}
          alt={product.name}
          className="w-34 h-34 object-cover rounded-xl mx-auto my-3"
        />
        <div className="flex gap-[8px]">
          <p className="text-gray-600 mb-3">Price: </p>
          <p>{product.price} $</p>
        </div>

        <div className="form-control flex gap-[8px]">
          <label className="label">
            <span className="label-text">Select Size :</span>
          </label>
          <select
            className="select select-bordered"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option hidden value="Select Size">
              Select Size
            </option>
            {product.size.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-action">
          <button className="btn btn-success" onClick={handleConfirmAddToCart}>
            Done
          </button>
          <button className="btn" onClick={() => setIsOpen(false)}>
            Cancle
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalSelectSize;
