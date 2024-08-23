// CartModal.js
import React, { useState } from 'react';
import styles from './CartModal.module.css';

const CartModal = ({ cart, handleRemoveFromCart, handleCheckout }) => {
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity_order, 0);
  };

  return (
    <CartProvider>
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
                  onClick={() => {
                    handleAddToCart(
                      product,
                      selectedVariant[product.product_id],
                      selectedSize[product.product_id]
                    );
                  }}
                  data-toggle-cart
                  className="fa-solid fa-plus"
                ></button>
            </div>
          ))}
        </div>
      </div>
      {isCartWrapVisible && (
        <div className={styles["cart-wrap"]} data-cart key="cart-content">
            <h2>Cart</h2>
          <ul>
            {cart.map((item) => (
              <li
                key={`${item.product_id}-${item.variant_type}-${item.size_name}`}
              >
                {item.product_name} ({item.variant_type}){" "}
                {item.size_name ? `- ${item.size_name}` : ""} x{" "}
                {item.quantity_order} - ${item.price * item.quantity_order}
                <button onClick={() => handleRemoveFromCart(item)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {cart.map((item) => (
            <p>Total: ${item.price * item.quantity_order}</p>
          ))}
          {/* <p>Total: ${item.price * item.quantity_order}</p> */}
          <h3>Checkout</h3>
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="QRIS">QRIS</option>
          </select>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </CartProvider>
  );
};

export default CartModal;