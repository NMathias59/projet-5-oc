import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";

import Header from "../components/Header";
import Field from "../components/form/Field";
import Axios from "axios";



const SignInPage = props => {

    const [user, setUser] = useState({
        "email": "",
        "password":"",
        "name":"",
        "ban": true
    });

    const [errors,setErrors]= useState({
        "email": "",
        "password":"",
        "name":"",
        "ban":""
    })

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await Axios.post("http://127.0.0.1:8000/api/users", user);
            window.alert("enregistrement reussit")
            props.history.replace("/#")
        }catch (error){
            console.log(error.response)
        }
    }

    return (
        <Fragment>
            <Header name="Creation de compte"/>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <Field name="email"
                           label="AdresseEmail"
                           placeholder="Votre adresse email"
                           value={user.email}
                           onChange={handleChange}
                           error={errors.email}
                    />
                    <Field name="password"
                           label="Mot de passe"
                           placeholder="Votre mot de passe"
                           value={user.password}
                           onChange={handleChange}
                           error={errors.password}
                           type="password"
                    />

                    <Field name="name"
                           label="Pseudo"
                           placeholder="Votre pseudo ou nom"
                           value={user.name}
                           onChange={handleChange}
                           error={errors.name}
                    />

                    <div className="form-group ">
                        <button type="submit" className="btn btn-success">Eregistrer</button>
                        <Link to="/" className="btn">Retour a la page d'acceuil</Link>
                    </div>
                </form>
            </div>
        </Fragment>);
};

export default SignInPage;
