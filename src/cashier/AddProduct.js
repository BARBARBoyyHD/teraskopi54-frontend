import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [hotPrice, setHotPrice] = useState("");
  const [coldPrice, setColdPrice] = useState("");
  const [largeSizePrice, setLargeSizePrice] = useState("");
  const [smallSizePrice, setSmallSizePrice] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("product_category", productCategory);
    formData.append("hot_price", hotPrice);
    formData.append("cold_price", coldPrice);
    formData.append("large_size_price", largeSizePrice);
    formData.append("small_size_price", smallSizePrice);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully!");
      navigate("/CashierMenu");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        Product Name:
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Product Category:
        <input
          type="text"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        />
      </label>
      <br />
      <label>
        Hot Price:
        <input
          type="number"
          value={hotPrice}
          onChange={(e) => setHotPrice(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Cold Price:
        <input
          type="number"
          value={coldPrice}
          onChange={(e) => setColdPrice(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Large Size Price:
        <input
          type="number"
          value={largeSizePrice}
          onChange={(e) => setLargeSizePrice(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Small Size Price:
        <input
          type="number"
          value={smallSizePrice}
          onChange={(e) => setSmallSizePrice(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Image:
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </label>
      <br />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;
