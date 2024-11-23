window.addEventListener("load",ex => {
    let loggeduser = httpGetRequest("/loguser")
    console.log(loggeduser);
    if (loggeduser != null){
        uname.innerText = loggeduser.username;
        uname1.innerText = loggeduser.username;
        role.innerText = loggeduser.role;
        logimage.src = loggeduser.photopath + loggeduser.photoname;


    }else {
        window.location.replace("/login")
    }

})


function logoutMC(){
    let userconfirm = window.confirm("are you suer want to log out...? \n");
    if(userconfirm){
        window.location.replace("/logout")
    }else {
        window.location.replace("/dashboard")
    }
}