import {server,servers} from '../utils/request'

export function getToken(data){
   return server({
       url:'/oauth/2.0/token',
       method:'POSt',
       params:data
   })
}
export function getjson(data){
    return servers({
        url:'/server_api',
        method:'POSt',
        data
    })
}