import axios from 'axios';
import { FormEventHandler, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [validated, setValidated] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const canSubmit = email.length > 0 && password.length > 0;
	const navigate = useNavigate();
	const handleSubmit: FormEventHandler = async (event) => {
		event.preventDefault();
		try {
			const resp = await axios.post<{ token: string }>(
				'http://localhost:8000/login',
				{
					email,
					password,
				}
			);
			const { token } = resp.data;
			localStorage.setItem('token', token);
			navigate('/');
		} catch (err) {
			setValidated(true);
		}
	};

	return (
		<Stack
			className="container-md justify-content-center align-items-center flex-fill"
			gap={3}
		>
			<h1>Login</h1>
			<Form onSubmit={handleSubmit} style={{ minWidth: '400px' }}>
				<Form.Group className="w-100 mb-3" controlId="formHorizontalEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Email"
						onChange={(event) => setEmail(event.target.value)}
						value={email}
						isInvalid={validated}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Wrong email or password
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="w-100 mb-3" controlId="formHorizontalPassword">
					<Form.Label sm={2}>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={(event) => setPassword(event.target.value)}
						value={password}
						isInvalid={validated}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Wrong email or password
					</Form.Control.Feedback>
				</Form.Group>

				<Row className="mt-3">
					<Col sm={6}>
						<Button className="w-100" onClick={() => navigate('/register')}>
							Create an account
						</Button>
					</Col>
					<Col sm={6}>
						<Button className="w-100" type="submit" disabled={!canSubmit}>
							Sign in
						</Button>
					</Col>
				</Row>
			</Form>
		</Stack>
	);
}

export default Login;
