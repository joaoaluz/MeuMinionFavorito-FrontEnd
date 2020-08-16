import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";
import { useAppContext } from "../../libs/contextLib/contextLib";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../../libs/hooks/formHooks";


export default function Login() {
    const { userHasAuthenticated } = useAppContext();
    const [fields, handleFieldChange] = useFormFields({//hooks de emaile password
        email: "",
        password: ""
      });
    const history = useHistory();

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    //Verifica e submete para login  
    async function handleSubmit(event) {
        event.preventDefault();
    
        try {
        await Auth.signIn(fields.email, fields.password);
        userHasAuthenticated(true);
        history.push("/");
        } catch (e) {
        alert(e.message);
        }
    }



    return (
        <div className="Login">
        <form onSubmit={handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
                autoFocus
                type="email"
                value={fields.email}
                onChange={handleFieldChange}
            />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
                value={fields.password}
                onChange={handleFieldChange}
                type="password"
            />
            </FormGroup>
            <Button block bsSize="large" disabled={!validateForm()} type="submit">
            Login
            </Button>
        </form>
        </div>
    );
}