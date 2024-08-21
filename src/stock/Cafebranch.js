import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import "./Cafebranch.css";

const Cafebranch = () => {
  const [cafeBranch, setCafeBranch] = useState([]);
  const [branch_name, setBranch_name] = useState("");
  const [address_branch, setAddress_branch] = useState("");
  const [contact, setContact] = useState("");
  const [editingBranch, setEditingBranch] = useState(null);

  // Function to handle delete
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/cafe-branch/${id}`, {
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
    fetch(`http://localhost:5000/api/cafe-branch/${editingBranch.id_branch}`, {
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

  // Function to handle form submission for adding new branch
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/add-cafe-branch", {
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
    fetch(`http://localhost:5000/api/cafe-branch`)
      .then((res) => res.json())
      .then((data) => {
        setCafeBranch(data);
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

  // Define columns for DataTable
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
          <button className="edit" onClick={() => handleRowClick(row)}></button>
          <button
            className="delete"
            onClick={() => handleDelete(row.id_branch)}
          ></button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <header className="navbar-inventory">
        <div className="navbar-content-inventory">
          <h1 className="navbar-title-inventory">Cafe Branch</h1>
          <nav className="navbar-links-inventory">
            <Link to="/" className="navbar-link-inventory">
              Logout
            </Link>
            <Link to="/inventory" className="navbar-link-inventory">
              Inventory
            </Link>
          </nav>
        </div>
      </header>
      <h1>Cafe Branch</h1>
      <div className="form-add">
        <form
          className="form-add"
          onSubmit={
            editingBranch
              ? (e) => {
                  e.preventDefault();
                  handleEdit();
                }
              : handleSubmit
          }
        >
          <label>Branch Name: </label>
          <input
            type="text"
            className="input-cafe"
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
          <label>Address:</label>
          <input
            type="text"
            className="input-cafe"
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
          <label>Contact:</label>
          <input
            type="number"
            className="input-cafe"
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
          <button type="submit" className="add-branch">
            {editingBranch ? "Update" : "Add"}
          </button>
        </form>
      </div>
      <div className="bg-stock-cafe">
        <div className="data-table-wrapper">
          <DataTable
            columns={columns}
            data={cafeBranch}
            pagination
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
};

export default Cafebranch;
