import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Input, Button, Col, Row, Space } from "antd";
import { UserOutlined, MailOutlined, UnlockOutlined } from "@ant-design/icons";

import styles from "../styles/pages/register.module.scss";

export default function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { email, password, name } = formData;

		try {
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
				name,
			});

			if (!result.error) {
				window.location.href = "/";
			} else {
				alert(result.error);
			}
		} catch (error) {
			console.error(error);
			alert("An error occurred while registering. Please try again.");
		}
	};

	return (
		<Row className={styles.register}>
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
						<Input
							size='large'
							placeholder='Hasło'
							type='password'
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
							<Link href='/login'>Już masz konto? Zaloguj się</Link>
						</Button>
					</Space>
				</form>
			</Col>
		</Row>
	);
}
