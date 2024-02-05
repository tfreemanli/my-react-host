import { Link } from "react-router-dom";

const Home =  () => {

	return (
		<div className="row body-section flex-v-middle home-bg">
			<div className="home-text-container">
				<p className="home-text-hdr1">Knowledge Base 101</p>
				<p className="home-text-normal">Wise man said, "An old photo tells more than a good memory."</p>
				<Link to="./notes" className="home-btn1">My Notes &gt;&gt;</Link>
				<Link to="./blogs" className="home-btn2">Blogs &gt;&gt;</Link>
			</div>	
			<div className="home-img"></div>
		</div>
	);

}

export default Home;