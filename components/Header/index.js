import React from "react";
import LogoutButton from "../LogoutButton";

import styles from "./header.module.scss";

const Header = () => {
	return (
		<header className={styles["header"]}>
			<h1 className={styles["header__logo"]}>TGF</h1>
			<nav className={styles["header__nav"]}>
				<LogoutButton />
			</nav>
		</header>
	);
};

export default Header;
