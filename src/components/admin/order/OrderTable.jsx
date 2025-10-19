import { HiChevronDown } from "react-icons/hi";

const OrderTable = ({
  setDateOpen,
  setStatOpen,
  dateOpen,
  statOpen,
  statusSelected,
  orderDateSelected,
  handleStatusChange,
  handleDateChange,
  status,
  orderDate,
  filteredProducts,
}) => {
  console.log(filteredProducts);
  return (
    <div className="relative">
      <h1 className="text-3xl font-bold mb-4">Order</h1>

      <div className="flex gap-4 mb-4">
        <div className="relative">
          <button
            className="bg-gray-100 rounded-full px-4 py-2 font-semibold"
            onClick={() => setDateOpen(!dateOpen)}
          >
            {orderDateSelected === "All" ? "Order Date" : orderDateSelected}
            <HiChevronDown
              className={`w-4 h-4 inline transition-transform ${
                dateOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dateOpen && (
            <ul className="absolute bg-white left-0 mt-1 w-48 rounded-lg shadow-lg z-50">
              {orderDate.map((date, idx) => (
                <li key={idx}>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
                    onClick={() => handleDateChange(date)}
                  >
                    {date}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          <button
            className="bg-gray-100 rounded-full px-4 py-2 font-semibold"
            onClick={() => setStatOpen(!statOpen)}
          >
            {statusSelected === "All" ? "Status " : statusSelected}
            <HiChevronDown
              className={`w-4 h-4 inline transition-transform ${
                statOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {statOpen && (
            <ul className="absolute bg-white left-0 mt-1 w-48 rounded-lg shadow-lg z-50">
              {status.map((stat, idx) => (
                <li key={idx}>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
                    onClick={() => handleStatusChange(stat)}
                  >
                    {stat}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#DBE0E5] overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={product.id}>
                  <td className="text-[#121417]">#{index + 1} </td>
                  <td className="text-[#61758A]">
                    {product.firstName + " " + product.lastName}
                  </td>
                  <td className="text-[#61758A]">
                    {product.createdAt.slice(0, product.createdAt.indexOf("T"))}
                  </td>
                  <td className="text-[#61758A]">${product.total}</td>
                  <td className="font-medium">
                    <span className="inline-block bg-[#F0F2F5] px-[40px] py-[4px] rounded-lg leading-[21px]">
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrderTable;
