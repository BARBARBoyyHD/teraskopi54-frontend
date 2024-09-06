import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../cashier/AddProduct.module.css";

function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [hotPrice, setHotPrice] = useState("");
  const [coldPrice, setColdPrice] = useState("");
  const [largeSizePrice, setLargeSizePrice] = useState("");
  const [smallSizePrice, setSmallSizePrice] = useState("");
  const [image, setImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
       <header className={styles["navbar-inventory"]}>
        <div className={styles["navbar-content-inventory"]}>
          <h1 className={styles["navbar-title-inventory"]}>TerasKopi54</h1>
          <nav
            className={`${styles["navigation"]} ${
              isMenuOpen ? styles["open"] : ""
            }`}
          >
            <div className={styles["wrap-close"]}>
              <i
                className={`${styles["close-btn"]} fas fa-times`}
                onClick={toggleMenu}
              ></i>
            </div>

            <Link className={styles["navbar-link-inventory"]} to="/AddProduct">
              Add Product
            </Link>
            <Link className={styles["navbar-link-inventory"]} to="/Product">
              Product List
            </Link>
            <Link
              className={styles["navbar-link-inventory"]}
              to="/OrderDetails"
            >
              Order Details
            </Link>
            <Link className={styles["navbar-link-inventory"]} to="/CashierMenu">
              Menu
            </Link>
            <Link className={styles["navbar-link-inventory"]} to="/cashier">
              LogOut
            </Link>
          </nav>
          <div
            className={`${styles["hamburger"]} ${
              isMenuOpen ? styles["open"] : ""
            }`}
            onClick={toggleMenu}
          >
            <i className={`${styles["menu-btn"]} fas fa-bars`}></i>
          </div>
        </div>
      </header>
      <h1 style={{ textAlign: "center" ,color:"black"}}>Add your Product</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className={styles["product-form"]}
      >
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className={styles["form-control"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label>Product Category:</label>
          <input
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className={styles["form-control"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label>Hot Price:</label>
          <input
            type="number"
            value={hotPrice}
            onChange={(e) => setHotPrice(e.target.value)}
            required
            className={styles["form-control"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label>Cold Price:</label>
          <input
            type="number"
            value={coldPrice}
            onChange={(e) => setColdPrice(e.target.value)}
            required
            className={styles["form-control"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label>Large Size Price:</label>
          <input
            type="number"
            value={largeSizePrice}
            onChange={(e) => setLargeSizePrice(e.target.value)}
            required
            className={styles["form-control"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label>Small Size Price:</label>
          <input
            type="number"
            value={smallSizePrice}
            onChange={(e) => setSmallSizePrice(e.target.value)}
            required
            className={styles["form-control"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className={styles["form-control"]}
          />
        </div>
        <button type="submit" className={styles["btn-primary"]}>
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;
