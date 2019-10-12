import axios from 'axios'

const server =axios.create({
    baseURL:'/baidu_Token',
    timeout:6000
})
const servers =axios.create({
    baseURL:'/baidu_Json',
    timeout:6000
})

export{
    server,
    servers
}
// /server_api
// /server_api