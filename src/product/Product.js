import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component"; // Assuming you're using react-data-table-component

const Product = () => {
  const [product, setproduct] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json()) // Return the parsed JSON data
      .then((data) => {
        if (Array.isArray(data)) {
          // Check if the data is indeed an array
          console.log(data);
          setproduct(data); // Set the product state with the fetched data
        } else {
          console.error("product data is not an array");
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err); // Handle any errors
      });
  }, []);

  const handleDelete = ()=>{

  }
  const handleEdit = ()=>{

  }

  // Filter product by name
  const filteredItems = product ? product.filter(
    (item) =>
      item.product_name &&
      item.product_name.toLowerCase().includes(filterText.toLowerCase())
  ) : [];

  const columns = [
    {
      name: "Product Name",
      selector: (row)=> row.product_name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row)=> row.product_category,
      sortable: true,
    },
    {
      name: "Hot Price",
      selector: (row)=> row.hot_price,
      sortable: true,
      format: (row) => `Rp ${row.hot_price}`,
    },
    {
      name: "Cold Price",
      selector: (row)=> row.cold_price,
      sortable: true,
      format: (row) => `Rp ${row.cold_price}`,
    },
    {
      name: "Large Size Price",
      selector: (row)=> row.large_size_price,
      sortable: true,
      format: (row) => `Rp ${row.large_size_price}`,
    },
    {
      name: "Small Size Price",
      selector: (row)=> row.small_size_price,
      sortable: true,
      format: (row) => `Rp ${row.small_size_price}`,
    },
    {
      name: "Image",
      selector: (row)=> row.image_url,
      cell: (row) => (
        <img
          src={`http://localhost:5000/${row.image_url}`}
        
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
     {
      name: "Action",
      cell: (row) => (
        <div>
          <button className="edit" onClick={() => handleEdit(row)}></button>
          <button
            className="delete"
            onClick={() => handleDelete(row.id_branch)}
          ></button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <header className="navbar-inventory">
        <div className="navbar-content-inventory">
          <h1 className="navbar-title-inventory">Inventory</h1>
          <nav className="navbar-links-inventory">
            <Link to="/" className="navbar-link-inventory">
              Logout
            </Link>
            <Link to="/Cafebranch" className="navbar-link-inventory">
              Cafe Branch
            </Link>
          </nav>
        </div>
      </header>
      <div className="main-content">
        <h1>All Stock</h1>
        <div className="bg-stock">
          <div className="search-add">
            <button className="add-inventory">
              <Link className="link" to={"/Addinventory"}>
                Add Item
              </Link>
            </button>
            <input
              type="text"
              placeholder="Search Inventory"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="data-table-wrapper">
            <DataTable
              columns={columns}
              data={filteredItems}
              pagination
              highlightOnHover
              striped
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
