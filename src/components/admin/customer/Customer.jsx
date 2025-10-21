import React from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";

const Customer = () => {
  const navigate = useNavigate();

  const { data: customers, isLoading, isError } = useOrder();
  if (isLoading)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <span className="loading loading-spinner loading-xl "></span>
      </div>
    );
  if (isError)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <p className="text-center text-3xl">Oops ! An Error Occured</p>
      </div>
    );

  return (
    <div className="overflow-x-auto ">
      <h1 className="text-3xl font-bold mb-4">Customers</h1>
      <div className="overflow-x-auto rounded-xl border border-[#DBE0E5] overflow-hidden">
        <table className="table ">
          <thead className="font-bold text-black">
            <tr>
              <th></th>
              <th>Customer Name</th>
              <th>email</th>
              <th>phone</th>
              <th>address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers ? (
              [
                ...new Map(
                  customers.map((item) => [item.email, item])
                ).values(),
              ].map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>
                    {c.firstName} {c.lastName}
                  </td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>
                    {c.country}-{c.state}-{c.city}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/admin/customers/${c.firstName}-${c.id}`)
                      }
                      className="font-bold hover:underline cursor-pointer"
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
