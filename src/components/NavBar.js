import { Link } from "react-router-dom";
import AuthStatus from "../components/AuthStatus";

const NavBar = ()=>{
	return (
		<div className="navbar">
			<Link to="/">Home</Link>
			<Link to="/notes">学习笔记</Link>
			<Link to="/blogs">Blogs</Link>
			<Link to="/buddhism">阿含对照</Link>
			<Link to="/lab">Lab</Link>
			<AuthStatus />
		</div>
	);
};

export default NavBar;