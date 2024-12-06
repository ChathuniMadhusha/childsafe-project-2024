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
    var NICNo = $("#floatingNIC").val();
    var dayText = 0;
    var year = "";
    var month = "";
    var day = "";
    var gender = "";
    if (NICNo.length != 10 && NICNo.length != 12) {
        teacher.nic = null;
        floatingNIC.style.borderBottom = "2px solid red";
    } else if (NICNo.length == 10 && !$.isNumeric(NICNo.substr(0, 9))) {
        teacher.nic = null;
        floatingNIC.style.borderBottom = "2px solid red";
    }
    else {
        console.log("valid nic")
        // Year
        if (NICNo.length == 10) {
            year = "19" + NICNo.substr(0, 2);
            dayText = parseInt(NICNo.substr(2, 3));
        } else {
            year = NICNo.substr(0, 4);
            dayText = parseInt(NICNo.substr(4, 3));
        }

        // Gender
        if (dayText > 500) {
            gender = "Female";
            dayText = dayText - 500;
        } else {
            gender = "Male";
        }

        // Day Digit Validation
        if (dayText < 1 && dayText > 366) {
            teacher.nic = null;
            floatingNIC.style.borderBottom = "2px solid red";
        } else {

            //Month
            if (dayText > 335) {
                day = dayText - 335;
                month = "12";
            }
            else if (dayText > 305) {
                day = dayText - 305;
                month = "11";
            }
            else if (dayText > 274) {
                day = dayText - 274;
                month = "10";
            }
            else if (dayText > 244) {
                day = dayText - 244;
                month = "09";
            }
            else if (dayText > 213) {
                day = dayText - 213;
                month = "08";
            }
            else if (dayText > 182) {
                day = dayText - 182;
                month = "07";
            }
            else if (dayText > 152) {
                day = dayText - 152;
                month = "06";
            }
            else if (dayText > 121) {
                day = dayText - 121;
                month = "05";
            }
            else if (dayText > 91) {
                day = dayText - 91;
                month = "04";
            }
            else if (dayText > 60) {
                day = dayText - 60;
                month = "03";
            }
            else if (dayText < 32) {
                month = "01";
                day = dayText;
            }
            else if (dayText > 31) {
                day = dayText - 31;
                month = "02";
            }

            if (day<10){
                floatingDOB.value = (year+"-"+month+"-"+0+day);
            }else{
                floatingDOB.value = (year+"-"+month+"-"+day);
            }


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

        }
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


