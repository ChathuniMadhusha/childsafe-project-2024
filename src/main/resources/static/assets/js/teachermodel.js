//Function for browser onload event
window.addEventListener('load', refreshBrowser);

//Create function for browser onload event
function refreshBrowser() {
    refreshForm();
}

const refreshForm = () =>{
    teacher = new Object();
    old_teacher = null;

    //create array for fill select element

    statuss = new Array();
    statuss = httpGetRequest("/teacherstatus/findall")

    //auto select value
    fillSelectField(floatingSelect,"",statuss,"name","In-active");
    teacher.teacher_status_id = JSON.parse(floatingSelect.value);


    //clear value after refesh
    floatingFName.value="";
    floatingLName.value="";
    floatingDOB.value="";
    floatingNIC.value="";
    floatingEmail.value="";
    floatingTextarea.value="";
    floatingMobile.value="";
    floatingTPassword.value="";


    //set style to default
    setStyle("1px solid #ced4da")

    //dissabl status field
    $('#floatingSelect').prop('disabled', true);


}

function setStyle(style){
    floatingFName.style.borderBottom=style;
    floatingNIC.style.borderBottom=style;
    floatingLName.style.borderBottom=style;
    floatingDOB.style.borderBottom=style;
    floatingEmail.style.borderBottom=style;
    floatingTextarea.style.borderBottom=style;
    floatingMobile.style.borderBottom=style;
    floatingTPassword.style.borderBottom=style;


}

function nicFieldValidator(){
    let nic_pattern = new RegExp('^(([0-9]{9}[V|v|X|x])|([0-9]{12}))$')

    if(floatingNIC.value != ""){
        if(nic_pattern.test(floatingNIC.value)){

            if(floatingNIC.value.length == 10){
                nic="19"+floatingNIC.value.substring(0,5)+"0"+floatingNIC.value.substring(5,9);


            }else{
                nic = floatingNIC.value
            }

            let empBirtyear = nic.substring(0,4);
            let empBirthday = nic.substring(4,7);


            let empdob = new Date(empBirtyear)

            if(parseInt(empBirtyear) % 4 == 0){
                empdob.setDate(empdob.getDate()-1 + parseInt(empBirthday))
            }else{
                empdob.setDate(empdob.getDate()-2 + parseInt(empBirthday))
            }


            floatingDOB.value = getDateFormat("date",empdob);

            //update part
            teacher.nic = floatingNIC.value
            teacher.dob = floatingDOB.value;

            if(old_teacher != null && teacher.nic != old_teacher.nic){
                floatingNIC.style.borderBottom = "2px solid orange";
                floatingDOB.style.borderBottom = "2px solid orange";
            }else{
                floatingNIC.style.borderBottom = "2px solid green";
                floatingDOB.style.borderBottom = "2px solid green";

            }



        }else{
            teacher.nic = null;
            floatingNIC.style.borderBottom = "2px solid red";
        }
    }else{
        teacher.nic = null;
        floatingNIC.style.borderBottom = "2px solid red";

    }
}


//function for check errors
const checkErrors = () =>{
    console.log("check error")
    let errors = "";

    if(teacher.first_name == null){
        errors = errors+"Please enter Teacher First Name..<br>";
        floatingFName.style.borderBottom="2px solid red";
    }

    if(teacher.last_name == null){
        errors = errors+"Please enter Teacher Last Name..<br>";
        floatingLName.style.borderBottom="2px solid red";
    }

    if(teacher.email == null){
        errors = errors+"Please enter Teacher Mail..<br>";
        floatingEmail.style.borderBottom="2px solid red";
    }

    if(teacher.nic == null){
        errors = errors+"Please enter Teacher NIC..<br>";
        floatingNIC.style.borderBottom="2px solid red";
    }

    if(teacher.mobile_number == null){
        errors = errors+"Please enter Teacher Mobile..<br>";
        floatingMobile.style.borderBottom="2px solid red";
    }

    if(teacher.address == null){
        errors = errors+"Please enter Teacher Address..<br>";
        floatingTextarea.style.borderBottom="2px solid red";
    }

    if(teacher.dob == null){
        errors = errors+"Please enter Teacher DOB..<br>";
        floatingDOB.style.borderBottom="2px solid red";
    }

    if(teacher.te_password == null){
        errors = errors+"Please enter Teacher Password..<br>";
        floatingDOB.style.borderBottom="2px solid red";
    }

    if(teacher.teacher_status_id == null){
        errors = errors+"Please Select Teacher Status..<br>";
        floatingSelect.style.borderBottom="2px solid red";
    }


    return errors;


}

const buttonAddMc = () =>{
    console.log("submit")

    let errors = checkErrors();


    if(errors == ""){

        //Show the confirmation box when the Add button is clicked
        iziToast.show({
            theme: 'dark',
            title: "Are You Suer To Register following Student ..?",
            message: "Teacher Name: " + teacher.first_name,
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

                    let post_server_responce;

                    $.ajax("/teacher",{
                        async : false,
                        type:"POST",//Method
                        data:JSON.stringify(teacher),//data that pass to backend
                        contentType:"application/json",
                        success:function(succsessResData,successStatus,resObj){
                            post_server_responce = succsessResData;
                        },error:function (errorResOb,errorStatus,errorMsg){
                            post_server_responce = errorMsg;
                        }
                    })
                    if(post_server_responce == "0"){

                        iziToast.success({
                            theme: 'dark',
                            title: 'Teacher Add Successfully',
                            position: 'topRight',
                            overlay: true,
                            displayMode: 'once',
                            zindex: 2000,
                            animateInside: true,
                            closeOnEscape:true,
                            timeout: 2000,
                            closeOnClick: true,

                        });

                        refreshForm();

                    }else{
                        iziToast.error({

                            title: 'An error occurred',
                            message: post_server_responce,
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


