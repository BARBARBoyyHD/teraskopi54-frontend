import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterCashier = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [contact, setContact] = useState("");

   const navigate = useNavigate();

   const handleRegister = (e)=>{
    e.preventDefault(); 
    fetch("http://localhost:5000/api/register-cashier",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password, contact})
    })
    .then((res)=>{
        if(res.ok){
            alert("Register Success")
            navigate("/cashier")
        }else{
            alert("Register Failed")
        }
    }).catch((err)=>console.log(err))
   }

    return ( 
        <div>
            <h1>Register Cashier</h1>
            <form action="" onSubmit={handleRegister}>
                <label htmlFor="">Username : </label>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <label>Password : </label>
                <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <label htmlFor="">Contact : </label>
                <input type="number" name="" id="" value={contact} onChange={(e)=>setContact(e.target.value)}/>
                <button type="submit">Submit</button>
                <Link to={"/cashier"}><button>Cancel</button></Link>
            </form>
        </div>
     );
}
 
export default RegisterCashier;