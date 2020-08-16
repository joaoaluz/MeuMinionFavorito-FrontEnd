import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import{HelpBlock, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import { useAppContext } from "../../libs/contextLib/contextLib";
import { useFormFields } from "../../libs/hooks/formHooks";
import './SignUp.css'
import { Auth } from "aws-amplify";


export default ()=>{

    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
      });
    
    const history = useHistory();
    const [newUser, setNewUser]  = useState(null);
    const { userHasAuthenticated } = useAppContext();

    function validateForm() {
        return (
          fields.email.length > 0 &&
          fields.password.length > 0 &&
          fields.password === fields.confirmPassword
        );
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();    
    
        try {
            const newUser = await Auth.signUp({
              username: fields.email,
              password: fields.password,
            });            

            setNewUser(newUser);

            } catch (e) {
            alert(e);
            }
    
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();
        
        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode);
            await Auth.signIn(fields.email, fields.password);
            alert("Cadastro realizado com sucesso!");
            userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            alert(e);
        }      
      }

    function renderConfirmationForm() {
        return (
          <form onSubmit={handleConfirmationSubmit}>
            <FormGroup controlId="confirmationCode" bsSize="large">
              <ControlLabel>Código de confirmação</ControlLabel>
              <FormControl
                autoFocus
                type="tel"
                onChange={handleFieldChange}
                value={fields.confirmationCode}
              />
              <HelpBlock>Verifique seu e-mail para pegar o código.</HelpBlock>
            </FormGroup>
            <Button block type="submit" bsSize="large" disabled={!validateConfirmationForm()} > Verificar </Button>
          </form>
        );
      }
    
      function renderForm() {
        return (
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
              <ControlLabel>Senha</ControlLabel>
              <FormControl
                type="password"
                value={fields.password}
                onChange={handleFieldChange}
              />
            </FormGroup>
            <FormGroup controlId="confirmPassword" bsSize="large">
              <ControlLabel>Confirmar senha</ControlLabel>
              <FormControl
                type="password"
                onChange={handleFieldChange}
                value={fields.confirmPassword}
              />
            </FormGroup>
            <Button block type="submit" bsSize="large" disabled={!validateForm()} > Signup </Button>
          </form>
        );
      }
    
      return (
        <div className="Signup">
          {newUser === null ? renderForm() : renderConfirmationForm()}
        </div>
      );
    }  
