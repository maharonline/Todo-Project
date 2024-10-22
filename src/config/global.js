import { message } from "antd"

window.toastify=(msg,type)=>{
    switch(type){
        case "success" : message.success(msg);break
        case "info" : message.info(msg);break
        case "error" : message.error(msg);break
        case "warning" : message.warning(msg);break
        default:message.info(msg); break

    }
}