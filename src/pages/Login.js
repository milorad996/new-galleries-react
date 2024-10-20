import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setLoginErrors, successfulLogin } from "../store/auth/slice";
import { useLocation, useNavigate } from "react-router-dom";
import './../css/Login.css';
import { selectLoginErrors, selectSuccessfullyLogged } from "../store/auth/selectors";






function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = useSelector(selectSuccessfullyLogged);
    const loginErrors = useSelector(selectLoginErrors);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login(credentials));


        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (loginErrors === null && isLoggedIn === "Successfully logged in") {
            navigate("/");
        }
    }, [navigate, isLoggedIn, loginErrors]);

    useEffect(() => {
        return () => {
            dispatch(setLoginErrors(null));
        };
    }, [dispatch, isLoggedIn]);
    useEffect(() => {
        return () => {
            dispatch(successfulLogin(""));
        };
    }, [dispatch, location]);


    const handleClickButton = () => {
        navigate("/register");
    }

    return (
        <div>
            <form
                className="form-container-login"
                onSubmit={handleSubmit}
            >
                <h2>- Login -</h2>
                <input
                    className={`input-field-login ${loginErrors?.message ? 'input-error' : ''}`}
                    required
                    value={credentials.email}
                    placeholder="Email"
                    autoComplete="username"
                    onChange={({ target }) =>
                        setCredentials({ ...credentials, email: target.value })
                    }
                />
                {loginErrors?.message && <p className="error-message">{loginErrors.message}</p>}
                <input
                    className={`input-field-login ${loginErrors?.message ? 'input-error' : ''}`}
                    required
                    type="password"
                    value={credentials.password}
                    autoComplete="current-password"
                    placeholder="Password"
                    onChange={({ target }) =>
                        setCredentials({ ...credentials, password: target.value })
                    }
                />
                {loginErrors?.message && <p className="error-message">{loginErrors.message}</p>}
                <button className="login-button">SIGN IN</button>
                <button onClick={handleClickButton} className="login-create-account-button" >CREATE ACCOUNT</button>

            </form>
        </div >
    );
}

export default Login;