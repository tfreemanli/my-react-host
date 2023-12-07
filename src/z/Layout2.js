import { Outlet, Link } from "react-router-dom";

const Layout2 = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/z/">Z1</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout2;