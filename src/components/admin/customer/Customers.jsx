const customers = [
  {
    id: 1,
    name: "Sophia Clark",
    email: "sophia.clark@email.com",
    phone: "(555) 123-4567",
    address: "123 Elm Street, Anytown, USA",
    orders: [
      {
        orderId: "12345",
        date: "2024-07-20",
        totalAmount: "299",
        status: "Shipped",
      },
      {
        orderId: "12348",
        date: "2024-07-23",
        totalAmount: "249",
        status: "Shipped",
      },
    ],
  },
  {
    id: 2,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 987-6543",
    address: "456 Oak Avenue, Springfield, USA",
    orders: [
      {
        orderId: "22341",
        date: "2024-08-02",
        totalAmount: "120",
        status: "Pending",
      },
      {
        orderId: "22342",
        date: "2024-08-10",
        totalAmount: "80",
        status: "Delivered",
      },
    ],
  },
  {
    id: 3,
    name: "Emma Johnson",
    email: "emma.j@email.com",
    phone: "(555) 111-2222",
    address: "789 Pine Street, Metropolis, USA",
    orders: [
      {
        orderId: "32301",
        date: "2024-09-05",
        totalAmount: "150",
        status: "Shipped",
      },
      {
        orderId: "32302",
        date: "2024-09-07",
        totalAmount: "75",
        status: "Cancelled",
      },
    ],
  },
];
export default customers;
