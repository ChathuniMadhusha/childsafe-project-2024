//Function for browser onload event
window.addEventListener('load', refreshBrowser);

//Create function for browser onload event
function refreshBrowser() {
    setUserNavbar();
    // setUserProfileDetails();
    //  loggeduser1 = new Object();
    //  old_loggeduser1 = null


}

function setUserNavbar(){

    loggeduser = httpGetRequest("/loguser")
    console.log(loggeduser);
    if (loggeduser != null){
        uname.innerText = loggeduser.username;
        uname1.innerText = loggeduser.username;
        role.innerText = loggeduser.role;
        logimage.src = loggeduser.photopath + loggeduser.photoname;


    }else {
        window.location.replace("/login")
    }
}


function logoutMC(){
    let userconfirm = window.confirm("are you suer want to log out...? \n");
    if(userconfirm){
        window.location.replace("/logout")
    }else {
        if (loggeduser.student != null){
            window.location.href = '/studentview';
        } else if(loggeduser.teacher != null){
            window.location.href = '/teacherview';
        } else if(loggeduser.parent != null){
            window.location.href = '/parentview';
        }else{
            window.location.href = '/dashboard';
        }
    }
}