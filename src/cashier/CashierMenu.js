import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../cashier/CashierMenu.module.css";

const Cart = () => {
  const [quantity, setQuantity] = useState({});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [selectedSize, setSelectedSize] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        // Log the response data
        if (Array.isArray(response.data)) {
          setProducts(response.data);
          const initialQuantity = {};
          response.data.forEach((product) => {
            initialQuantity[product.product_id] = 0;
          });
          setQuantity(initialQuantity);
        } else {
          console.error("Expected an array but got:", response.data);
          setProducts([]); // Set to empty array if data is not an array
          setQuantity({});
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]); // Set to empty array on error
        setQuantity({});
      });
  }, [quantity]);

  const handleAddToCart = (product, variant, size) => {
    if (!variant) {
      alert("Please select a variant");
      return;
    }

    const existingProduct = cart.find(
      (item) =>
        item.product_id === product.product_id &&
        item.variant_type === variant &&
        item.size_name === size
    );

    const variantPrice =
      variant === "Hot" ? product.hot_price : product.cold_price;
    const sizePrice = size
      ? size === "Large"
        ? product.large_size_price
        : product.small_size_price
      : 0;

    if (existingProduct) {
      existingProduct.quantity_order++;
    } else {
      setCart([
        ...cart,
        {
          ...product,
          variant_type: variant,
          size_name: size,
          quantity_order: 1,
          price: variantPrice + sizePrice,
        },
      ]);
    }
    calculateTotal();
  };

  const handleDecreaseItem = (productId) => {
    const updatedCart = cart
      .map((item) => {
        if (item.product_id === productId) {
          if (item.quantity_order > 1) {
            return { ...item, quantity_order: item.quantity_order - 1 };
          } else {
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null);

    setCart(updatedCart);
    calculateTotal(); // Recalculate total after updating cart
  };
  const handleRemoveFromCart = (item) => {
    const newCart = cart.filter(
      (cartItem) =>
        cartItem.product_id !== item.product_id ||
        cartItem.variant_type !== item.variant_type ||
        cartItem.size_name !== item.size_name
    );
    setCart(newCart);
    if (newCart.length < 1) {
      setTotal(0); // Reset total to 0 when cart is empty
    } else {
      calculateTotal();
    }
  };
  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      if (item.quantity_order > 0) {
        total += item.price * item.quantity_order;
      }
    });
    setTotal(total);
  };
  const handleCheckout = () => {
    if (!customerName || !paymentMethod) {
      alert("Please enter customer name and select a payment method");
      return;
    }

    const formattedCart = cart.map((item) => ({
      customer_name: customerName,
      payment_method: paymentMethod,
      product_id: item.product_id,
      product_name: item.product_name,
      variant_type: item.variant_type,
      size_name: item.size_name,
      quantity_order: item.quantity_order,
      price: item.price,
      total_price: item.price * item.quantity_order, // Calculate total price for the item
    }));

    axios
      .post("http://localhost:5000/api/add-order", {
        orders: formattedCart,
        total_amount: total,
      })
      .then((response) => {
        console.log(response.data);
        setCart([]);
        setTotal(0);
        setCustomerName("");
        setPaymentMethod("");
        window.print();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleVariantChange = (productId, variant) => {
    setSelectedVariant({
      ...selectedVariant,
      [productId]: variant,
    });

    // Reset size selection when changing variant
    setSelectedSize({
      ...selectedSize,
      [productId]: undefined,
    });
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSize({
      ...selectedSize,
      [productId]: size,
    });
  };

  return (
    <div className={styles["stock"]}>
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
            <Link className={styles["navbar-link-inventory"]} to={"/cashier"}>
              {" "}
              logOut
            </Link>
          </nav>
        </div>
      </header>
      <h1>Menu</h1>
      <div className={styles["wrap-all"]}>
        <div className={styles["wrap-menu"]}>
          <div className={styles["menu-container"]}>
            {products.map((product) => (
              <div key={product.product_id} className={styles["menu-item"]}>
                <img
                  src={`http://localhost:5000/${product.image_url}`}
                  style={{ width: 100, height: 100 }}
                  alt={product.product_name}
                />
                <div>
                  <h1>{product.product_name}</h1>
                </div>
                {product.hot_price > 0 && (
                  <div>
                    <p>Hot : Rp.{product.hot_price}</p>
                  </div>
                )}
                {product.cold_price > 0 && (
                  <div>
                    {product.hot_price > 0 ? (
                      <div>
                        <p>Cold : Rp.{product.cold_price}</p>
                      </div>
                    ) : (
                      <div>
                        <p>
                          <strong>Iced</strong> : Rp.{product.cold_price}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                <select
                  value={selectedVariant[product.product_id] || ""}
                  onChange={(e) =>
                    handleVariantChange(product.product_id, e.target.value)
                  }
                >
                  <option value="">Select Variant</option>
                  <option value="Hot">Hot</option>
                  <option value="Iced">Iced</option>
                </select>
                {selectedVariant[product.product_id] === "Iced" && (
                  <select
                    value={selectedSize[product.product_id] || ""}
                    onChange={(e) =>
                      handleSizeChange(product.product_id, e.target.value)
                    }
                  >
                    <option value="">Select Size</option>
                    <option value="Large">Large</option>
                    <option value="Small">Small</option>
                  </select>
                )}
                <div className={styles["button-container"]}>
                  <button
                    className="fa-solid fa-minus"
                    onClick={() => handleDecreaseItem(product.product_id)}
                  ></button>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product,
                        selectedVariant[product.product_id],
                        selectedSize[product.product_id]
                      )
                    }
                    className="fa-solid fa-plus"
                  ></button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles["cart-wrap"]}>
          <h2>Cart</h2>
          <ul>
            {cart.map((item) => (
              <div
                key={`${item.product_id}-${item.variant_type}-${item.size_name}`}
                className={styles["cart-item"]}
              >
                <img
                  src={`http://localhost:5000/${item.image_url}`}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "10px",
                    border: "2px solid white",
                  }}
                />
                <p>
                  {item.product_name} ({item.variant_type}){" "}
                </p>
                <p>
                  {item.size_name ? ` ${item.size_name}` : ""} x{" "}
                  {item.quantity_order} Rp.{item.price * item.quantity_order}
                </p>

                <div className={styles["button-container"]}>
                  <button
                    className="fa-solid fa-minus"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDecreaseItem(item.product_id)}
                  ></button>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        item,
                        selectedVariant[item.product_id],
                        selectedSize[item.product_id]
                      )
                    }
                    className="fa-solid fa-plus"
                    style={{ cursor: "pointer" }}
                  ></button>
                </div>
              </div>
            ))}
          </ul>
          <p>
            <strong>Total</strong>{" "}
          </p>
          <p>
            <strong>
              {" "}
              Rp.
              {cart.reduce(
                (acc, item) => acc + item.price * item.quantity_order,
                0
              )}
            </strong>
          </p>

          <div className={styles["wrap-checkout"]}>
            <h3>Checkout</h3>
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className={styles["customer-name"]}
            />
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className={styles["payment-method"]}
            >
              <option value="">Select Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
              <option value="QRIS">QRIS</option>
            </select>
            <button onClick={handleCheckout} className={styles["btn-checkout"]}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
