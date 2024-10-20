import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './../css/Register.css';
import { register, setRegisterErrors, setSuccessfullyCreatedUser } from "../store/auth/slice";
import { selectRegisterErrors, selectSuccessfullyCreatedUser } from "../store/auth/selectors";
import { useLocation, useNavigate } from "react-router-dom";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isCreatedUser = useSelector(selectSuccessfullyCreatedUser);
    const registerErrors = useSelector(selectRegisterErrors);


    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        terms_of_service: false,
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(register(userData));
        } catch (e) {
            alert("invalid credentials");
        }
    };
    useEffect(() => {
        if (registerErrors === null && isCreatedUser === "User created successfully") {
            navigate("/login");
        }
    }, [navigate, isCreatedUser, registerErrors]);


    useEffect(() => {
        return () => {
            dispatch(setRegisterErrors(null));
        };
    }, [dispatch, isCreatedUser]);
    useEffect(() => {
        return () => {
            dispatch(setSuccessfullyCreatedUser(""));
        };
    }, [dispatch, location]);

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>- Register -</h2>
                <input
                    className={`input-field-register ${registerErrors?.first_name ? 'input-error' : ''}`}
                    minLength={2}
                    value={userData.first_name}
                    autoComplete="username"
                    placeholder="First name"
                    onChange={({ target }) => setUserData({ ...userData, first_name: target.value })}
                />
                {registerErrors?.first_name && <p className="error-message">{registerErrors.first_name}</p>}

                <input
                    className={`input-field-register ${registerErrors?.last_name ? 'input-error' : ''}`}
                    required
                    minLength={2}
                    value={userData.last_name}
                    placeholder="Last name"
                    onChange={({ target }) => setUserData({ ...userData, last_name: target.value })}
                />
                {registerErrors?.last_name && <p className="error-message">{registerErrors.last_name}</p>}

                <input
                    className={`input-field-register ${registerErrors?.email ? 'input-error' : ''}`}
                    required
                    value={userData.email}
                    placeholder="Email"
                    autoComplete="username"
                    onChange={({ target }) => setUserData({ ...userData, email: target.value })}
                />
                {registerErrors?.email && <p className="error-message">{registerErrors.email}</p>}

                <input
                    className={`input-field-register ${registerErrors?.password ? 'input-error' : ''}`}
                    required
                    type="password"
                    value={userData.password}
                    placeholder="Password"
                    autoComplete="new-password"
                    onChange={({ target }) => setUserData({ ...userData, password: target.value })}
                />
                {registerErrors?.password && <p className="error-message">{registerErrors.password}</p>}

                <input
                    className={`input-field-register ${registerErrors?.password_confirmation ? 'input-error' : ''}`}
                    required
                    type="password"
                    value={userData.password_confirmation}
                    autoComplete="new-password"
                    placeholder="Confirm Password"
                    onChange={({ target }) => setUserData({ ...userData, password_confirmation: target.value })}
                />
                {registerErrors?.password_confirmation && <p className="error-message">{registerErrors.password_confirmation}</p>}

                <label className="checkbox-label-register" htmlFor="checkbox">By creating an account you agree to our <a href="#" className="terms-link">Terms of Service</a>.</label>
                <input
                    className={`input-field-checkbox-register ${registerErrors?.terms_of_service ? 'input-error' : ''}`}
                    required
                    id="checkbox"
                    type="checkbox"
                    value={userData.terms_of_service}
                    onChange={({ target }) => setUserData({ ...userData, terms_of_service: target.checked })}
                />


                <button className="register-button">SIGN UP</button>
            </form>
        </div>
    )
}

export default Register;
