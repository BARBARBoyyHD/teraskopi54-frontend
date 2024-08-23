import styles from "./inventory.module.css";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [filterText, setFilterText] = useState("");

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/inventory/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setInventory(inventory.filter((item) => item.item_id !== id));
        } else {
          console.error("Failed to delete item");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const getInventory = () => {
    fetch("http://localhost:5000/api/inventory")
      .then((res) => res.json())
      .then((data) => {
        const inventoryData = data;
        if (Array.isArray(inventoryData)) {
          setInventory(inventoryData);
        } else {
          console.error("Inventory data is not an array");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInventory();
  }, []);

  const filteredItems = Array.isArray(inventory)
    ? inventory.filter((item) =>
        item.item_name?.toLowerCase().includes(filterText.toLowerCase())
      )
    : [];

  const columns = [
    {
      name: "Item Name",
      selector: (row) => row.item_name,
      sortable: true,
      cell: (row) => <div data-label="Item Name">{row.item_name}</div>,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
      cell: (row) => <div data-label="Quantity">{row.quantity}</div>,
    },
    {
      name: "Price/pcs",
      selector: (row) => row.price_per_pcs,
      sortable: true,
      cell: (row) => <div data-label="Price/pcs">{row.price_per_pcs}</div>,
    },
    {
      name: "Edit",
      cell: (row) => (
        <Link className={styles.link} to={`/EditInventory/${row.item_id}`}>
          <button className={styles.edit}></button>
        </Link>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button className={styles.delete} onClick={() => handleDelete(row.item_id)}>
          
        </button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles["navbar-inventory"]}>
        <div className={styles["navbar-content-inventory"]}>
          <h1 className={styles["navbar-title-inventory"]}>Inventory</h1>
          <nav className={styles["navbar-links-inventory"]}>
            <Link to="/stock" className={styles["navbar-link-inventory"]}>
              Logout
            </Link>
            <Link to="/Cafebranch" className={styles["navbar-link-inventory"]}>
              Cafe Branch
            </Link>
          </nav>
        </div>
      </header>
      <div className={styles["main-content"]}>
        <h1>All Stock</h1>
        <div className={styles["bg-stock"]}>
          <div className={styles["search-add"]}>
            <button className={styles["add-inventory"]}>
              <Link className={styles.link} to={"/Addinventory"}>
                Add Item
              </Link>
            </button>
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

export default Inventory;
