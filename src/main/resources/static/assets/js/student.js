//Function for browser onload event
window.addEventListener('load', refreshBrowser);

//Create function for browser onload event
function refreshBrowser() {
    refreshTable();
    refreshForm();
}

//define refresh table
const refreshTable = () =>{
    //array for store processor data
    student = new Array();
    student=httpGetRequest("/student/findall")

    //create display property list
    let display_property_list = ["studentid","first_name","mobile_number","student_status_id.name"]

    //cretae display property type list
    let display_property_datatype = ["text","text","text","object"]

    //calling fillTable function
    fillTable(std_table,student,display_property_list,display_property_datatype,formReFill,rowDelete,rowView,true)

}

const formReFill = (obj) =>{


}

const rowDelete = (obj) => {

}

const rowView = (obj) =>{

}


//form
const refreshForm = () =>{
    student = new Object();
    old_student = null;

    //create array for fill select element

    statuss = new Array();
    statuss = httpGetRequest("/studentstatus/findall")


    fillSelectField(floatingSelect,"",statuss,"name","In-active");
    student.student_status_id = JSON.parse(floatingSelect.value);



    //need to be empty all field after add

    floatingFName.value="";
    floatingLName.value="";
    floatingDOB.value="";
    floatingEmail.value="";
    floatingTextarea.value="";
    floatingMobile.value="";
    floatingSPassword.value="";

    //set style to default
    setStyle("1px solid #ced4da")

    //set validate color to auto select field
    floatingSelect.style.borderBottom = "2px solid green";


}

function setStyle(style){
    floatingFName.style.borderBottom=style;
    floatingLName.style.borderBottom=style;
    floatingDOB.style.borderBottom=style;
    floatingEmail.style.borderBottom=style;
    floatingTextarea.style.borderBottom=style;
    floatingMobile.style.borderBottom=style;
    floatingSPassword.style.borderBottom=style;
    floatingSelect.style.borderBottom=style;

}

//function for check errors
const checkErrors = () =>{
    console.log("check error")
    let errors = "";

    if(student.first_name == null){
        errors = errors+"Please enter Student First Name..<br>";
        floatingFName.style.borderBottom="2px solid red";
    }

    if(student.last_name == null){
        errors = errors+"Please enter Student Last Name..<br>";
        floatingLName.style.borderBottom="2px solid red";
    }

    if(student.email == null){
        errors = errors+"Please enter Student Mail..<br>";
        floatingEmail.style.borderBottom="2px solid red";
    }

    if(student.mobile_number == null){
        errors = errors+"Please enter Student Mobile..<br>";
        floatingMobile.style.borderBottom="2px solid red";
    }

    if(student.address == null){
        errors = errors+"Please enter Student Address..<br>";
        floatingTextarea.style.borderBottom="2px solid red";
    }

    if(student.dob == null){
        errors = errors+"Please enter Student DOB..<br>";
        floatingDOB.style.borderBottom="2px solid red";
    }

    if(student.st_password == null){
        errors = errors+"Please enter Student Password..<br>";
        floatingSPassword.style.borderBottom="2px solid red";
    }

    if(student.student_status_id == null){
        errors = errors+"Please Select Student Status..<br>";
        floatingSPassword.style.borderBottom="2px solid red";
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
            message: "Student Name: " + student.first_name,
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

                    $.ajax("/student",{
                        async : false,
                        type:"POST",//Method
                        data:JSON.stringify(student),//data that pass to backend
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
                            title: 'Student Add Successfully',
                            position: 'topRight',
                            overlay: true,
                            displayMode: 'once',
                            zindex: 999,
                            animateInside: true,
                            closeOnEscape:true,
                            timeout: 2000,
                            closeOnClick: true,

                        });
                        refreshTable();
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
                            zindex: 999,
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
            zindex: 999,
            animateInside: true,
            buttons: [
                ['<button><b>OK</b></button>', function (instance, toast) {
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                }, true]
            ]
        });

    }
}