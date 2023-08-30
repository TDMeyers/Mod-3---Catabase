import { Link } from "react-router-dom";
import { addUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";




function Navbar() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const logout = () => {
        localStorage.removeItem("token")
        dispatch(addUser({}))
    };

    return (
        <ul id='navbar'>
            <li>
                <Link to="/">
                    <img src="" alt="React Icon" id="icon" />
                </Link>
            </li>
            {user.username ?
                <>
                    <li style={{ color: "white" }}>Welcome {user.username}!</li>
                    <li onClick={logout}>
                        <Link to="/posts">Logout</Link>
                    </li>
                    <li>
                        <Link to='/profile'>Profile</Link>
                    </li>
                </>
                :
                <>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </>
            }
        </ul>
    );
}

export default Navbar;