import React, {Fragment, useContext, useState} from 'react';
import Axios from "axios";
import Header from "../components/Header";
import AuthAPI from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";


const LoginPage = ( {history}) => {

    const { setIsAthenticated } = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setCredentials({...credentials, [name]: value});
    }

    function setAxiosToken(token) {
        Axios.defaults.headers["Authorization"] = "Bearer " + token;
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await AuthAPI.authenticate(credentials);
            setError("");
            onLogin(true)
            history.replace("/admin")
            setIsAuthenticated(true);

        } catch (error) {
            console.log(error.response)
            setError("indentifiants invalid");
        }
    }


    return (
        <Fragment>
            <Header name="Connexion"/>
            <div className="col-lg-8">
                <div className="containner">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Adresse email</label>
                            <input value={credentials.username}
                                   onChange={handleChange}
                                   type="email"
                                   className={"form-control" + (error && " is-invalid")}
                                   placeholder="email"
                                   name="username"
                                   id="username"
                            />
                            {error && <p className="invalid-feedback">{error}</p>}

                            <label htmlFor="password">Mot de passe</label>
                            <input value={credentials.password}
                                   onChange={handleChange}
                                   type="password"
                                   className={"form-control" + (error && " is-invalid")}
                                   placeholder="Mot de passe"
                                   name="password"
                                   id="password"
                            />
                            {error && <p className="invalid-feedback">{error}</p>}
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success">cnnexion</button>
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default LoginPage;
