import axios from 'axios';

const apiGetProdutos = axios.create({
    baseURL: 'https://q53jks9p42.execute-api.us-east-2.amazonaws.com/dev/products'
})

const apiSendEmail = axios.create({
    baseURL: 'https://q53jks9p42.execute-api.us-east-2.amazonaws.com/dev/send-email'
})

export  {apiGetProdutos, apiSendEmail};