import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./EditInventory.module.css";

const EditInventory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item_name, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price_per_pcs, setPricePerPcs] = useState("");

  useEffect(() => {
    // Fetch item data based on `id`
    fetch(`https://api.myteraskopi54.my.id/api/inventory/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItemName(data.item_name);
        setQuantity(data.quantity);
        setPricePerPcs(data.price_per_pcs);
      })
      .catch((err) => console.error("Error fetching item data:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://api.myteraskopi54.my.id/api/inventory/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item_name, quantity, price_per_pcs }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Success");
          navigate("/inventory");
        } else {
          console.log("Failed");
        }
      })
      .catch((err) => console.error("Error updating item:", err));
  };

  return (
    <div className={styles.container}>
      <header className={styles["navbar-inventory"]}>
        <div className={styles["navbar-content-inventory"]}>
          <h1 className={styles["navbar-title-inventory"]}>Inventory</h1>
          <nav className={styles["navbar-links-inventory"]}>
            <Link to="/Cafebranch" className={styles["navbar-link-inventory"]}>
              Cafe Branch
            </Link>
            <Link to="/stock" className={styles["navbar-link-inventory"]}>
              Logout
            </Link>
          </nav>
        </div>
      </header>
      <div className={styles["edit-inventory-container"]}>
        <form onSubmit={handleSubmit} className={styles["edit-inventory-form"]}>
          <label htmlFor="item_name">Item Name</label>
          <input
            type="text"
            id="item_name"
            name="item_name"
            value={item_name}
            onChange={(e) => setItemName(e.target.value)}
          />

          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <label htmlFor="price_per_pcs">Price Per Pcs</label>
          <input
            type="number"
            id="price_per_pcs"
            name="price_per_pcs"
            value={price_per_pcs}
            onChange={(e) => setPricePerPcs(e.target.value)}
          />

          <button type="submit">Submit</button>
          <Link to="/inventory">
            <button type="button" className={styles["cancel-button"]}>
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditInventory;
