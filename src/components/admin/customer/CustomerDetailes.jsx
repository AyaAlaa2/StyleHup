import React from "react";
import { useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";

const CustomerDetalis = () => {
  const { data: customers } = useOrder();
  const { customerName } = useParams();
  const id = customerName.split("-").pop();
  const customer = customers.find((c) => Number(c.id) === Number(id));

  console.log(customers);
  if (!customer) {
    return (
      <p className="text-gray-500 mt-2 text-center">Customer not found.</p>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Customer Details
      </h1>

      <div className="grid grid-cols-4 grid-row-2 p-[16px] gap-[24px]">
        <div className="border-t border-[#E5E8EB] py-[20px] flex flex-col justify-center items-start">
          <p className="text-[14px] font-normal text-[#757575]">Name</p>
          <p className="text-[14px] font-normal text-[#141414]">
            {customer.firstName} {customer.lastName}
          </p>
        </div>
        <div className="border-t col-span-3 border-[#E5E8EB] py-[20px] flex flex-col justify-center items-start">
          <p className="text-[14px] font-normal text-[#757575]">Email</p>
          <p className="text-[14px] font-normal text-[#141414]">
            {customer.email}
          </p>
        </div>
        <div className="border-t border-[#E5E8EB] py-[20px] flex flex-col justify-center items-start">
          <p className="text-[14px] font-normal text-[#757575]">Phone</p>
          <p className="text-[14px] font-normal text-[#141414]">
            {customer.phone}
          </p>
        </div>
        <div className="border-t col-span-3 border-[#E5E8EB] py-[20px] flex flex-col justify-center items-start">
          <p className="text-[14px] font-normal text-[#757575]">Address</p>
          <p className="text-[14px] font-normal text-[#141414]">
            {customer.country}-{customer.state}-{customer.city}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Orders</h2>
        {customer ? (
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full  text-sm  table">
              <thead className="bg-gray-50 text-gray-900 font-bold uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">Date</th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {customers
                  .filter((item) => item.email === customer.email)
                  .map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4  text-gray-600">
                        {order.createdAt.slice(0, order.createdAt.indexOf("T"))}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        ${order.total}
                      </td>
                      <td className="px-6 py-4">
                        <button className="btn bg-gray-200 rounded-lg">
                          {order.status}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 mt-2 text-center">
            No orders found for this customer.
          </p>
        )}
      </div>
    </div>
  );
};
export default CustomerDetalis;
