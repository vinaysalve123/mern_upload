import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
// import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(null);

  const fetchActors= async()=>{
    // await axios.get("http://localhost:5001/actors")  //Fetched by using 'axios'
    // .then(response=>setUsers(response.data))
    // .catch(error =>console.log(error));    

    const res = await fetch("http://localhost:5001/actors");  //Fetched using 'fetch'
    const data = await res.json();
    setUsers(data);
    // console.log(data);
  }

  const handleSubmit= async(event)=>{
    event.preventDefault();
    console.log(name);

    if(index === null){
      // setUsers([...users, name]); //Add new user
      
      // axios.post("http://localhost:5001/actors", {name})
      // .then((res)=> console.log(res))
      // .catch(error=>console.log(error));

      await fetch("http://localhost:5001/actors", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({name})
      })
    }
    else{
      // const toUpdate = [...users];
      // toUpdate[index] = name;
      // setUsers(toUpdate);
      // setIndex(null);

      // axios.update(`http://localhost:5001/actors/${index}`)
      // axios.put(`http://localhost:5001/actors/${index}`, {name})
      // .then((res)=> console.log(res))
      // .catch(error=>console.log(error));


      await fetch(`http://localhost:5001/actors/${index}`, {
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({name})
      })

      setIndex(null);
    }

    setName("");
    fetchActors();
  }

  const deleteMe= async(id)=>{
    // const updatedUsers = users.filter((user,ind)=> ind !== id);
    // setUsers(updatedUsers);

    // axios.delete(`http://localhost:5001/actors/${id}`)
    // .then(()=> fetchActors())
    // .catch(error=>console.log(error));

    await fetch(`http://localhost:5001/actors/${id}`, {
      method: "DELETE"
    })
    await fetchActors();
  }

  useEffect(()=>{
    fetchActors()
  },[index]);
  

  return (
    <>
      <div className="text-center container mt-4">
        <form onSubmit={handleSubmit}>
          <h1>🎭 Actors List</h1>
          <input required type="text" className='form-control'  placeholder='Enter SOmething...' value={name} onChange={(e)=>setName(e.target.value)}/>

          <div className="formButton "><button className='btn btn-outline-primary'>{index === null ? "🥳 Add" : "✅ Update"}</button></div>

          {/* bootstrap styled */}
          {/* <div class="input-group mb-3">
            <input type="text" className="form-control" placeholder="Recipient’s username" aria-label="Recipient’s username" aria-describedby="button-addon2" />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
          </div> */}

        </form>


        {/* <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="danger" type="submit">
            Submit
          </Button>
        </Form> */}

      </div>

      <div className='text-center ul'>
        <ul>
          {
            users.map((user,ind)=>(
              <li key={ind} type="none" >
                <div className='result'>
                  <div className="name">{user.name}</div>
                  <div className="buttons">
                    {/* <button className="btn btn-outline-warning" type="button" id="button-addon1" onClick={()=> {setName(user);setIndex(ind);}}>🔃</button>
                    <button className="btn btn-outline-danger" type="button" id="button-addon2" onClick={()=>deleteMe(ind)}>👋</button> */}
                    <button className="btn btn-outline-warning" type="button" id="button-addon1" onClick={()=> {setName(user.name);setIndex(user._id)}}>🔃</button>
                    <button className="btn btn-outline-danger" type="button" id="button-addon2" onClick={()=>deleteMe(user._id)}>👋</button>
                  </div>                  
                </div>                
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default App
