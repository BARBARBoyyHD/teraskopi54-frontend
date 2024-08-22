import styles from "./Addinventory.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="itemName">Item Name:</label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          value={item_name}
          onChange={(e) => setItemName(e.target.value)}
          required
        />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <label htmlFor="pricePerPcs">Price/pcs:</label>
        <input
          type="number"
          id="pricePerPcs"
          name="pricePerPcs"
          value={price_per_pcs}
          onChange={(e) => setPricePerPcs(e.target.value)}
          required
        />

        <button type="submit">Add Item</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Addinventory;
