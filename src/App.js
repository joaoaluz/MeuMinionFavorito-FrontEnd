import './App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import React, { useState, useEffect } from "react";
import { AppContext } from "./libs/contextLib/contextLib";
import { Auth } from "aws-amplify";
import NavBarLogo from './containers/NavBarLogo/NavBarLogo';


export default ()=> {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();
  

  useEffect(() => {
    onLoad();
  }, []);
  
  //ao carregar a pagina
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
   
    setIsAuthenticating(false);
  }

  //apos o logouat leva par tela inicial
  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);
    alert('Deslogado com sucesso!');
    history.push("/");

  }

  return(
    !isAuthenticating &&    
    <div className="App container">
    {/* Inicio da Navbar */}
        <Navbar fluid collapseOnSelect>                        
            <NavBarLogo /> {/* NavBar com carrinho e logo do App */}
            <Navbar.Collapse>
              <Nav pullRight>
                { isAuthenticated
                  ? <NavItem onClick={ handleLogout }>Sair</NavItem>
                  : <>
                      <LinkContainer to="/signup">
                        <NavItem>Cadastre-se</NavItem>
                      </LinkContainer>
                      <LinkContainer to="/login">
                        <NavItem>Login</NavItem>
                      </LinkContainer>    
                    </>
                }                
              </Nav>
            </Navbar.Collapse>
            {/* Fim Controled e acesso  */}
        </Navbar>
     {/* Fim da Navbar */}
     
     {/* Container de rotas da aplicação*/} 
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes/>
      </AppContext.Provider>

    </div>      
    
  )
}