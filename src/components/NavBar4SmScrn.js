import { Link } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import { useState } from "react";

const NavBar4SmScrn = ()=>{
	const [navMenu, setNavMenu] = useState(false);
	return (
		<div className="navbar-col">
			<div className="navbar-col-menu"
			 onClick={()=> setNavMenu(true) } ></div>
			<div className={ navMenu ? "navbar-col-items showMeBox" : "navbar-col-items hideMe" }>
				<AuthStatus />
				<Link to="/">Home</Link>
				<Link to="/notes">学习笔记</Link>
				<Link to="/blogs">Blogs</Link>
				<Link to="/buddhism">阿含对照</Link>
				<Link to="/lab">Lab</Link>
			</div>
		</div>
	);
};

export default NavBar4SmScrn;