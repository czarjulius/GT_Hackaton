$(document).ready(function() {
    let isToken = localStorage.getItem('token');

    if(isToken){
        return true

    }else{
        location.href = "../Hackaton_Frontend/USER  DASHBOARD/Login_v3/index.html"
    }
})