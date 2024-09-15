import { Link } from "react-router-dom";
import "./landingpage.css";

const landingpage = () => {
  return (
    <div>
      <section className="landingpage">
     
        <header className="navbar">
          <div className="logo"></div>
          <div className="wrap-navigation">
            <div className="navigation"></div>
          </div>

        </header>
        <div className="wraplinks">
          <h1 className="Quote">Welcome To Teras Kopi 54 Cashier and Inventory Management App</h1>
          <div className="links">
            <Link to="/cashier">Log in to Cashier</Link>
            <Link to="/stock">Log in to Stock</Link>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "0px", width: "100%" }}>
          <footer style={{ textAlign: "center" }}>
            <p>Copyright © 2024 Muhammad Nahrul Hayat</p>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default landingpage;
