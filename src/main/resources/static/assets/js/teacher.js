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
    teachers = new Array();
    teachers=httpGetRequest("/teacher/findall")

    //create display property list
    let display_property_list = ["teacherid","first_name","mobile_number","teacher_status_id.name"]

    //cretae display property type list
    let display_property_datatype = ["text","text","text","object"]

    //calling fillTable function
    fillTable(tchr_table,teachers,display_property_list,display_property_datatype,formReFill,rowDelete,rowView,true)

    for (let index in teachers){
        if (teachers[index].teacher_status_id.name == "Deleted"){
            tchr_table.children[1].children[index].children[5].children[2].disabled = true;
            tchr_table.children[1].children[index].children[5].children[0].disabled = true;
        }
    }

    //To add jquery table
    $('#tchr_table').dataTable();

}

const formReFill = (obj) =>{
    teacher = httpGetRequest("/teacher/getbyid?id="+obj.id)
    old_teacher = httpGetRequest("/teacher/getbyid?id="+obj.id)


    //set value in to text feild
    floatingFName.value=teacher.first_name
    floatingLName.value=teacher.last_name;
    floatingDOB.value=teacher.dob;
    floatingEmail.value=teacher.email;
    floatingTextarea.value=teacher.address;
    floatingNIC.value=teacher.nic;
    floatingMobile.value=teacher.mobile_number;
    floatingTPassword.value=teacher.te_password;

    //set value in to select feild
    fillSelectField(floatingSelect,"",statuss,"name",teacher.teacher_status_id.name);

    //disable add button
    disabledButton(false,true);

    //set style after refill
    setStyle("2px solid green")

    //Enable status field
    $('#floatingSelect').prop('disabled', false);

    //open form model
    $('#basicModal').modal('show')

    

}

const rowDelete = (obj) => {
    //Show the confirmation box when the delete button is clicked
    iziToast.show({
        theme: 'dark',
        title: 'Are you sure to delete the following Teacher...?',
        message: "Teacher Id: " + obj.teacherid + "<br>Teacher Name: " + obj.first_name,
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

                $.ajax("/teacher",{
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
                        title: 'Teacher Deleted',
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
    printTeacher = new Object();
    printTeacher = httpGetRequest("/teacher/getbyid?id="+obj.id);

    td_id.innerHTML = printTeacher.teacherid;
    td_fname.innerHTML = printTeacher.first_name;
    td_lname.innerHTML = printTeacher.last_name;
    td_smobile.innerHTML = printTeacher.mobile_number;
    td_snic.innerHTML = printTeacher.nic;
    td_sadd.innerHTML = printTeacher.dob;
    td_sdob.innerHTML = printTeacher.address;
    td_semail.innerHTML = printTeacher.email;
    td_sstatus.innerHTML = printTeacher.teacher_status_id.name;
    $('#teacherViewModel').modal('show')
}

const teacherPrintModel = () => {
    let newWindow = window.open();
    newWindow.document.write(
        '<link rel="stylesheet" href="Resourse/bootstrap/css/bootstrap.min.css">'+'<script src="Resourse/Jquary/jquary.js"></script>'
        +"<h2>Teacher Details</h2>"
        + tablePrintTbl.outerHTML);
    //newWindow.print();
    setTimeout(function() {
        newWindow.print();
    },1000)
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

    //Dissable update button
    disabledButton(true,false);

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

// function nicFieldValidator(){
//     let nic_pattern = new RegExp('^(([0-9]{9}[V|v|X|x])|([0-9]{12}))$')
//
//     if(floatingNIC.value != ""){
//         if(nic_pattern.test(floatingNIC.value)){
//
//             if(floatingNIC.value.length == 10){
//                 nic="19"+floatingNIC.value.substring(0,5)+"0"+floatingNIC.value.substring(5,9);
//
//
//             }else{
//                 nic = floatingNIC.value
//             }
//
//             let empBirtyear = nic.substring(0,4);
//             let empBirthday = nic.substring(4,7);
//
//
//             let empdob = new Date(empBirtyear)
//
//             if(parseInt(empBirtyear) % 4 == 0){
//                 empdob.setDate(empdob.getDate()-1 + parseInt(empBirthday))
//             }else{
//                 empdob.setDate(empdob.getDate()-2 + parseInt(empBirthday))
//             }
//
//
//             floatingDOB.value = getDateFormat("date",empdob);
//
//             //update part
//             teacher.nic = floatingNIC.value
//             teacher.dob = floatingDOB.value;
//
//             if(old_teacher != null && teacher.nic != old_teacher.nic){
//                 floatingNIC.style.borderBottom = "2px solid orange";
//                 floatingDOB.style.borderBottom = "2px solid orange";
//             }else{
//                 floatingNIC.style.borderBottom = "2px solid green";
//                 floatingDOB.style.borderBottom = "2px solid green";
//
//             }
//
//
//
//         }else{
//             teacher.nic = null;
//             floatingNIC.style.borderBottom = "2px solid red";
//         }
//     }else{
//         teacher.nic = null;
//         floatingNIC.style.borderBottom = "2px solid red";
//
//     }
// }

// function nicFieldValidator(){
//     let nicpattern  = new RegExp('^(([0-9]{9}[VvXx])|([2,1][9,0][0,7,8,9][0-9]{9}))$');
//     if(floatingNIC.value != ""){
//         if(nicpattern.test(floatingNIC.value)){
//
//             if (floatingNIC.value.length == 10) {
//                 nic = "19" + floatingNIC.value.substring(0,5) + "0" +  floatingNIC.value.substring(5,9);
//             } else {
//                 nic = floatingNIC.value;
//             }
//
//             let techerBYera = nic.substring(0,4);
//
//
//             let techerBDay = nic.substring(4,7);
//
//
//             let dob = new Date(techerBYera);
//
//
//             if(techerBYera%4 == 0){
//                 //adika awuruddak nm
//                 dob.setDate(techerBDay);
//                 floatingDOB.value = getCurrentDate("date",dob);
//             }else {
//                 if(techerBDay <= 59){
//                     dob.setDate(techerBDay);
//                     floatingDOB.value = getCurrentDate("date",dob);
//                 }else if(techerBDay == 60){
//                     floatingDOB.value = techerBYera+"-02-29";
//                 }else {
//                     dob.setDate( parseInt(techerBDay)-1);
//                     floatingDOB.value = getCurrentDate("date",dob);
//                 }
//             }
//             teacher.nic  = floatingNIC.value;
//             teacher.dob = floatingDOB.value;
//
//             if(old_teacher != null && teacher.nic != old_teacher.nic){
//                 //setUpdate(txtStuNIC);
//                 floatingNIC.style.border = "2px solid orange";
//                 //setUpdate(floatingDOB);
//                 floatingDOB.style.border = "2px solid orange";
//             }
//             else{
//                 //setValid(txtStuNIC);
//                 floatingNIC.style.border = "2px solid green";
//                 //setValid(floatingDOB);
//                 floatingDOB.style.border = "2px solid green";
//
//             }
//         }
//         else{
//             teacher.nic  = null;
//             teacher.dob = null;
//             floatingDOB.value = "";
//             //setInvalid(txtStuNIC);
//             floatingNIC.style.border = "2px solid red";
//         }
//     }
//     else{
//         teacher.nic  = null;
//         teacher.dob = null;
//         floatingDOB.value = "";
//         //setInvalid(txtStuNIC);
//         floatingNIC.style.border = "2px solid red";
//
//     }
// }


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
        errors = errors+"Please enter correct NIC to get DOB..<br>";
        floatingDOB.style.borderBottom="2px solid red";
    }

    if(teacher.te_password == null){
        errors = errors+"Please enter Teacher Password..<br>";
        floatingTPassword.style.borderBottom="2px solid red";
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

//Check updates for object
const checkUpdates = () => {
    let updates = "";
    if (teacher != null && old_teacher != null) {

        if(teacher.first_name != old_teacher.first_name) {
            updates = updates + "Teacher First Name  Has Changed..<br>"
        }

        if (teacher.last_name != old_teacher.last_name) {
            updates = updates + "Teacher Last Name Has Changed..<br>"
        }

        if (teacher.mobile_number != old_teacher.mobile_number) {
            updates = updates + "Teacher Mobile Has Changed..<br>"
        }

        if (teacher.dob != old_teacher.dob) {
            updates = updates + "Teacher DOB Has Changed..<br>"
        }

        if (teacher.address != old_teacher.address) {
            updates = updates + "Teacher Address Has Changed..<br>"
        }

        if (teacher.email != old_teacher.email) {
            updates = updates + "Teacher Email Has Changed..<br>"
        }

        if (teacher.nic != old_teacher.nic) {
            updates = updates + "Teacher NIC Has Changed..<br>"
        }

        if (teacher.st_password != old_teacher.st_password) {
            updates = updates + "Teacher Password Has Changed..<br>"
        }

        if (teacher.teacher_status_id.name != old_teacher.teacher_status_id.name) {
            updates = updates + "Teacher Status Has Changed..<br>"
        }

    }

    return updates;
}

const buttonUpdateMC = () =>{
    let errors = checkErrors();
    if (errors == ""){
        let updates = checkUpdates();
        if(updates != ""){
            //Show the confirmation box when the Update button is clicked
            iziToast.show({
                theme: 'dark',
                title: "Are You Suer Update Following Teacher?",
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

                        $.ajax("/teacher",{
                            async : false,
                            type:"PUT",//Method
                            data:JSON.stringify(teacher),//data that pass to backend
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
                                title: 'Teacher Update Successfully',
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

