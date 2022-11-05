import React, { useState } from "react";
import axios from "axios";
import Form from "./components/Form";
import schema from "./validation/formSchema";
import * as yup from "yup";
import "./App.css";

const initialFormValues = {
  username: "",
  password: "",
  email: "",
  tos: false,
};

const initialFormErrors = {
  username: "",
  password: "",
  email: "",
  tos: false,
};

function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [users, setUsers] = useState([]);

  const submitForm = () => {
    axios
      .post("https://reqres.in/api/users", formValues)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
      .finally(() => setFormValues(initialFormValues));
  };

  const onChange = (name, value) => {
    validate(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="App">
      <Form
        values={formValues}
        change={onChange}
        errors={formErrors}
        submit={submitForm}
      />
      {users.map((user) => {
        <div key={user.id}>
          <p>{user.createdAt}</p>
          <p>{user.email}</p>
        </div>;
      })}
    </div>
  );
}

export default App;
