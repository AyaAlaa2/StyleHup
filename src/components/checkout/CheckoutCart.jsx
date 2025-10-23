import { useEffect } from "react";

const CheckoutCart = ({
  loading,
  cartFirebase,
  total,
  fetchCartFromFirebase,
}) => {
  useEffect(() => {
    fetchCartFromFirebase();
  }, [fetchCartFromFirebase]);

  if (loading)
    return (
      <div className="min-h-[200px] w-[30%] flex items-center justify-center">
        <span className="loading loading-spinner loading-xl "></span>
      </div>
    );

  if (cartFirebase.length === 0)
    return (
      <div className="flex flex-col w-[30%] items-start justify-start min-h-[200px]">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        <div className="min-h-[400px] text-center flex items-center">
          <p className=" font-bold text-[22px]">Your cart is Empty</p>
        </div>
        <div className="divider"></div>
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold text-[24px]">Total:</p>
          <p className="text-lg">${total}</p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col hidden lg:block w-[30%]">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      <div className="flex flex-col gap-[16px] justify-start w-full items-center min-h-[200px]">
        {!loading &&
          cartFirebase &&
          cartFirebase.length > 0 &&
          cartFirebase.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full"
            >
              <div className="flex items-center gap-[12px]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div className="flex flex-col gap-[8px]">
                  <p>{item.name}</p>
                  <p>
                    {item.quantity}{" "}
                    <span>{item.quantity > 1 ? "Pieces" : "Piece"}</span>
                  </p>
                </div>
              </div>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
      </div>

      <div className="divider"></div>

      <div className="flex justify-between items-center">
        <span className="font-semibold text-[24px]">Total:</span>
        <span className="text-lg">${total}</span>
      </div>
    </div>
  );
};

export default CheckoutCart;
