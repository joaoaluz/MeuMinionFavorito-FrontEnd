import React, { useEffect} from "react";
import "./Home.css";
import { Image, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import {listProducts} from '../../redux/actions/ProductActions'
import ImageCarregando from '../../assets/imagens/carregando.png'
import {apiSendEmail} from '../../libs/api/api'
import { useAppContext } from "../../libs/contextLib/contextLib";

export default (props) =>{
  
    //chamando a lsit de produtos
    const { isAuthenticated } = useAppContext();
    const productList = useSelector((state) => state.productList);
    const { products, loading, error} = productList;
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(listProducts());
      return () => {        
        //
      }
    }, [])
    



    async function SendEmail(productName, productValue) {      
        const response =  await apiSendEmail.get('');        
        alert(response.data)
        }             

  
    return(//verifica se ja carregou os itens, se sim, mostra os dados
        loading?<>
        Carregando..
        <Image src={ImageCarregando} responsive/>
        </> :
        error?<>{error}</>: 
        <div className="products">
        {products.map(product =>(                       
        <li key={product.createAt}>
            <Image className="product-image" src={ product.productImage } responsive/>
            <div className="product-name">
                {product.productName}
            </div>
            <div className="product-brand">{product.productDescription}</div>
            <div className="product-price"> R$ {product.productValue}</div>        
            <div className="product-Button" >
              {isAuthenticated ?
              <>
                  <Button onClick={SendEmail} >Reservar agora!</Button> 
              </>:              
              <div className="alerta-nao-logado">
              <p>Logue para poder fazer uma reserva!</p>
              </div>              
              
              }
               
            </div>                        
        </li>                    
        ))}                                      
        </div> 
      )
    }      
 
