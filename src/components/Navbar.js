import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/auth/selectors";
import { logout } from "../store/auth/slice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './../css/Navbar.css';

function NavbarComponent() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout({
            meta: {
                onSuccessLogout: handleActionSuccessLogout,
            },
        }));
        if (!isAuthenticated) {
            navigate('/');
        }
    }

    function handleActionSuccessLogout() {
        navigate(`/`);
    }

    useEffect(() => {
        const handleScroll = () => {
            const isTop = window.scrollY > 0;
            setScrolled(isTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <header>
                <nav className={`${scrolled ? 'scrolled' : ''} ${location.pathname === '/' ? 'home-navbar' : 'black-navbar'}`}>
                    <ul className="nav-bar">
                        <li className="nav-logo" ><Link to="/"><img src={require('./gallery.png')} alt="logo" /></Link></li>
                        <input type="checkbox" id="check" />
                        <span className="menu">
                            <li><Link to="/">All Galleries</Link></li>
                            {!isAuthenticated && (
                                <>
                                    <li><Link to="/register">Register</Link></li>
                                    <li><Link to="/login">Login</Link></li>
                                </>
                            )}
                            {isAuthenticated && (
                                <>
                                    <li><Link to="/my-galleries">My Galleries</Link></li>
                                    <li><Link to="/create">Create New Gallery</Link></li>
                                    <li><Link onClick={handleLogout}>Logout</Link></li>
                                </>
                            )}
                            <label htmlFor="check" className="close-menu"><i className="fas fa-times"></i></label>
                        </span>
                        <label htmlFor="check" className="open-menu"><i className="fas fa-bars"></i></label>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default NavbarComponent;



