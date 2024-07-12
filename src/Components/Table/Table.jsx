// import axios from "axios";
// import React, { useEffect, useState } from "react";

// export default function Table() {
//   let [dataInfo, setDataInfo] = useState({});
//   let [sortedData, setSortedData] = useState(true);

//   async function getData() {
//     let options = {
//       url: "http://localhost:3000/0",
//       method: "GET",
//     };
//     let { data } = await axios.request(options);
//     setDataInfo(data);
//   }

//   useEffect(() => {
//     getData();
//   }, []);

//   const sortingName = (col) => {
//     if (sortedData) {
//       const sorted = [...dataInfo.customers].sort((a, b) => {
//         if (a[col].toLowerCase() > b[col].toLowerCase()) return 1;
//         if (a[col].toLowerCase() < b[col].toLowerCase()) return -1;
//         return 0;
//       });
//       setDataInfo({ ...dataInfo, customers: sorted });
//       setSortedData(false);
//     } else {
//       const sorted = [...dataInfo.customers].sort((a, b) => {
//         if (a[col].toLowerCase() < b[col].toLowerCase()) return 1;
//         if (a[col].toLowerCase() > b[col].toLowerCase()) return -1;
//         return 0;
//       });
//       setDataInfo({ ...dataInfo, customers: sorted });
//       setSortedData(true);
//     }
//   };

//   function getCustomerAmount(customerId) {
//     return dataInfo.transactions
//       .filter((transaction) => transaction.customer_id === customerId)
//       .reduce((total, transaction) => total + transaction.amount, 0);
//   }

//   function getCustomerLastChecked(customerId) {
//     let w = dataInfo.transactions.filter(
//       (transaction) => transaction.customer_id === customerId
//     );

//     if (w.length === 0) return "There are no transactions";

//     const z = w.reduce((last, transaction) => {
//       return new Date(last.date) > new Date(transaction.date)
//         ? last
//         : transaction;
//     });

//     return z.date;
//   }

//   return (
//     <>
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg container">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 <div className="flex items-center justify-center">
//                   Customer name
//                   <a
//                     href="#"
//                     onClick={() => {
//                       sortingName("name");
//                     }}
//                   >
//                     <svg
//                       className="w-3 h-3 ms-1.5"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
//                     </svg>
//                   </a>
//                 </div>
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 <div className="flex justify-center items-center">
//                   Last Checked
//                 </div>
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 <div className="flex items-center justify-center">Amount</div>
//               </th>
//               <th scope="col" className="px-6 py-3"></th>
//               <th scope="col" className="px-6 py-3">
//                 <span className="sr-only">Edit</span>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {dataInfo?.customers?.map((customer, index) => (
//               <tr
//                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
//                 key={index}
//               >
//                 <th
//                   scope="row"
//                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                 >
//                   {customer.name}
//                 </th>
//                 <td className="px-6 py-4 text-center">
//                   {getCustomerLastChecked(customer.id)}
//                 </td>
//                 <td className="px-6 py-4 text-center">
//                   {getCustomerAmount(customer.id)}
//                 </td>
//                 <td className="px-6 py-4 text-right">
//                   <button
//                     onClick={() =>
//                       document.getElementById("my_modal_2").showModal()
//                     }
//                     href="#"
//                     className=" block font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                   >
//                     Graph
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <dialog id="my_modal_2" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Hello!</h3>
//           <p className="py-4">Press ESC key or click outside to close</p>
//         </div>
//         <form method="dialog" className="modal-backdrop">
//           <button>close</button>
//         </form>
//       </dialog>
//     </>
//   );
// }

import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomerChart from "../CustomerChar/TransactionChar";

export default function Table() {
  let [dataInfo, setDataInfo] = useState({});
  let [sortedData, setSortedData] = useState(true);
  let [selectedCustomer, setSelectedCustomer] = useState(null);

  async function getData() {
    let options = {
      url: "http://localhost:3000/0",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setDataInfo(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const sortingName = (col) => {
    if (sortedData) {
      const sorted = [...dataInfo.customers].sort((a, b) => {
        if (a[col].toLowerCase() > b[col].toLowerCase()) return 1;
        if (a[col].toLowerCase() < b[col].toLowerCase()) return -1;
        return 0;
      });
      setDataInfo({ ...dataInfo, customers: sorted });
      setSortedData(false);
    } else {
      const sorted = [...dataInfo.customers].sort((a, b) => {
        if (a[col].toLowerCase() < b[col].toLowerCase()) return 1;
        if (a[col].toLowerCase() > b[col].toLowerCase()) return -1;
        return 0;
      });
      setDataInfo({ ...dataInfo, customers: sorted });
      setSortedData(true);
    }
  };

  function getCustomerAmount(customerId) {
    return dataInfo.transactions
      .filter((transaction) => transaction.customer_id === customerId)
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  function getCustomerLastChecked(customerId) {
    let w = dataInfo.transactions.filter(
      (transaction) => transaction.customer_id === customerId
    );

    if (w.length === 0) return "There are no transactions";

    const z = w.reduce((last, transaction) => {
      return new Date(last.date) > new Date(transaction.date)
        ? last
        : transaction;
    });

    return z.date;
  }

  function showCustomerChart(customerId) {
    setSelectedCustomer(customerId);
    document.getElementById("my_modal_2").showModal();
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg container">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center justify-center">
                  Customer name
                  <a
                    href="#"
                    onClick={() => {
                      sortingName("name");
                    }}
                  >
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex justify-center items-center">
                  Last Checked
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center justify-center">Amount</div>
              </th>
              <th scope="col" className="px-6 py-3 flex justify-center">
                Graph
              </th>
            </tr>
          </thead>
          <tbody>
            {dataInfo?.customers?.map((customer, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
                key={index}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {customer.name}
                </th>
                <td className="px-6 py-4 text-center">
                  {getCustomerLastChecked(customer.id)}
                </td>
                <td className="px-6 py-4 text-center">
                  {getCustomerAmount(customer.id)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => showCustomerChart(customer.id)}
                    className=" block font-medium text-blue-600 dark:text-blue-500 hover:underline mx-auto"
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Customer Transactions</h3>
          <div className="py-4">
            {selectedCustomer && (
              <CustomerChart
                customerId={selectedCustomer}
                transactions={dataInfo.transactions}
              />
            )}
          </div>
          <button
            onClick={() => document.getElementById("my_modal_2").close()}
            className="btn"
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
