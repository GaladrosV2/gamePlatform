import { useState, useEffect } from "react";
import Link from "next/link";
import { Input, Button, Col, Row, Space } from "antd";
import { UserOutlined, MailOutlined, UnlockOutlined } from "@ant-design/icons";

import styles from "../styles/pages/register.module.scss";

const backgrounds = ["bg1.png", "bg2.png", "bg3.png"];

export default function Register() {
	const [backgroundImage, setBackgroundImage] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	useEffect(() => {
		setBackgroundImage(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
	}, []);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { name, email, password } = formData;

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});

			const result = await response.json();

			if (response.ok) {
				window.location.href = "/login";
			} else {
				throw new Error(result.message);
			}
		} catch (error) {
			console.error(error);
			alert("An error occurred while registering. Please try again.");
		}
	};

	return (
		<Row
			className={styles.register}
			style={{ backgroundImage: `url("/${backgroundImage}")` }}
		>
			<Col span={4}>
				<form onSubmit={handleSubmit}>
					<Space
						direction='vertical'
						size='middle'
						style={{ display: "flex" }}
					>
						<Input
							size='large'
							placeholder='Nazwa'
							type='text'
							name='name'
							prefix={<UserOutlined />}
							value={formData.name}
							onChange={handleInputChange}
						/>
						<Input
							size='large'
							placeholder='Email'
							type='email'
							name='email'
							prefix={<MailOutlined />}
							value={formData.email}
							onChange={handleInputChange}
						/>
						<Input.Password
							size='large'
							placeholder='Hasło'
							name='password'
							prefix={<UnlockOutlined />}
							value={formData.password}
							onChange={handleInputChange}
						/>
						<Button
							type='primary'
							block
							htmlType='submit'
						>
							Zarejestruj
						</Button>
						<Button type='link'>
							<Link href='/login'>Masz już konto? Zaloguj się.</Link>
						</Button>
					</Space>
				</form>
			</Col>
		</Row>
	);
}
