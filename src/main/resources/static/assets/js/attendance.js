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
    attendance = new Array();
    attendance=httpGetRequest("/attendance/findall")

    //create display property list
    let display_property_list = ["class_implementation_id.class_name","present_count","absent_count"]

    //cretae display property type list
    let display_property_datatype = ["object","text","text"]

    //calling fillTable function
    fillTable(attendance_tbl,attendance,display_property_list,display_property_datatype,formReFill,rowDelete,rowView,true)


    // for (let index in attendance){
    //     if (attendance[index].class_status_id.name == "Deleted"){
    //         classimple_table.children[1].children[index].children[5].children[2].disabled = true;
    //         classimple_table.children[1].children[index].children[5].children[0].disabled = true;
    //     }
    // }

}



const getClassName = () =>{

    if(floatingClasscode.value != ""){

            let classcode = floatingClasscode.value;
            classname = httpGetRequest("/classImplementation/getbyclassname?class_name="+classcode);

            if (classname !=""){
                floatingCName.value = classname.class_name;
                attendance.class_implementation_id = classname;
                floatingClasscode.style.borderBottom = "2px solid green";
            }else {
                floatingClasscode.style.borderBottom = "2px solid red";
                attendance.class_implementation_id = null;
                floatingCName.value = "";
            }
    }else{
        attendance.class_implementation_id = null;
        floatingClasscode.style.borderBottom = "2px solid red";

    }


}










const formReFill = (obj) =>{

    attendance = httpGetRequest("/attendance/getbyid?id="+obj.id)
    old_attendance = httpGetRequest("/attendance/getbyid?id="+obj.id)



    getStudentListByClassRegistration();

    // classimplementation = httpGetRequest("/classImplementation/getbyid?id="+obj.id)
    // old_classimplementation = httpGetRequest("/classImplementation/getbyid?id="+obj.id)
    //
    //
    // //set value in to text feild
    // floatingCCode.value=classimplementation.class_code;
    // floatingCName.value=classimplementation.class_name;
    //
    //
    //
    // //set value in to select feild
    // fillSelectField(floatingSelectGrade,"",class_grade,"name",classimplementation.grade_id.name);
    // fillSelectField(floatingSelectSubject,"",class_subject,"name",classimplementation.subject_id.name);
    // fillSelectField(floatingSelectInstitute,"",institute,"inst_name",classimplementation.institute_implementation_id.inst_name);
    // fillSelectField(floatingSelectClassStatus,"",class_status,"name",classimplementation.class_status_id.name);
    //
    //
    // setStyle("2px solid green")
    //
    // disabledButton(false,true);

    divShowTotalRegCount.innerText = attendance.reg_count;


    divShowPresentCount.innerText = attendance.present_count;


    divShowAbsentCount.innerText = attendance.absent_count;


}


const rowDelete = (obj) =>{

}

const rowView = (obj) =>{

}


// const rowDelete = (obj) => {
//     //Show the confirmation box when the delete button is clicked
//     iziToast.show({
//         theme: 'dark',
//         title: 'Are you sure to delete the following Storage Device...?',
//         message: "Class Name: " + obj.class_name ,
//         layout: 2,
//         position: 'topCenter',
//         overlay: true,
//         timeout: false,
//         close:false,
//         closeOnEscape: false,
//         progressBar: false,
//         buttons: [
//             ['<button><b>Yes</b></button>', function (instance, toast) {
//                 // Do something when the "Yes" button is clicked
//
//                 let delete_server_responce;
//
//                 $.ajax("/classImplementation",{
//                     async : false,
//                     type:"DELETE",//Method
//                     data:JSON.stringify(obj),//data that pass to backend
//                     contentType:"application/json",
//                     success:function(succsessResData,successStatus,resObj){
//                         delete_server_responce = succsessResData;
//                     },error:function (errorResOb,errorStatus,errorMsg){
//                         delete_server_responce = errorMsg;
//                     }
//                 })
//                 if(delete_server_responce == "0"){
//                     iziToast.success({
//                         theme: 'dark',
//                         title: 'Class Deleted',
//                         position: 'topRight',
//                         overlay: true,
//                         displayMode: 'once',
//                         zindex: 999,
//                         animateInside: true,
//                         closeOnEscape:true,
//                         timeout: 2000,
//                         closeOnClick: true,
//
//                     });
//                     refreshTable();
//                 }else{
//                     iziToast.error({
//                         title: 'An error occurred',
//                         message: delete_server_responce,
//                         position: 'topRight',
//                         overlay: true,
//                         closeOnEscape: false,
//                         close: true,
//                         layout: 2,
//                         displayMode: 'once',
//                         zindex: 999,
//                         animateInside: true,
//                         buttons: [
//                             ['<button><b>OK</b></button>', function (instance, toast) {
//                                 instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
//                             }, true]
//                         ]
//                     });
//                 }
//                 instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
//
//             }, true],
//             ['<button>No</button>', function (instance, toast) {
//                 // Do something when the "No" button is clicked
//                 iziToast.warning({
//                     title: 'Cancel',
//                 })
//                 instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
//             }]
//         ]
//     });
// }

// const rowView = (obj) =>{
//     // printclass = new Object();
//     // printclass = httpGetRequest("/classImplementation/getbyid?id="+obj.id);
//     //
//     // td_classname.innerHTML = printclass.class_name;
//     // td_classcode.innerHTML = printclass.class_code;
//     //
//     // td_grade.innerHTML = printclass.grade_id.name;
//     // td_subject.innerHTML = printclass.subject_id.name;
//     // td_institute.innerHTML = printclass.institute_implementation_id.inst_name;
//     // td_classstatus.innerHTML = printclass.class_status_id.name;
//     // $('#ClassViewModel').modal('show')
// }

// const studentPrintModel = () => {
//     let newWindow = window.open();
//     newWindow.document.write(
//         '<link rel="stylesheet" href="Resourse/bootstrap/css/bootstrap.min.css">'+'<script src="Resourse/Jquary/jquary.js"></script>'
//         +"<h2>Storage Details</h2>"
//         + storagePrintTbl.outerHTML);
//     //newWindow.print();
//     setTimeout(function() {
//         newWindow.print();
//     },1000)
// }


//form

const refreshForm = () =>{
    attendance = new Object();
    old_attendance = null;

    attendance.attendance_has_students = new Array();


    //  //clear value after refesh
    // floatingSelectGrade.value="";
    // floatingSelectSubject.value="";
    // floatingCName.value="";
    // floatingSelectInstitute.value="";
    // floatingSelectClassStatus.value="";
    //
    //
    // //set style to default
    // setStyle("1px solid #ced4da")
    //
    // disabledButton(true,false);

    divShowTotalRegCount.innerHTML = "";
    divShowPresentCount.innerHTML = "";
    divShowAbsentCount.innerHTML = "";

}


const getStudentListByClassRegistration = () => {

    divShowPresentCount.innerText = "";
    divShowAbsentCount.innerText = "";

    let studentListByCRegistration = httpGetRequest("/student/byclregistration?cid=" + (floatingClasscode.value))
    console.log(studentListByCRegistration);
    let tableBody =  tblAttendanceMark.children[1]
    tableBody.innerHTML = "";
    // tableBody.style.pointerEvents = "none";

    if(studentListByCRegistration.length != 0){
        divShowTotalRegCount.innerText = studentListByCRegistration.length;
        divShowPresentCount.innerText = 0;
        divShowAbsentCount.innerText = studentListByCRegistration.length;;

        attendance.reg_count = studentListByCRegistration.length;
        attendance.present_count = 0;
        attendance.absent_count = studentListByCRegistration.length;

        if(old_attendance == null){
            attendance.attendance_has_students = new Array();
            for(let index in studentListByCRegistration) {

                let attestu = new Object();

                attestu.student_id = studentListByCRegistration[index];
                attestu.present_or_absent = false;

                attendance.attendance_has_students.push(attestu);
                console.log(attendance.attendance_has_students);
            }

        }


        absentCount = attendance.attendance_has_students.length;
        for(let index in attendance.attendance_has_students){


            let tr = document.createElement("tr");
            //list eke inn plaweniyage id eka gannwa
            tr.id = attendance.attendance_has_students[index].student_id.id;

            let intTD = document.createElement("td");
            intTD.innerText=parseInt(index) + 1;
            tr.appendChild(intTD);

            let stunoTD = document.createElement("td");
            stunoTD.innerText=attendance.attendance_has_students[index].student_id.studentid;
            tr.appendChild(stunoTD);

            let callingTD = document.createElement("td");
            callingTD.innerText=attendance.attendance_has_students[index].student_id.first_name;
            tr.appendChild(callingTD);

            let checkTD = document.createElement("td");
            let checkBox = document.createElement("input");
            let checkBoxLabel = document.createElement("label");
            if(attendance.attendance_has_students[index].present_or_absent){
                checkBoxLabel.innerText = "Present ";

            }else {
                checkBoxLabel.innerText = "Absent ";

            }


            checkBoxLabel.classList.add("form-check-label");
            checkBoxLabel.classList.add("ms-2");
            checkBoxLabel.classList.add("fw-bold");

            checkBox.type = "checkbox";
            checkBox.classList.add("form-check-input");


            checkBox.onchange = function () {
                let attendindex = attendance.attendance_has_students.map(e => e.student_id.id).indexOf(parseInt(this.parentNode.parentNode.id));
                if(this.checked){
                    attendance.attendance_has_students[attendindex].present_or_absent = true;
                    this.parentNode.children[1].innerText = "Present";
                    absentCount = parseInt(absentCount)-1;
                }else{
                    attendance.attendance_has_students[attendindex].present_or_absent = false;
                    this.parentNode.children[1].innerText = "Absent";
                    absentCount = parseInt(absentCount)+1;
                }

                attendance.absent_count = absentCount;
                attendance.present_count = parseInt(attendance.reg_count)-parseInt(attendance.absent_count);
                divShowPresentCount.innerText = attendance.present_count;
                divShowAbsentCount.innerText = attendance.absent_count;

            }

            if(attendance.attendance_has_students[index].present_or_absent){
                checkBox.checked = false;
                absentCount = parseInt(absentCount)-1;

            }

            // if(old_attendance !=null){
            //     let extIndex = attendance.attendance_has_students.map(e => e.student_id.id).indexOf(parseInt(this.parentNode.parentNode.id));
            //     if(extIndex != -1){
            //         checkBox.checked = true;
            //     }
            // }

            if (old_attendance != null) {
                if (attendance.attendance_has_students[index].present_or_absent == true) {
                    checkBox.checked = true;
                }
            }




            checkTD.appendChild(checkBox);
            checkTD.appendChild(checkBoxLabel);
            tr.appendChild(checkTD);



            tableBody.appendChild(tr);
        }

    }


}

// const enableCheckBox = () => {
//
//
//     document.getElementById("tblAttendanceMark").style.pointerEvents="auto";
//
//
//
//
//
// }


// function setStyle(style){
//     floatingSelectGrade.style.borderBottom=style;
//     floatingSelectSubject.style.borderBottom=style;
//     floatingCName.style.borderBottom=style;
//     floatingSelectInstitute.style.borderBottom=style;
//     floatingSelectClassStatus.style.borderBottom=style;
//
//
//
// }

//function for check errors

const checkErrors = () =>{

    let errors = "";

    if(attendance.date == null){
        errors = errors+"Please enter Date..<br>";
        floatingDate.style.borderBottom="2px solid red";
    }

    if(attendance.class_implementation_id == null){
        errors = errors+"Please enter Class Code..<br>";
        floatingClasscode.style.borderBottom="2px solid red";
    }




    return errors;


}

const buttonAddMc = () =>{


    let errors = checkErrors();


    if(errors == ""){

        //Show the confirmation box when the Add button is clicked
        iziToast.show({
            theme: 'dark',
            title: "Are You Sure To Following Attendance ..?",
            message: "Prsent Count: " + attendance.present_count,
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

                    $.ajax("/attendance",{
                        async : false,
                        type:"POST",//Method
                        data:JSON.stringify(attendance),//data that pass to backend
                        contentType:"application/json",
                        success:function(succsessResData,successStatus,resObj){
                            post_server_responce = succsessResData;
                        },error:function (errorResOb,errorStatus,errorMsg){
                            post_server_responce = errorMsg;
                        }
                    })
                    console.log(attendance)
                    if(post_server_responce == "0"){

                        iziToast.success({
                            theme: 'dark',
                            title: 'Attendance Add Successfully',
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

// const checkUpdates = () => {
//     let updates = "";
//     if (classimplementation != null && old_classimplementation != null) {
//
//         if(classimplementation.class_name != old_classimplementation.class_name) {
//             updates = updates + "Class name  Has Changed..<br>"
//         }
//
//
//
//         if (classimplementation.grade_id.name != old_classimplementation.grade_id.name) {
//             updates = updates + "Grade Has Changed..<br>"
//         }
//
//         if (classimplementation.subject_id.name != old_classimplementation.subject_id.name) {
//             updates = updates + "Subject Has Changed..<br>"
//         }
//
//         if (classimplementation.class_status_id.name != old_classimplementation.class_status_id.name) {
//             updates = updates + "Class Status Has Changed..<br>"
//         }
//
//         if (classimplementation.institute_implementation_id.inst_name != old_classimplementation.institute_implementation_id.inst_name) {
//             updates = updates + "Institute Name Has Changed..<br>"
//         }
//
//     }
//
//     return updates;
// }

// const buttonUpdateMC = () =>{
//     let errors = checkErrors();
//     if (errors == ""){
//         let updates = checkUpdates();
//         if(updates != ""){
//             //Show the confirmation box when the Add button is clicked
//             iziToast.show({
//                 theme: 'dark',
//                 title: "Are You Sure Update Following Institute?",
//                 message: updates,
//                 layout: 2,
//                 position: 'topCenter',
//                 overlay: true,
//                 timeout: false,
//                 close:false,
//                 closeOnEscape: false,
//                 progressBar: false,
//                 buttons: [
//                     ['<button><b>Yes</b></button>', function (instance, toast) {
//                         // Do something when the "Yes" button is clicked
//
//                         let update_server_responce;
//
//                         $.ajax("/classImplementation",{
//                             async : false,
//                             type:"PUT",//Method
//                             data:JSON.stringify(classimplementation),//data that pass to backend
//                             contentType:"application/json",
//                             success:function(succsessResData,successStatus,resObj){
//                                 update_server_responce = succsessResData;
//                             },error:function (errorResOb,errorStatus,errorMsg){
//                                 update_server_responce = errorMsg;
//                             }
//                         })
//                         if(update_server_responce == "0"){
//
//                             iziToast.success({
//                                 theme: 'dark',
//                                 title: 'Class Update Successfully',
//                                 position: 'topRight',
//                                 overlay: true,
//                                 displayMode: 'once',
//                                 zindex: 999,
//                                 animateInside: true,
//                                 closeOnEscape:true,
//                                 timeout: 2000,
//                                 closeOnClick: true,
//
//                             });
//                             refreshTable();
//                             refreshForm();
//                         }else{
//                             iziToast.error({
//
//                                 title: 'An error occurred',
//                                 message: update_server_responce,
//                                 position: 'topRight',
//                                 overlay: true,
//                                 closeOnEscape: false,
//                                 close: true,
//                                 layout: 2,
//                                 displayMode: 'once',
//                                 zindex: 999,
//                                 animateInside: true,
//                                 buttons: [
//                                     ['<button><b>OK</b></button>', function (instance, toast) {
//                                         instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
//                                     }, true]
//                                 ]
//                             });
//
//
//                         }
//                         instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
//
//                     }, true],
//                     ['<button>No</button>', function (instance, toast) {
//                         // Do something when the "No" button is clicked
//                         iziToast.warning({
//                             title: 'Cancel',
//                         })
//                         instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
//                     }]
//                 ]
//             });
//         }else {
//             iziToast.warning({
//                 title: 'Nothing To Update',
//             })
//         }
//     }else{
//         iziToast.error({
//             title: 'You Have Following Error',
//             message: errors,
//             position: 'topCenter',
//             overlay: true,
//             closeOnEscape: false,
//             close: true,
//             layout: 2,
//             displayMode: 'once',
//             zindex: 999,
//             animateInside: true,
//             buttons: [
//                 ['<button><b>OK</b></button>', function (instance, toast) {
//                     instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
//                 }, true]
//             ]
//         });
//     }
// }