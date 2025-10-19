import React from "react";
import { useNavigate } from "react-router-dom";
import customers from "./Customers";

const Customer = () => {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto ">
      <h1 className="text-3xl font-bold mb-4">Customers</h1>
      <div className="overflow-x-auto rounded-xl border border-[#DBE0E5] overflow-hidden">
        <table className="table ">
          <thead className="font-bold text-black">
            <tr>
              <th>Customer Name</th>
              <th>email</th>
              <th>phone</th>
              <th>address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers ? (
              customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.address}</td>
                  <td>
                    {" "}
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/customers/${c.name.replace(/\s+/g, "-")}-${
                            c.id
                          }`
                        )
                      }
                      className="hover:underline cursor-pointer"
                    >
                      more details..
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Customer;
