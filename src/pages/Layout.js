import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
		  <li>
			IgottaTellya
		    <ul>
				<li>Hahahahah</li>
				<li>Hahahahah</li> 
			</ul>
		  </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/z/">Z1</Link>
          </li>
        </ul>
      </nav>

      <Outlet />

	  T_T T_T
	  
    </>
  )
};

export default Layout;