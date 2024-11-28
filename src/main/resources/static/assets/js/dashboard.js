//Function for browser onload event
window.addEventListener('load', refreshBrowser);

//Create function for browser onload event
function refreshBrowser() {
    setUserNavbar();
    setUserProfileDetails();
     loggeduser1 = new Object();
     old_loggeduser1 = null


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

function setUserProfileDetails(){


     loggeduser = httpGetRequest("/loguser")
    if (loggeduser != null){
        uname2.innerText = loggeduser.username;
        role1.innerText = loggeduser.role;
        logimage1.src = loggeduser.photopath + loggeduser.photoname;

        if (loggeduser.student != null){
            vfname.innerText = loggeduser.student.first_name;
            vlname.innerText = loggeduser.student.last_name;
            vaddress.innerText = loggeduser.student.address;
            vmobile.innerText = loggeduser.student.email;
            vemail.innerText = loggeduser.student.mobile_number;
        }
        else if(loggeduser.teacher != null){
            vfname.innerText = loggeduser.teacher.first_name;
            vlname.innerText = loggeduser.teacher.last_name;
            vaddress.innerText = loggeduser.teacher.address;
            vmobile.innerText = loggeduser.teacher.email;
            vemail.innerText = loggeduser.teacher.mobile_number;
        }
        else if(loggeduser.parent != null){
            vfname.innerText = loggeduser.parent.first_name;
            vlname.innerText = loggeduser.parent.last_name;
            vaddress.innerText = loggeduser.parent.address;
            vmobile.innerText = loggeduser.parent.email;
            vemail.innerText = loggeduser.parent.mobile_number;
        }else {
            $('.hide-li').hide();
            // Set the data-bs-target attribute dynamically
            const changePasswordButton = document.querySelector('[data-bs-target="#profile-change-password"]');
            if (changePasswordButton) {
                changePasswordButton.click(); // Simulate a click on the button
            }
        }

    }
}


function refillProfile(){
    loggeduser1 = httpGetRequest("/loguser");
    old_loggeduser1 = httpGetRequest("/loguser");


    if (loggeduser1 != null && loggeduser1.student != null){
        logimage2.src = loggeduser1.photopath + loggeduser1.photoname;
        fName.value = loggeduser1.student.first_name;
        lName.value = loggeduser1.student.last_name;
        address.value = loggeduser1.student.address;
        Phone.value = loggeduser1.student.mobile_number;
        Email.value = loggeduser1.student.email;
    }
    else if(loggeduser1 != null && loggeduser1.teacher != null){
        logimage2.src = loggeduser1.photopath + loggeduser1.photoname;
        fName.value = loggeduser1.teacher.first_name;
        lName.value = loggeduser1.teacher.last_name;
        address.value = loggeduser1.teacher.address;
        Phone.value = loggeduser1.teacher.mobile_number;
        Email.value = loggeduser1.teacher.email;
    }
    else if(loggeduser1 != null && loggeduser1.parent != null){
        logimage2.src = loggeduser1.photopath + loggeduser1.photoname;
        fName.value = loggeduser1.parent.first_name;
        lName.value = loggeduser1.parent.last_name;
        address.value = loggeduser1.parent.address;
        Phone.value = loggeduser1.parent.mobile_number;
        Email.value = loggeduser1.parent.email;
    }
}


// Common function for validating and updating first name
function validateAndUpdateFirstName(entity, entityName) {

    if (fName.value !== "") {
        const namePattern = /^[A-Z][a-z]{2,}(?: [A-Z][a-z]*)*$/;

        if (namePattern.test(fName.value)) {
            entity.first_name = fName.value;

            // Compare with the old logged user entity
            if (
                old_loggeduser1 !== null &&
                old_loggeduser1[entityName]?.first_name !== entity.first_name
            ) {
                fName.style.borderBottom = "2px solid orange";
            } else {
                fName.style.borderBottom = "2px solid green";
            }
        } else {
            entity.first_name = null;
            fName.style.borderBottom = "2px solid red";

        }
    } else {
        entity.first_name = null;
        fName.style.borderBottom = "2px solid red";

    }
}

// Main function for handling user validation in first name
function userFN() {
    if (loggeduser1.student !== null) {
        validateAndUpdateFirstName(loggeduser1.student, "student");
    } else if (loggeduser1.teacher !== null) {
        validateAndUpdateFirstName(loggeduser1.teacher, "teacher");
    } else if (loggeduser1.parent !== null) {
        validateAndUpdateFirstName(loggeduser1.parent, "parent");
    }
}

// Common function for validating and updating last name
function validateAndUpdateLastName(entity, entityName) {
    if (lName.value !== "") {
        const namePattern = /^[A-Z][a-z]{2,}(?: [A-Z][a-z]*)*$/;

        if (namePattern.test(lName.value)) {
            entity.last_name = lName.value;

            // Compare with the old logged user entity
            if (
                old_loggeduser1 !== null &&
                old_loggeduser1[entityName]?.last_name !== entity.last_name
            ) {
                lName.style.borderBottom = "2px solid orange";
            } else {
                lName.style.borderBottom = "2px solid green";
            }
        } else {
            entity.last_name = null;
            lName.style.borderBottom = "2px solid red";

        }
    } else {
        entity.last_name = null;
        lName.style.borderBottom = "2px solid red";

    }
}

function userLN(){

    if (loggeduser1.student !== null) {
        validateAndUpdateLastName(loggeduser1.student, "student");
    } else if (loggeduser1.teacher !== null) {
        validateAndUpdateLastName(loggeduser1.teacher, "teacher");
    } else if (loggeduser1.parent !== null) {
        validateAndUpdateLastName(loggeduser1.parent, "parent");
    }

}


// Common function for validating and updating Address
function validateAndUpdateAddress(entity, entityName) {
    if (address.value !== "") {
        const namePattern = /^[A-Z][a-z]{4,}(?: [A-Z][a-z]*)*/;

        if (namePattern.test(address.value)) {
            entity.address = address.value;

            // Compare with the old logged user entity
            if (
                old_loggeduser1 !== null &&
                old_loggeduser1[entityName]?.address !== entity.address
            ) {
                address.style.borderBottom = "2px solid orange";
            } else {
                address.style.borderBottom = "2px solid green";
            }
        } else {
            entity.address = null;
            address.style.borderBottom = "2px solid red";

        }
    } else {
        entity.address = null;
        address.style.borderBottom = "2px solid red";

    }
}


function userAddress(){
    if (loggeduser1.student !== null) {
        validateAndUpdateAddress(loggeduser1.student, "student");
    } else if (loggeduser1.teacher !== null) {
        validateAndUpdateAddress(loggeduser1.teacher, "teacher");
    } else if (loggeduser1.parent !== null) {
        validateAndUpdateAddress(loggeduser1.parent, "parent");
    }

}

// Common function for validating and updating Phone
function validateAndUpdatePhone(entity, entityName) {
    if (Phone.value !== "") {
        const namePattern = /^[0][7][0,1,2,4,5,6,7,8][0-9]{7}$/;

        if (namePattern.test(Phone.value)) {
            entity.mobile_number = Phone.value;

            // Compare with the old logged user entity
            if (
                old_loggeduser1 !== null &&
                old_loggeduser1[entityName]?.mobile_number !== entity.mobile_number
            ) {
                Phone.style.borderBottom = "2px solid orange";
            } else {
                Phone.style.borderBottom = "2px solid green";
            }
        } else {
            entity.mobile_number = null;
            Phone.style.borderBottom = "2px solid red";

        }
    } else {
        entity.mobile_number = null;
        Phone.style.borderBottom = "2px solid red";

    }
}

function userPhone(){
    if (loggeduser1.student !== null) {
        validateAndUpdatePhone(loggeduser1.student, "student");
    } else if (loggeduser1.teacher !== null) {
        validateAndUpdatePhone(loggeduser1.teacher, "teacher");
    } else if (loggeduser1.parent !== null) {
        validateAndUpdatePhone(loggeduser1.parent, "parent");
    }
}

// Common function for validating and updating Mail
function validateAndUpdateMail(entity, entityName) {
    if (Email.value !== "") {
        const namePattern = /^[a-z0-9]{3,}@[a-z]{3,}.[a-z]{2,3}$/;

        if (namePattern.test(Email.value)) {
            entity.email = Email.value;

            // Compare with the old logged user entity
            if (
                old_loggeduser1 !== null &&
                old_loggeduser1[entityName]?.email !== entity.email
            ) {
                Email.style.borderBottom = "2px solid orange";
            } else {
                Email.style.borderBottom = "2px solid green";
            }
        } else {
            entity.email = null;
            Email.style.borderBottom = "2px solid red";

        }
    } else {
        entity.email = null;
        Email.style.borderBottom = "2px solid red";

    }
}

function userMail(){
    if (loggeduser1.student !== null) {
        validateAndUpdateMail(loggeduser1.student, "student");
    } else if (loggeduser1.teacher !== null) {
        validateAndUpdateMail(loggeduser1.teacher, "teacher");
    } else if (loggeduser1.parent !== null) {
        validateAndUpdateMail(loggeduser1.parent, "parent");
    }

}

const checkErrors = (entity) =>{
    errors = "";

    if(entity.first_name == null) {
        errors += "Please enter valid first name..<br>"

    }
    if (entity.last_name == null) {
        errors += "Please enter valid Last name..<br>"
    }

    if (entity.address == null) {
        errors += "Please enter valid Address..<br>"
    }

    if (entity.mobile_number == null) {
        errors += "Please enter valid Mobile Number..<br>"
    }

    if (entity.email == null) {
        errors += "Please enter valid Email..<br>"
    }

    return errors;
}

//check updates for update object
const checkUpdates = (entity,entityName) => {
    updates = "";
    if (loggeduser1 != null && old_loggeduser1 != null) {

        if(old_loggeduser1[entityName]?.first_name !== entity.first_name) {
            updates = updates + "First Name  Has Changed..<br>"
        }
        if (old_loggeduser1[entityName]?.last_name !== entity.last_name) {
            updates = updates + "Last Name Has Changed..<br>"
        }

        if (old_loggeduser1[entityName]?.address !== entity.address) {
            updates = updates + "Address Has Changed..<br>"
        }

        if (old_loggeduser1[entityName]?.mobile_number !== entity.mobile_number) {
            updates = updates + "Mobile Number Has Changed..<br>"
        }

        if (old_loggeduser1[entityName]?.email !== entity.email) {
            updates = updates + "Address Has Changed..<br>"
        }


    }

    return updates;
}

function updateConfirmation(url){
    iziToast.show({
        theme: 'dark',
        title: "Are You Suer Update Following Details?",
        message: updates,
        layout: 2,
        position: 'topCenter',
        overlay: true,
        timeout: false,
        close:false,
        closeOnEscape: false,
        progressBar: false,
        buttons: [
            ['<button><b>Yes</b></button>', function (instance, toast) {
                // Do something when the "Yes" button is clicked

                let update_server_responce;

                $.ajax(url,{
                    async : false,
                    type:"PUT",//Method
                    data:JSON.stringify(loggeduser1),//data that pass to backend
                    contentType:"application/json",
                    success:function(succsessResData,successStatus,resObj){
                        update_server_responce = succsessResData;
                    },error:function (errorResOb,errorStatus,errorMsg){
                        update_server_responce = errorMsg;
                    }
                })
                if(update_server_responce == "Ok"){

                    iziToast.success({
                        theme: 'dark',
                        title: 'User Update Successfully',
                        position: 'topRight',
                        overlay: true,
                        displayMode: 'once',
                        zindex: 2000,
                        animateInside: true,
                        closeOnEscape:true,
                        timeout: 2000,
                        closeOnClick: true,
                    });
                    window.location.replace("/changeprofile")

                }else{
                    iziToast.error({

                        title: 'An error occurred',
                        message: update_server_responce,
                        position: 'topRight',
                        overlay: true,
                        closeOnEscape: false,
                        close: true,
                        layout: 2,
                        displayMode: 'once',
                        zindex: 2000,
                        animateInside: true,
                        buttons: [
                            ['<button><b>OK</b></button>', function (instance, toast) {
                                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                            }, true]
                        ]
                    });


                }
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

            }, true],
            ['<button>No</button>', function (instance, toast) {
                // Do something when the "No" button is clicked
                iziToast.warning({
                    title: 'Cancel',
                })
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
            }]
        ]
    });
}

function updateUserMC(){

    if (loggeduser1.student != null){
        let errors = checkErrors(loggeduser1.student);
        if (errors == ""){
            let updates = checkUpdates(loggeduser1.student,"student");
            if(updates != ""){
                //Show the confirmation box when the Add button is clicked
                updateConfirmation("/student/log");
            }else {
                iziToast.warning({
                    title: 'Nothing To Update',
                })
            }
        }else{
            iziToast.error({
                title: 'You Have Following Error',
                message: errors,
                position: 'topCenter',
                overlay: true,
                closeOnEscape: false,
                close: true,
                layout: 2,
                displayMode: 'once',
                zindex: 2000,
                animateInside: true,
                buttons: [
                    ['<button><b>OK</b></button>', function (instance, toast) {
                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                    }, true]
                ]
            });
        }
    }
    else if (loggeduser1.teacher != null){
        let errors = checkErrors(loggeduser1.teacher);
        if (errors == ""){
            let updates = checkUpdates(loggeduser1.teacher,"teacher");
            if(updates != ""){
                //Show the confirmation box when the Add button is clicked
                updateConfirmation("/teacher/log");
            }else {
                iziToast.warning({
                    title: 'Nothing To Update',
                })
            }
        }else{
            iziToast.error({
                title: 'You Have Following Error',
                message: errors,
                position: 'topCenter',
                overlay: true,
                closeOnEscape: false,
                close: true,
                layout: 2,
                displayMode: 'once',
                zindex: 2000,
                animateInside: true,
                buttons: [
                    ['<button><b>OK</b></button>', function (instance, toast) {
                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                    }, true]
                ]
            });
        }
    }
    else if (loggeduser1.parent != null){
        let errors = checkErrors(loggeduser1.parent);
        if (errors == ""){
            let updates = checkUpdates(loggeduser1.parent,"parent");
            if(updates != ""){
                //Show the confirmation box when the Add button is clicked
                updateConfirmation("/parent/log");
            }else {
                iziToast.warning({
                    title: 'Nothing To Update',
                })
            }
        }else{
            iziToast.error({
                title: 'You Have Following Error',
                message: errors,
                position: 'topCenter',
                overlay: true,
                closeOnEscape: false,
                close: true,
                layout: 2,
                displayMode: 'once',
                zindex: 2000,
                animateInside: true,
                buttons: [
                    ['<button><b>OK</b></button>', function (instance, toast) {
                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                    }, true]
                ]
            });
        }
    }


}


const changeUserPassword = () => {

    const pattern = /^[a-zA-Z0-9!@#$%^&*()_+\-]{4,8}$/;

    if (currentPassword.value != "" && newPassword.value != "" && renewPassword.value != ""){
        if (pattern.test(newPassword.value) && pattern.test(renewPassword.value)) {
           if (newPassword.value == renewPassword.value){
               let userconfirm = window.confirm("are you suer want to change password...? \n");
               if (userconfirm){
                   forgotUser = new Object();
                   forgotUser.currunt_password = currentPassword.value;
                   forgotUser.new_password = newPassword.value;
                   forgotUser.re_new_password = renewPassword.value;
                   console.log(forgotUser)
                   let serverResponse = httpServiceRequest("/changeforgetuserpassword","POST",forgotUser);
                   if(serverResponse == "OK"){
                       alert("Password change successfully...!");
                       window.location.reload();
                   } else {
                       alert(serverResponse);
                   }
               }
           }else {
               alert("New Passwords do not match. Please try again..!");
           }
        }else{
            alert("Invalid password. Password must be 4-8 characters long and include letters, numbers, and special characters.")
        }
    }else {
        alert("All required fields must be filled out. Please complete the form.")
    }





}

function logoutMC(){
    let userconfirm = window.confirm("are you suer want to log out...? \n");
    if(userconfirm){
        window.location.replace("/logout")
    }else {
        window.location.replace("/dashboard")
    }
}