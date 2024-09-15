import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import styles from "./Cafebranch.module.css";

const Cafebranch = () => {
  const [cafeBranch, setCafeBranch] = useState([]);
  const [branch_name, setBranch_name] = useState("");
  const [address_branch, setAddress_branch] = useState("");
  const [contact, setContact] = useState("");
  const [editingBranch, setEditingBranch] = useState(null);
  const [filterText, setFilterText] = useState("");

  // Fetch functions omitted for brevity...
  // Function to handle delete
  const handleDelete = (id) => {
    fetch(`https://api.myteraskopi54.my.id/api/cafe-branch/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        setCafeBranch(cafeBranch.filter((item) => item.id_branch !== id));
      }
    });
  };

  // Function to handle edit
  const handleEdit = () => {
    fetch(`https://api.myteraskopi54.my.id/api/cafe-branch/${editingBranch.id_branch}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        branch_name: editingBranch.branch_name,
        address_branch: editingBranch.address_branch,
        contact: editingBranch.contact,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Edit Success");
          getCafeBranch();
          setEditingBranch(null); // Clear editing state
        } else {
          alert("Edit Failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const filteredItems = Array.isArray(cafeBranch)
    ? cafeBranch.filter((item) =>
        item.branch_name?.toLowerCase().includes(filterText.toLowerCase())
      )
    : [];
  // Function to handle form submission for adding new branch
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://api.myteraskopi54.my.id/api/add-cafe-branch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ branch_name, address_branch, contact }),
    })
      .then((res) => {
        if (res.ok) {
          setBranch_name("");
          setAddress_branch("");
          setContact("");
          getCafeBranch();
        } else {
          console.log("Failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to get cafe branch data
  const getCafeBranch = () => {
    fetch(`https://api.myteraskopi54.my.id/api/cafe-branch`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray) {
          setCafeBranch(data);
        } else {
          console.error("Cafe branch data is not an array");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCafeBranch();
  }, []);

  // Handle row click to edit

  const handleRowClick = (row) => {
    setEditingBranch({
      id_branch: row.id_branch,
      branch_name: row.branch_name,
      address_branch: row.address_branch,
      contact: row.contact,
    });
  };

  const columns = [
    {
      name: "Branch Name",
      selector: (row) => row.branch_name,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address_branch,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className={styles.edit}
            onClick={() => handleRowClick(row)}
          ></button>
          <button
            className={styles.delete}
            onClick={() => handleDelete(row.id_branch)}
          ></button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <header className={styles["navbar-inventory"]}>
        <div className={styles["navbar-content-inventory"]}>
          <h1 className={styles["navbar-title-inventory"]}>Cafe branch</h1>
          <nav className={styles["navbar-links-inventory"]}>
            <Link to="/Inventory" className={styles["navbar-link-inventory"]}>
              Stock
            </Link>
            <Link to="/" className={styles["navbar-link-inventory"]}>
              Logout
            </Link>
          </nav>
        </div>
      </header>

      <div className="bg-for-wrapp">
        <div className={styles["wrap-form"]}>
          <form
            onSubmit={
              editingBranch
                ? (e) => {
                    e.preventDefault();
                    handleEdit();
                  }
                : handleSubmit
            }
            className={styles["formAdd"]}
          >
            <label className={styles["label"]}>Branch Name: </label>
            <input
              type="text"
              className={styles["inputCafe"]}
              value={editingBranch ? editingBranch.branch_name : branch_name}
              onChange={(e) =>
                editingBranch
                  ? setEditingBranch({
                      ...editingBranch,
                      branch_name: e.target.value,
                    })
                  : setBranch_name(e.target.value)
              }
              required
            />
            <label className={styles["label"]}>Address:</label>
            <input
              type="text"
              className={styles["inputCafe"]}
              value={
                editingBranch ? editingBranch.address_branch : address_branch
              }
              onChange={(e) =>
                editingBranch
                  ? setEditingBranch({
                      ...editingBranch,
                      address_branch: e.target.value,
                    })
                  : setAddress_branch(e.target.value)
              }
              required
            />
            <label className={styles["label"]}>Contact:</label>
            <input
              type="number"
              className={styles["inputCafe"]}
              value={editingBranch ? editingBranch.contact : contact}
              onChange={(e) =>
                editingBranch
                  ? setEditingBranch({
                      ...editingBranch,
                      contact: e.target.value,
                    })
                  : setContact(e.target.value)
              }
              required
            />
            <button type="submit" className={styles.addBranch}>
              {editingBranch ? "Update" : "Add"}
            </button>
          </form>
        </div>

        <div className={styles["main-content"]}>
          <div className={styles["bg-stock"]}>
            <div className={styles["search-add"]}>
              <input
                type="text"
                placeholder="Search Branch Name"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className={styles["search-input"]}
              />
            </div>
            <div className={styles["data-table-wrapper"]}>
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
    </div>
  );
};

export default Cafebranch;
