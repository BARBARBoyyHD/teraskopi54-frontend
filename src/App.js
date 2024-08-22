import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landingpage from "./landingpage/landingpage";
import Cashier from "./cashier/cashier";
import Stock from "./stock/stock";
import RegisterStock from "./stock/RegisterStock";
import Inventory from "./stock/inventory";
import Addinventory from "./stock/Addinventory";
import EditInventory from "./stock/EditInventory";
import Cafebranch from "./stock/Cafebranch";
import CashierMenu from "./cashier/CashierMenu";
import RegisterCashier from "./cashier/RegisterCashier";
import AddProduct from "./cashier/AddProduct";
import Product from "./product/Product";
import OrderDetails from "./product/OrderDetails";
import EditProduct from "./product/EditProduct";
// import Navbar from './navbar';

function App() {
  return (
    <Router>
          <Routes>
            <Route exact path="/" element={<Landingpage />} />
            <Route path="/cashier" element={<Cashier />}></Route>
            <Route path="/stock" element={<Stock />}></Route>
            <Route path="/RegisterStock" element={<RegisterStock />}></Route>
            <Route path="/inventory" element={<Inventory />}></Route>
            <Route path="/Addinventory" element={<Addinventory />}></Route>
            <Route path="/EditInventory/:id" element={<EditInventory />} />
            <Route path="/Cafebranch" element={<Cafebranch />} />
            <Route path="/CashierMenu" element={<CashierMenu />}></Route>
            <Route
              path="/RegisterCashier"
              element={<RegisterCashier />}
            ></Route>
            <Route path="/AddProduct" element={<AddProduct />}></Route>
            <Route path="/Product" element={<Product />}></Route>
            <Route path="/OrderDetails" element={<OrderDetails />}></Route>
            <Route path="/EditProduct/:id" element={<EditProduct />}></Route>
          </Routes>
    </Router>
  );
}

export default App;
