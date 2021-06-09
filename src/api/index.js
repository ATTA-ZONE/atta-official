import axios from 'axios';

function handleParams (data) {
    return data
}

export function getajax(url,data){
    return new Promise(function(resolve,reject){
        axios.get(url,{
            params:data
        })
            .then(response =>{
                resolve(response.data)
            })
    })
}
export function tokenajax(url,data,params,token){
    return new Promise(function(resolve,reject){
        axios({
            url : url,
            type : params,
            data : data,
            
            headers : {
                "token" : token || ''
            }
        })
        .then(response =>{
            resolve(response.data)
        })
    })
}

export function postajax(url,data){
    return new Promise(function(resolve,reject){
        axios.post(url,handleParams(data))
            .then(response =>{
                resolve(response.data)
            })
    })
}

