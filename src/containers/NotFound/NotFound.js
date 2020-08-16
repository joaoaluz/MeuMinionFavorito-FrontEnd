import React from 'react';
import './NotFound.css';
import MinionPageNotFound from "../../assets/imagens/PageNotFound.jpg"
import { Image } from 'react-bootstrap';

//Pagina para link invalido
export default ()=>
    <div className="NotFound">
        <h1>Página não encontrada!</h1>
        <Image src={MinionPageNotFound} responsive />
    </div>