import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import styles from "./OrderDetails.module.css";

const OrderDetails = () => {
  const [filterText, setFilterText] = useState("");
  const [OrderDetails, setOrderDetails] = useState([]);
  const tableOrder = () => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrderDetails(data);
        } else {
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
    <div className={styles["container"]}>
      <header className={styles["navbar-inventory"]}>
        <div className={styles["navbar-content-inventory"]}>
          <h1 className={styles["navbar-title-inventory"]}>TerasKopi54</h1>
          <nav className={styles["navbar-links-inventory"]}>
            <Link className={styles["navbar-link-inventory"]} to="/AddProduct">
              Add Product
            </Link>
            <Link className={styles["navbar-link-inventory"]} to={"/Product"}>
              Product List
            </Link>
            <Link
              className={styles["navbar-link-inventory"]}
              to="/OrderDetails"
            >
              Order Details
            </Link>
            <Link
              className={styles["navbar-link-inventory"]}
              to={"/CashierMenu"}
            >
              {" "}
              Menu
            </Link>
            <Link className={styles["navbar-link-inventory"]} to={"/cashier"}>
              {" "}
              logOut
            </Link>
          </nav>
        </div>
      </header>
      <div className={styles["main-content"]}>
        <h1>All Stock</h1>
        <div className={styles["bg-stock"]}>
          <div className={styles["search-add"]}>
            <input
              type="text"
              placeholder="Search Inventory"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className={styles["search-input"]}
            />
          </div>
          <div className={styles["data-table-wrapper"]}>
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
