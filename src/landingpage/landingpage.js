import { Link } from "react-router-dom";
import "./landingpage.css";

const landingpage = () => {
  
  return (
    <div>
      <section className="landingpage">
        <input type="checkbox" id="check" />
        <header className="navbar">
          <h1 className="companyname">Teras Kopi 54</h1>
          <div className="wrap-navigation">
            <div className="navigation">
              <Link to="/">Home</Link>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <label className="hamburger" htmlFor="check">
            <i className="fas fa-bars menu-btn"></i>
            <i className="fas fa-times close-btn"></i>
          </label>
        </header>
        <div className="wraplinks">
          <h1 className="Quote">Experience the Perfect Cup, Every Time </h1>
          <div className="links">
            <Link to="/cashier">Log in to Cashier</Link>
            <Link to="/stock">Log in to Stock</Link>
          </div>
        </div>
      </section>
      <section className="enjoy">
        <div className="wrap-image">
          <div className="img-rate"></div>
          <h1>200</h1>
          <p className="desc">Transport</p>
        </div>
        <div className="wrap-image">
          <div className="img-rate2"></div>
          <h1>200</h1>
          <p className="desc">Customer Satisfaction</p>
        </div>
        <div className="wrap-image">
          <div className="img-rate3"></div>
          <h1>200</h1>
          <p className="desc">Recommend by Customer</p>
        </div>
      </section>
      <section className="about">
        <div className="wrap-about">
          <div className="description">
            <h1 className="about-us-title">About us</h1>
            <p>
              Welcome to Teras Kopi 54 Cafe and Resto, where every cup tells a
              story, and every meal is a celebration of flavors. Nestled in the
              heart of our community, Teras Kopi 54 is more than just a cafe;
              it's a cozy retreat where friends gather, ideas flourish, and
              moments are shared over delicious coffee and carefully crafted
              dishes.
            </p>
            <p>
              At Teras Kopi 54, we believe in the art of brewing the perfect
              cup. Our baristas are passionate about coffee, selecting only the
              finest beans to ensure every sip is rich, aromatic, and
              satisfying. But we don’t stop at coffee. Our menu is a fusion of
              traditional and contemporary cuisine, offering a variety of dishes
              that cater to every palate, whether you're here for a hearty
              breakfast, a light lunch, or a relaxing dinner.
            </p>
            <p>
              The name "Teras Kopi 54" reflects our commitment to creating a
              warm and inviting atmosphere. "Teras" symbolizes the welcoming
              space where everyone is invited to relax, unwind, and enjoy. The
              number "54" holds a special place in our hearts, representing the
              spirit of togetherness and community that we cherish.
            </p>
            <p>
              Whether you're a coffee connoisseur, a food lover, or simply
              looking for a place to unwind, Teras Kopi 54 Cafe and Resto is
              your home away from home. We look forward to welcoming you and
              making your experience with us truly memorable.
            </p>
          </div>
          <div className="image"></div>
        </div>
      </section>
      <section className="contact">
        <h1>Follow us </h1>
        <div className="wrap-contact">
          <div className="teras-kopi">
            <h1>Teras Kopi 54</h1>
          </div>
          <div className="sosmed">
            <div className="ig"></div>
            <div className="fb"></div>
          </div>
          <div className="address">
            <p className="address-detail">jl. Panorama 54 Kota Bandung, Jawa Barat 40265</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default landingpage;
