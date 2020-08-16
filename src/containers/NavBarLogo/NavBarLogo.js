import React from 'react';
import { Navbar, Image } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import  LogoMinions from "../../assets/imagens/LogoMinions.png"
// import CarrinhoDeCompras from "../../assets/imagens/carrinho-de-compras.png"
import './NavBarLogo.css'

export default () => {

    return(
        <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">
                        <Image className="ImagemHome" src={LogoMinions}/>
                    </Link>    
                    {/* <Link to="/Cart">
                        <Image className="ImagemCarrinho" src={CarrinhoDeCompras}/>                        
                    </Link> 
                    <div className="cartNumber">
                        <strong>2</strong>
                    </div>                     */}
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
    )
}

