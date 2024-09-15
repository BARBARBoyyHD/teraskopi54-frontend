import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./EditProduct.module.css";
import { Link } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams(); // Get id from the URL params
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [hotPrice, setHotPrice] = useState("");
  const [coldPrice, setColdPrice] = useState("");
  const [largeSizePrice, setLargeSizePrice] = useState("");
  const [smallSizePrice, setSmallSizePrice] = useState("");
  const [image, setImage] = useState(null); // This holds the new image file
  const [existingImageUrl, setExistingImageUrl] = useState(""); // This holds the existing image URL from the database
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch product data using useEffect
  useEffect(() => {
    fetch(`https://api.myteraskopi54.my.id/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductName(data.product_name);
        setProductCategory(data.product_category);
        setHotPrice(data.hot_price);
        setColdPrice(data.cold_price);
        setLargeSizePrice(data.large_size_price);
        setSmallSizePrice(data.small_size_price);
        setExistingImageUrl(data.image_url); // Set the existing image URL
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("product_category", productCategory);
    formData.append("hot_price", hotPrice);
    formData.append("cold_price", coldPrice);
    formData.append("large_size_price", largeSizePrice);
    formData.append("small_size_price", smallSizePrice);

    // Only append the image if a new one is provided
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("existing_image_url", existingImageUrl); // Send the existing image URL if no new image is uploaded
    }

    try {
      await axios.put(`https://api.myteraskopi54.my.id/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product updated successfully!");
      navigate("/CashierMenu");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product. Please try again.");
    }
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
      <div className={styles.container}>
        <h1 style={{ textAlign: "center" , color:"black"}}>Edit your product</h1>
        <form className={styles["form"]} onSubmit={handleSubmit} encType="multipart/form-data">
          <label className={styles.label}>
            Product Name:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className={styles.input}
            />
          </label>
          <br />
          <label className={styles.label}>
            Product Category:
            <input
              type="text"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className={styles.input}
            />
          </label>
          <br />
          <label className={styles.label}>
            Hot Price:
            <input
              type="number"
              value={hotPrice}
              onChange={(e) => setHotPrice(e.target.value)}
              required
              className={styles.input}
            />
          </label>
          <br />
          <label className={styles.label}>
            Cold Price:
            <input
              type="number"
              value={coldPrice}
              onChange={(e) => setColdPrice(e.target.value)}
              required
              className={styles.input}
            />
          </label>
          <br />
          <label className={styles.label}>
            Large Size Price:
            <input
              type="number"
              value={largeSizePrice}
              onChange={(e) => setLargeSizePrice(e.target.value)}
              required
              className={styles.input}
            />
          </label>
          <br />
          <label className={styles.label}>
            Small Size Price:
            <input
              type="number"
              value={smallSizePrice}
              onChange={(e) => setSmallSizePrice(e.target.value)}
              required
              className={styles.input}
            />
          </label>
          <br />
          <label className={styles.label}>
            Image:
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) => setImage(e.target.files[0])} // Set the new image
              className={styles.input}
            />
          </label>
          <br />
          {/* Display the existing image */}
          {existingImageUrl && (
            <img
              src={`https://api.myteraskopi54.my.id/uploads/${existingImageUrl}`} // Corrected to use image_url from the database
              width="100"
              className={styles.image}
            />
          )}
          <br />
          <button type="submit" className={styles.button}>
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
