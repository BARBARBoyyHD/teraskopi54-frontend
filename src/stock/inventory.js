import "./inventory.css";
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
          // Remove the item from the state only if the deletion was successful
          setInventory(inventory.filter((item) => item.item_id !== id));
        } else {
          // Handle errors here
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
        const inventoryData = data; // Assuming data is already an array
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
    ? inventory.filter(
        (item) =>
          item.item_name &&
          item.item_name.toLowerCase().includes(filterText.toLowerCase())
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
        <Link className="link" to={`/EditInventory/${row.item_id}`}>
          <button className="edit"></button>
        </Link>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button className="delete" onClick={() => handleDelete(row.item_id)}>
          
        </button>
      ),
    },
  ];

  return (
    <div className="container">
      <header className="navbar-inventory">
        <div className="navbar-content-inventory">
          <h1 className="navbar-title-inventory">Inventory</h1>
          <nav className="navbar-links-inventory">
            <Link to="/" className="navbar-link-inventory">
              Logout
            </Link>
            <Link to="/Cafebranch" className="navbar-link-inventory">
              Cafe Branch
            </Link>
          </nav>
        </div>
      </header>
      <div className="main-content">
        <h1>All Stock</h1>
        <div className="bg-stock">
          <div className="search-add">
            <button className="add-inventory">
              <Link className="link" to={"/Addinventory"}>
                Add Item
              </Link>
            </button>
            <input
              type="text"
              placeholder="Search Inventory"
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

export default Inventory;
