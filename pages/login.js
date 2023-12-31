import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
import { UnlockOutlined, MailOutlined } from "@ant-design/icons";
import { Input, Button, Col, Row, Space } from "antd";
import Link from "next/link";

import styles from "../styles/pages/login.module.scss";

const backgrounds = ["bg1.png", "bg2.png", "bg3.png"];

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [backgroundImage, setBackgroundImage] = useState("");
	const router = typeof window !== "undefined" ? useRouter() : null;

	useEffect(() => {
		setBackgroundImage(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (result.error) {
			alert(result.error);
			console.log(result.error);
		} else {
			const session = await getSession();
			if (session) {
				router.push("/");
			}
		}
	};

	return (
		<Row
			className={styles.login}
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
							placeholder='Email'
							type='email'
							prefix={<MailOutlined />}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							size='large'
							placeholder='Hasło'
							type='password'
							prefix={<UnlockOutlined />}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							type='primary'
							block
							htmlType='submit'
						>
							Zaloguj
						</Button>
						<Button type='link'>
							<Link href='/register'>Nie masz konta? Zarejestruj się</Link>
						</Button>
					</Space>
				</form>
			</Col>
		</Row>
	);
}
