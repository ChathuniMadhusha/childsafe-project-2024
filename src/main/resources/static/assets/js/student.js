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

    for (let index in student){
        if (student[index].student_status_id.name == "Deleted"){
            std_table.children[1].children[index].children[5].children[2].disabled = true;
            std_table.children[1].children[index].children[5].children[0].disabled = true;
        }
    }

    // for(let index in student){
    //     if(student[index].student_status_id.name == "Active"){
    //         std_table.children[1].children[index].children[4].children[0].classList.add("active-cell-style");
    //     }
    //     if(student[index].student_status_id.name == "In-active"){
    //         std_table.children[1].children[index].children[4].children[0].classList.add("active-cell-style");
    //     }
    // }

    //To add jquery table
    $('#std_table').dataTable();



}

const formReFill = (obj) =>{

    student = httpGetRequest("/student/getbyid?id="+obj.id)
    old_student = httpGetRequest("/student/getbyid?id="+obj.id)


    //set value in to text feild
    floatingFName.value=student.first_name
    floatingLName.value=student.last_name;
    floatingDOB.value=student.dob;
    floatingEmail.value=student.email;
    floatingTextarea.value=student.address;
    floatingMobile.value=student.mobile_number;
    floatingSPassword.value=student.st_password;

    //set value in to select feild
    fillSelectField(floatingSelect,"",statuss,"name",student.student_status_id.name);


    setStyle("2px solid green")

    //disable add button
    disabledButton(false,true);

    //Enable status field
    $('#floatingSelect').prop('disabled', false);
    $('#basicModal').modal('show')
    

}

const rowDelete = (obj) => {
    //Show the confirmation box when the delete button is clicked
    iziToast.show({
        theme: 'dark',
        title: 'Are you sure to delete the following Student...?',
        message: "Student Id: " + obj.studentid + "<br>Student Name: " + obj.first_name,
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

                let delete_server_responce;

                $.ajax("/student",{
                    async : false,
                    type:"DELETE",//Method
                    data:JSON.stringify(obj),//data that pass to backend
                    contentType:"application/json",
                    success:function(succsessResData,successStatus,resObj){
                        delete_server_responce = succsessResData;
                    },error:function (errorResOb,errorStatus,errorMsg){
                        delete_server_responce = errorMsg;
                    }
                })
                if(delete_server_responce == "0"){
                    iziToast.success({
                        theme: 'dark',
                        title: 'Student Deleted',
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
                }else{
                    iziToast.error({
                        title: 'An error occurred',
                        message: delete_server_responce,
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
}

const rowView = (obj) =>{
    printStudent = new Object();
    printStudent = httpGetRequest("/student/getbyid?id="+obj.id);

    td_id.innerHTML = printStudent.studentid;
    td_fname.innerHTML = printStudent.first_name;
    td_lname.innerHTML = printStudent.last_name;
    td_smobile.innerHTML = printStudent.mobile_number;
    td_sadd.innerHTML = printStudent.dob;
    td_sdob.innerHTML = printStudent.address;
    td_semail.innerHTML = printStudent.email;
    td_sstatus.innerHTML = printStudent.student_status_id.name;
    $('#studentViewModel').modal('show')
}

const studentPrintModel = () => {
    let newWindow = window.open();
    newWindow.document.write(
        '<link rel="stylesheet" href="Resourse/bootstrap/css/bootstrap.min.css">'+'<script src="Resourse/Jquary/jquary.js"></script>'
        +"<h2>Student Details</h2>"
        + studentPrintTbl.outerHTML);
    //newWindow.print();
    setTimeout(function() {
        newWindow.print();
    },1000)
}


//form
const refreshForm = () =>{
    student = new Object();
    old_student = null;

    //create array for fill select element

    statuss = new Array();
    statuss = httpGetRequest("/studentstatus/findall")

    //auto select value
    fillSelectField(floatingSelect,"",statuss,"name","In-active");
    student.student_status_id = JSON.parse(floatingSelect.value);


    //clear value after refesh
    floatingFName.value="";
    floatingLName.value="";
    floatingDOB.value="";
    floatingEmail.value="";
    floatingTextarea.value="";
    floatingMobile.value="";
    floatingSPassword.value="";

    //set style to default
    setStyle("1px solid #ced4da")

    //disable update button
    disabledButton(true,false);

    let mindate = new Date("2000-01-01");
    let maxdate = new Date("2006-12-31");

// Set min and max date on the input field
    floatingDOB.min = getDateFormat("date", mindate);
    floatingDOB.max = getDateFormat("date", maxdate);

    //dissable status field
    $('#floatingSelect').prop('disabled', true);


}

function setStyle(style){
    floatingFName.style.borderBottom=style;
    floatingLName.style.borderBottom=style;
    floatingDOB.style.borderBottom=style;
    floatingEmail.style.borderBottom=style;
    floatingTextarea.style.borderBottom=style;
    floatingMobile.style.borderBottom=style;
    floatingSPassword.style.borderBottom=style;


}

const btnClearForm = () => {

    //clear value after refesh
    floatingFName.value="";
    floatingLName.value="";
    floatingDOB.value="";
    floatingEmail.value="";
    floatingTextarea.value="";
    floatingMobile.value="";
    floatingSPassword.value="";

    //set style to default
    setStyle("1px solid #ced4da")
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
                            zindex: 2000,
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
                            zindex:2000,
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

//check updates for update object
const checkUpdates = () => {
    let updates = "";
    if (student != null && old_student != null) {

        if(student.first_name != old_student.first_name) {
            updates = updates + "Student First Name  Has Changed..<br>"
        }

        if (student.last_name != old_student.last_name) {
            updates = updates + "Student Last Name Has Changed..<br>"
        }

        if (student.mobile_number != old_student.mobile_number) {
            updates = updates + "Student Mobile Has Changed..<br>"
        }

        if (student.dob != old_student.dob) {
            updates = updates + "Student DOB Has Changed..<br>"
        }

        if (student.address != old_student.address) {
            updates = updates + "Student Address Has Changed..<br>"
        }

        if (student.email != old_student.email) {
            updates = updates + "Student Email Has Changed..<br>"
        }

        if (student.st_password != old_student.st_password) {
            updates = updates + "Student Password Has Changed..<br>"
        }

        if (student.student_status_id.name != old_student.student_status_id.name) {
            updates = updates + "Student Status Has Changed..<br>"
        }

    }

    return updates;
}

const buttonUpdateMC = () =>{
    let errors = checkErrors();
    if (errors == ""){
        let updates = checkUpdates();
        if(updates != ""){
            //Show the confirmation box when the Add button is clicked
            iziToast.show({
                theme: 'dark',
                title: "Are You Suer Update Following Student?",
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

                        $.ajax("/student",{
                            async : false,
                            type:"PUT",//Method
                            data:JSON.stringify(student),//data that pass to backend
                            contentType:"application/json",
                            success:function(succsessResData,successStatus,resObj){
                                update_server_responce = succsessResData;
                            },error:function (errorResOb,errorStatus,errorMsg){
                                update_server_responce = errorMsg;
                            }
                        })
                        if(update_server_responce == "0"){

                            iziToast.success({
                                theme: 'dark',
                                title: 'Student Update Successfully',
                                position: 'topRight',
                                overlay: true,
                                displayMode: 'once',
                                zindex: 2000,
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