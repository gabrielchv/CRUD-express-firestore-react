import React from "react";

function App() {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  function setValue(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name == "Email") setEmail(event.target.value);
    if (event.target.name == "FirstName") setFirstName(event.target.value);
    if (event.target.name == "LastName") setLastName(event.target.value);
  }

  async function createUser() {
    fetch("/api/createuser", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        firstName: firstName,
        lastName: lastName,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
  }
  async function readAllUsers() {
    const response = await fetch("/api/readuser/all", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  async function readUser() {
    const response = await fetch("/api/readuser", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  async function deleteUser() {
    const response = await fetch("/api/deleteuser", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  async function updateUser() {
    const response = await fetch("/api/updateuser", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        firstName: firstName,
        lastName: lastName,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="App">
      <label>Email: </label>
      <input name="Email" onChange={setValue} type="text" />
      <br />
      <label>FirstName: </label>
      <input name="FirstName" onChange={setValue} type="text" />
      <br />
      <label>LastName: </label>
      <input name="LastName" onChange={setValue} type="text" />
      <br />
      <button onClick={createUser}>CreateUser</button>
      <button onClick={readAllUsers}>ReadAllUsers</button>
      <button onClick={readUser}>ReadSpecificUser</button>
      <button onClick={updateUser}>UpdateUser</button>
      <button onClick={deleteUser}>DeleteUser</button>
    </div>
  );
}

export default App;
