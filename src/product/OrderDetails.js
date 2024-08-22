import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const OrderDetails = () => {
  const [filterText, setFilterText] = useState("");
  const [OrderDetails, setOrderDetails] = useState([]);
  const tableOrder = () => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if(Array.isArray(data)){
          setOrderDetails(data);
        }else{
          console.error("Order data is not an array");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    tableOrder();
  }, []);

  const columns = [
    {
      name: "Customer Name",
      selector: (row) => row.customer_name,
      sortable: true,
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Variant Type",
      selector: (row) => row.variant_type,
      sortable: true,
    },
    {
      name: "Order Quantity",
      selector: (row) => row.quantity_order,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Total Price",
      selector: (row) => row.total_price,
      sortable: true,
    },
    {
      name: "Payment Method",
      selector: (row) => row.payment_method,
      sortable: true,
    },
    {
      name: "Order Date",
      selector: (row) => row.order_date,
      sortable: true,
    },
  ];

  const filteredItems = OrderDetails
    ? OrderDetails.filter(
        (item) =>
          item.customer_name &&
          item.customer_name.toLowerCase().includes(filterText.toLowerCase())
      )
    : [];
  return (
    <div className="container">
      <header className="navbar-inventory">
        <div className="navbar-content-inventory">
          <h1 className="navbar-title-inventory">Order Details</h1>
          <nav className="navbar-links-inventory">
            <Link to="/" className="navbar-link-inventory">
              Logout
            </Link>
            <Link to="/CashierMenu" className="navbar-link-inventory">
              Menu
            </Link>
          </nav>
        </div>
      </header>
      <div className="main-content">
        <h1>All Stock</h1>
        <div className="bg-stock">
          <div className="search-add">
            <input
              type="text"
              placeholder="Search Customer Name"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="data-table-wrapper">
            <DataTable
              columns={columns}
              data={filteredItems}
              pagination
              highlightOnHover
              striped
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
