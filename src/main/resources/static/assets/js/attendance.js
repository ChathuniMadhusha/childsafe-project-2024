//Function for browser onload event
window.addEventListener('load', refreshBrowser);

//Create function for browser onload event
function refreshBrowser() {
    refreshTable();
    refreshForm();
    loggeduser = httpGetRequest("/loguser")
    if(loggeduser.teacher == null){
        $("#sidebar").removeAttr("hidden");
        // Select the existing stylesheet link
        let stylesheet = document.querySelector('link[href="assets/css/stylenew.css"]');

        // Change the href to the new stylesheet
        if (stylesheet) {
            stylesheet.href = "assets/css/style.css";
        }
    }

     session = "default";
}

//define refresh table
const refreshTable = () =>{
    //array for store processor data
    attendance = new Array();
    attendance=httpGetRequest("/attendance/findall")

    //create display property list
    let display_property_list = ["class_implementation_id.class_name","date","present_count","absent_count"]

    //cretae display property type list
    let display_property_datatype = ["object","text","text","text"]

    //calling fillTable function
    fillTable(attendance_tbl,attendance,display_property_list,display_property_datatype,formReFill,rowDelete,rowView,true)


    //hide delete
    for (let index in attendance){

        attendance_tbl.children[1].children[index].children[5].children[2].style.display="none";


    }

    //To add data table
    $('#attendance_tbl').dataTable();
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


    floatingDate.value=attendance.date;

    floatingClasscode.value=attendance.class_implementation_id.class_code;
    $('#floatingClasscode').prop('disabled', true);

    floatingCName.value=attendance.class_implementation_id.class_name;



    divShowTotalRegCount.innerText = attendance.reg_count;


    divShowPresentCount.innerText = attendance.present_count;


    divShowAbsentCount.innerText = attendance.absent_count;
    getStudentListByClassRegistration();

    setStyle("2px solid green")


    disabledButton(false,true);
    $('#basicModal').modal('show')

}


const rowDelete = (obj) =>{

}

const rowView = (obj) =>{
    printclass = new Object();
    printclass = httpGetRequest("/attendance/getbyid?id="+obj.id);

    td_date.innerHTML = printclass.date;
    td_cname.innerHTML = printclass.class_implementation_id.class_name;
    td_ccode.innerHTML = printclass.class_implementation_id.class_code;
    td_reg.innerHTML = printclass.reg_count;
    td_pre.innerHTML = printclass.absent_count
    td_abb.innerHTML = printclass.present_count;
    td_cSta.innerHTML = printclass.class_implementation_id.class_status_id.name;
    $('#attViewModel').modal('show')
}

const attPrintModel = () => {
    let newWindow = window.open();
    newWindow.document.write(
        '<link rel="stylesheet" href="Resourse/bootstrap/css/bootstrap.min.css">'+'<script src="Resourse/Jquary/jquary.js"></script>'
        +"<h2>Attendance Details</h2>"
        + tablePrintTbl.outerHTML);
    //newWindow.print();
    setTimeout(function() {
        newWindow.print();
    },1000)
}


//form

const refreshForm = () =>{
    attendance = new Object();
    old_attendance = null;

    attendance.attendance_has_students = new Array();


    //  //clear value after refesh
    floatingDate.value="";
    floatingClasscode.value="";
    floatingCName.value="";
    ttttbody.innerHTML = "";


    //set style to default
    setStyle("1px solid #ced4da")

    disabledButton(true,false);

    divShowTotalRegCount.innerHTML = "";
    divShowPresentCount.innerHTML = "";
    divShowAbsentCount.innerHTML = "";

}


const getStudentListByClassRegistration = () => {
    divShowTotalRegCount.innerText = "";
    divShowPresentCount.innerText = "";
    divShowAbsentCount.innerText = "";
    let tbody = tblAttendanceMark.children[1];
    tbody.innerHTML="";
    let studentListByCRegistration = httpGetRequest("/student/byclregistration?cid=" + (floatingClasscode.value))
    console.log(studentListByCRegistration);
    let tableBody =  tblAttendanceMark.children[1]

    tableBody.style.pointerEvents = "none";


    absentCount = 0;
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

        } else {
            absentCount = attendance.absent_count;
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
                console.log("kkkk");
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

                divShowAbsentCount.innerText = parseInt(absentCount);
                attendance.absent_count = parseInt(absentCount);
                attendance.present_count = parseInt(attendance.reg_count)-parseInt(attendance.absent_count);
                divShowPresentCount.innerText = attendance.present_count;

            }

            if(attendance.attendance_has_students[index].present_or_absent){
                checkBox.checked = false;
                absentCount = parseInt(absentCount)-1;

            }

            if (old_attendance != null) {
                console.log("hhhh")
                console.log(old_attendance);
                if (attendance.attendance_has_students[index].present_or_absent == true) {
                    checkBox.checked = true;
                }

                attendance.absent_count = absentCount;
                attendance.present_count = parseInt(attendance.reg_count)-parseInt(attendance.absent_count);
                divShowPresentCount.innerText = attendance.present_count;
                divShowAbsentCount.innerText = attendance.absent_count;

            }

            if (old_attendance != null) {
                console.log("hhhh")
                console.log(old_attendance);
                if (attendance.attendance_has_students[index].present_or_absent == true) {
                    checkBox.checked = true;
                    divShowAbsentCount.innerText = parseInt(absentCount);
                    attendance.absent_count = parseInt(absentCount);
                    attendance.present_count = parseInt(attendance.reg_count)-parseInt(attendance.absent_count);
                    divShowPresentCount.innerText = attendance.present_count;

                }
            }
            checkTD.appendChild(checkBox);
            checkTD.appendChild(checkBoxLabel);
            tr.appendChild(checkTD);

            tableBody.appendChild(tr);
        }
    }
}



const enableCheckBox = () => {

    let errors = checkErrors();


    if(errors == ""){
        //Show the confirmation box when the Add button is clicked
        iziToast.show({
            theme: 'dark',
            title: "Are You Sure to Start the Session ..?",
            position: 'topCenter',
            overlay: true,
            timeout: false,
            close:false,
            closeOnEscape: false,
            progressBar: false,
            buttons: [
                ['<button><b>Yes</b></button>', function (instance, toast) {
                    // Do something when the "Yes" button is clicked
                    ttttbody.style.pointerEvents = "auto";
                    iziToast.success({
                        theme: 'dark',
                        title: 'Session Start',
                        position: 'topRight',
                        overlay: false,
                        displayMode: 'once',
                        zindex: 2000,
                        animateInside: true,
                        closeOnEscape:true,
                        timeout: 2000,
                        closeOnClick: true,
                    });
                    session = "start"
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


const disableCheckBox = () => {

    if (session == "start"){
        //Show the confirmation box when the Add button is clicked
        iziToast.show({
            theme: 'dark',
            title: "Are You Sure to End the Session ..?",
            position: 'topCenter',
            overlay: true,
            timeout: false,
            close:false,
            closeOnEscape: false,
            progressBar: false,
            buttons: [
                ['<button><b>Yes</b></button>', function (instance, toast) {
                    // Do something when the "Yes" button is clicked
                    ttttbody.style.pointerEvents = "none";
                    iziToast.success({
                        theme: 'dark',
                        title: 'Session End',
                        position: 'topRight',
                        overlay: false,
                        displayMode: 'once',
                        zindex: 2000,
                        animateInside: true,
                        closeOnEscape:true,
                        timeout: 2000,
                        closeOnClick: true,

                    });
                    session = "complete";
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
        iziToast.error({
            title: 'Please Start Session',
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


function setStyle(style){
    floatingDate.style.borderBottom=style;
    floatingClasscode.style.borderBottom=style;




}

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

    console.log(attendance);
    let errors = checkErrors();


    if(errors == ""){

        if(session=="complete"){
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
                                overlay: false,
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
                title: 'Please Complete the Session Before Add',
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

const checkUpdates = () => {
    let updates = "";
    if (attendance != null && old_attendance != null) {

        if(attendance.date != old_attendance.date) {
            updates = updates + "Date  Has Changed..<br>"
        }

        if (attendance.class_implementation_id.class_code != old_attendance.class_implementation_id.class_code) {
            updates = updates + "Class code Has Changed..<br>"
        }


        if (attendance.attendance_has_students.length != old_attendance.attendance_has_students.length) { //will be usefull for attendance
            updates = updates + "Attendance is changed \n";
        } else {
            let extcount = 0;
            for (let newattend of attendance.attendance_has_students) { //have to check element count in list
                for (let oldattend of old_attendance.attendance_has_students) {
                    if (newattend.student_id.id == oldattend.student_id.id && newattend.present_or_absent == oldattend.present_or_absent) { //
                        extcount = extcount + 1;
                    }
                }
            }

            if (attendance.attendance_has_students.length != extcount) {
                updates = updates + "Attendance is changed \n";
            }
        }



    }

    return updates;
}

const buttonUpdateMC = () =>{
    let errors = checkErrors();
    if (errors == ""){
        let updates = checkUpdates();
        if(updates != ""){

            if (session == "complete"){
                //Show the confirmation box when the Add button is clicked
                iziToast.show({
                    theme: 'dark',
                    title: "Are You Sure Update Following Attendance?",
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

                            $.ajax("/attendance",{
                                async : false,
                                type:"PUT",//Method
                                data:JSON.stringify(attendance),//data that pass to backend
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
                                    title: 'Class Update Successfully',
                                    position: 'topRight',
                                    overlay: false,
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
            }else{
                iziToast.error({
                    title: 'Please Complete the Session Before Add',
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