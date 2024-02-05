import { Outlet} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
	return (
		<>
			<Header />
			<section className="body-section">
				<Outlet />
			</section>
			<Footer />

		</>
	)
};

export default Layout;