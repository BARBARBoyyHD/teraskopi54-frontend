import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
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
        } else {
          console.error("Expected an array but got:", response.data);
          setProducts([]); // Set to empty array if data is not an array
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]); // Set to empty array on error
      });
  }, []);

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

  const handleRemoveFromCart = (item) => {
    setCart(
      cart.filter(
        (cartItem) =>
          cartItem.product_id !== item.product_id ||
          cartItem.variant_type !== item.variant_type ||
          cartItem.size_name !== item.size_name
      )
    );
    calculateTotal();
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity_order;
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
    <div>
      <h1>Shopping Cart</h1>
      <Link to="/AddProduct">Add Product</Link>
      <Link to={"/Product"}>Product List</Link>
      <Link to="/OrderDetails">Order Details</Link>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <img
              src={`http://localhost:5000/${product.image_url}`}
              style={{ width: 100, height: 100 }}
              alt={product.product_name}
            />
            {product.product_name} - ${product.product_price}
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
            <button
              onClick={() =>
                handleAddToCart(
                  product,
                  selectedVariant[product.product_id],
                  selectedSize[product.product_id]
                )
              }
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={`${item.product_id}-${item.variant_type}-${item.size_name}`}>
            {item.product_name} ({item.variant_type}){" "}
            {item.size_name ? `- ${item.size_name}` : ""} x{" "}
            {item.quantity_order} - ${item.price * item.quantity_order}
            <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
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
  );
};

export default Cart;
