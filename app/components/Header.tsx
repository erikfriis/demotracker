import React from "react"

import HeaderCss from "./Header.module.css"

const Header: React.FC = () => {
	return(
		<div className={HeaderCss.headerWrapper}>
			<h1 className={HeaderCss.logo}>demotracker</h1>
			<p className={HeaderCss.text}>version control for music</p>
		</div>
	)
}

export default Header