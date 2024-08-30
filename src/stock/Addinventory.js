import styles from "./Addinventory.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Addinventory = () => {
  const [item_name, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price_per_pcs, setPricePerPcs] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!item_name || !quantity || !price_per_pcs) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_name, quantity, price_per_pcs }),
      });

      if (res.ok) {
        setItemName("");
        setQuantity("");
        setPricePerPcs("");
        setMessage("Item added successfully!");
        navigate("/Inventory"); // Redirect after successful item addition
      } else {
        const data = await res.json();
        setMessage(data.message || "Failed to add item.");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Error: Unable to add item.");
    }
  };

  return (
    <div className="Addinventory">
      <header className={styles["navbar-inventory"]}>
        <div className={styles["navbar-content-inventory"]}>
          <h1 className={styles["navbar-title-inventory"]}>TerasKopi54</h1>
          <nav className={styles["navbar-links-inventory"]}>
            <Link className={styles["navbar-link-inventory"]} to="/inventory">
              Stock
            </Link>

            <Link className={styles["navbar-link-inventory"]} to={"/stock"}>
              {" "}
              Logout
            </Link>
          </nav>
        </div>
      </header>
      <div className={styles["wrap-form"]}>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className={styles["product-form"]}
        >
          <div className="form-group">
            <label>Item Name:</label>
            <input
              type="text"
              value={item_name}
              onChange={(e) => setItemName(e.target.value)}
              required
              className={styles["form-control"]}
            />
          </div>
          <div className="form-group">
            <label>Quantity :</label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className={styles["form-control"]}
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="text"
              value={price_per_pcs}
              onChange={(e) => setPricePerPcs(e.target.value)}
              required
              className={styles["form-control"]}
            />
          </div>
         
          <button type="submit" className={styles["btn-primary"]}>
            Add Product
          </button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Addinventory;
