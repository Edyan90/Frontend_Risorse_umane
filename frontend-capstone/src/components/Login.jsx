import { useState } from "react";
import { Alert, Button, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const registerFetch = async () => {
    try {
      const resp = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await resp.json();
      if (resp.ok) {
        console.log(data);
        setError(false);
        setSuccess(true);
        dispatch({ type: "LOGIN", payload: data.token });
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else throw new Error(data.message);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerFetch();
  };
  return (
    <Row className="text-start">
      <Form onSubmit={(e) => handleSubmit(e)}>
        {hasError ? <Alert variant="danger">{errorMessage}</Alert> : ""}
        {success ? <Alert variant="primary">Login done</Alert> : ""}
        <Form.Group className="mb-3 w-50 " controlId="email">
          <Form.Label className="">Username</Form.Label>
          <Form.Control
            className="bg-primary-subtle"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 w-50" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="bg-primary-subtle"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Accedi
        </Button>
      </Form>
    </Row>
  );
};

export default Login;
