
import React from "react";

import FooterCss from "./Footer.module.css"

const Footer: React.FC = () => {
	return (
		<div className={FooterCss.container}>
			<div className={FooterCss.text}>
			 <div className={FooterCss.line}></div>
			 <div className={FooterCss.textContent}> demotracker</div>
<div className={FooterCss.line}></div>
</div>
		</div>
	)
}

export default Footer