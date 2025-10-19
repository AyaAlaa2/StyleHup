import React from "react";
import { useParams } from "react-router-dom";
import customers from "./Customers";

const CustomerDetalis = () => {
  const { customerName } = useParams();
  const id = customerName.split("-").pop();
  const customer = customers.find((c) => c.id === parseInt(id));

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
      <div>
        <h1 className="text-xl font-bold mb-6 text-gray-800">
          Customer Information
        </h1>
        <div className="flex gap-30 py-6  border-t border-gray-400">
          <div>
            <p className="font-semibold text-gray-700">Name:</p>
            <p>{customer.name}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Email:</p>
            <p>{customer.email}</p>
          </div>
        </div>

        <div className="flex gap-30 py-6  border-t border-gray-400">
          <div>
            <p className="font-semibold text-gray-700">Phone:</p>
            <p>{customer.phone}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Address:</p>
            <p>{customer.address}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Orders</h2>
        {customer.orders && customer.orders.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full  text-sm  table">
              <thead className=" bg-gray-50 text-gray-900 font-bold uppercase text-xs">
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
                {customer.orders.map((order) => (
                  <tr key={order.orderId}>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      #{order.orderId}
                    </td>
                    <td className="px-6 py-4  text-gray-600">{order.date}</td>
                    <td className="px-6 py-4 text-gray-600">
                      ${order.totalAmount}
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
