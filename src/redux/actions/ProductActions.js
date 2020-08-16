import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCESS, PRODUCT_LIST_FAIL } from "../types/productTypes";
import {apiGetProdutos} from '../../libs/api/api'

const listProducts = () => async (dispatch) => {
    try {
        //chama produtos da api
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} =  await apiGetProdutos.get('');// apos pegar os dados, retornar eles
        dispatch({type: PRODUCT_LIST_SUCESS, payload: data})    
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message}) //se der erro
    }
   
}

export { listProducts }