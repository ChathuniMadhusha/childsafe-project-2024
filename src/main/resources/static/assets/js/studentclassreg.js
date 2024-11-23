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
    sturegs = new Array();
    sturegs=httpGetRequest("/stureg/findall")

    //create display property list
    let display_property_list = ["stu_class_code","student_id.studentid","class_implementation_id.class_code","registration_status_id.name"]

    //cretae display property type list
    let display_property_datatype = ["text","object","object","object"]

    //calling fillTable function
    fillTable(stucls_tbl,sturegs,display_property_list,display_property_datatype,formReFill,rowDelete,rowView,true)

    for (let index in sturegs){
        if (sturegs[index].registration_status_id.name == "Deleted"){
            stucls_tbl.children[1].children[index].children[5].children[2].disabled = true;
            stucls_tbl.children[1].children[index].children[5].children[0].disabled = true;
        }
    }

}

const formReFill = (obj) =>{

    stureg = httpGetRequest("/stureg/getbyid?id="+obj.id)
    old_stureg = httpGetRequest("/stureg/getbyid?id="+obj.id)


    //set value in to text feild
    floatingFName.value=stureg.student_id.studentid;
    floatingLName.value=stureg.student_id.first_name



    //set value in to select feild
    fillSelectFieldtwoproperty(floatingSelectClass,"",classes,"class_code","class_name",stureg.class_implementation_id.class_code);
    fillSelectField(floatingSelectStatus,"",statuss,"name",stureg.registration_status_id.name);

    //disable add button
    disabledButton(false,true);

    //set style after refill
    setStyle("2px solid green")

    //Enable status field
    $('#floatingSelect').prop('disabled', false);

    $('#basicModal').modal('show')



}

const rowDelete = (obj) => {
    //Show the confirmation box when the delete button is clicked
    iziToast.show({
        theme: 'dark',
        title: 'Are you sure to delete the following Student Registration...?',
        message: "Reg code: " + obj.stu_class_code + "<br>Student Code: " + obj.student_id.studentid + "<br>Class Code: "+obj.class_implementation_id.class_code,
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

                $.ajax("/stureg",{
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
                        title: 'Registration Deleted',
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
    printStudent = httpGetRequest("/stureg/getbyid?id="+obj.id);

    td_regid.innerHTML = printStudent.stu_class_code;
    td_id.innerHTML = printStudent.student_id.studentid;
    td_fname.innerHTML = printStudent.student_id.first_name;
    td_ccode.innerHTML = printStudent.class_implementation_id.class_code;
    td_cname.innerHTML = printStudent.class_implementation_id.class_name;
    td_sstatus.innerHTML = printStudent.registration_status_id.name;
    $('#studentViewModel').modal('show')
}

const studentPrintModel = () => {
    let newWindow = window.open();
    newWindow.document.write(
        '<link rel="stylesheet" href="Resourse/bootstrap/css/bootstrap.min.css">'+'<script src="Resourse/Jquary/jquary.js"></script>'
        +"<h2>Registration Details</h2>"
        + tablePrintTbl.outerHTML);
    //newWindow.print();
    setTimeout(function() {
        newWindow.print();
    },1000)
}

const refreshForm = () =>{
    stureg = new Object();
    old_stureg = null;

    //create array for get data to select element
    statuss = new Array();
    statuss = httpGetRequest("/sturegstatus/findall")

    //auto select value
    fillSelectField(floatingSelectStatus,"",statuss,"name","Active");
    stureg.registration_status_id = JSON.parse(floatingSelectStatus.value);

    classes = new Array();
    classes = httpGetRequest("/classImplementation/findall")
    //fillSelectField(floatingSelectClass,"",classes,"class_name","");

    fillSelectFieldtwoproperty(floatingSelectClass,"",classes,"class_code","class_name","")

    floatingFName.value="";
    floatingLName.value="";
    //Dissable update button
    disabledButton(true,false);

    //set style to default
    setStyle("1px solid #ced4da")

    //dissabl status field
    $('#floatingSelectStatus').prop('disabled', true);


}

const findStudentID = () => {


    if(floatingFName.value != ""){
        let sid_pattern = new RegExp('^ST[0-9]{4}[1-9]$')
        if(sid_pattern.test(floatingFName.value)){
            let stcode = floatingFName.value;
            stu = httpGetRequest("/student/getbystudentnoforclass?studentno="+stcode);

            if (stu !=""){

                floatingLName.value = stu.first_name;
                stureg.student_id = stu;
                floatingLName.style.borderBottom = "2px solid green";
                floatingFName.style.borderBottom = "2px solid green";

            }else {
                floatingLName.style.borderBottom = "2px solid red";
                floatingFName.style.borderBottom = "2px solid red";
                stureg.student_id = null;
                floatingLName.value = "";
            }


        }else{
            floatingLName.style.borderBottom = "2px solid red";
            floatingFName.style.borderBottom = "2px solid red";
            stureg.student_id = null;
            floatingLName.value = "";
        }
    }else{
        stureg.student_id = null;
        floatingLName.style.borderBottom = "2px solid red";
        floatingFName.style.borderBottom = "2px solid red";

    }
}

// const stylechange = () =>{
//     if (stureg.student_id != old_stureg.student_id){
//         floatingFName.style.borderBottom = "2px solid orange";
//         floatingLName.style.borderBottom = "2px solid orange";
//     }
// }

const fillSelectFieldtwoproperty = (feildid,displayMg,dataList,displayProperty1,displayProperty2,selectedvalue,visibality = false) =>{

    feildid.innerHTML = "";
    //placeholder
    element = document.createElement('option');
    element.selected=true;
    element.disabled=true
    element.value="";
    element.innerText=displayMg
    feildid.appendChild(element);

    //option
    for(index in dataList){
        element2 = document.createElement('option');
        //element2.value=designation[index];

        //convert object in to string
        element2.value=JSON.stringify(dataList[index]);

        element2.innerText=dataList[index][displayProperty1]+"==>"+dataList[index][displayProperty2]
        if(selectedvalue == dataList[index][displayProperty1]){
            element2.selected="selected";
        }

        feildid.appendChild(element2);


    }

    if(visibality)
        feildid.disabled = true;
    else
        feildid.disabled = false;

}

function setStyle(style){
    floatingFName.style.borderBottom=style;
    floatingLName.style.borderBottom=style;
    floatingSelectClass.style.borderBottom=style;

}

//function for check errors
const checkErrors = () =>{

    let errors = "";

    if(stureg.class_implementation_id == null){
        errors = errors+"Please Select Class name..<br>";
        floatingSelectClass.style.borderBottom="2px solid red";
    }


    if(stureg.registration_status_id == null){
        errors = errors+"Please Select Registration Status..<br>";
        floatingSelectStatus.style.borderBottom="2px solid red";
    }

    if(stureg.student_id == null){
        errors = errors+"Please enter valid student ID..<br>";
        floatingFName.style.borderBottom="2px solid red";
    }

    return errors;


}

const buttonAddMc = () =>{
    console.log(stureg)

    let errors = checkErrors();


    if(errors == ""){

        //Show the confirmation box when the Add button is clicked
        iziToast.show({
            theme: 'dark',
            title: "Are You Suer to Add following Student registration ..?",
            message: "Student Code: " + stureg.student_id.studentid + "<br>Class Code: " +stureg.class_implementation_id.class_name,
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

                    $.ajax("/stureg",{
                        async : false,
                        type:"POST",//Method
                        data:JSON.stringify(stureg),//data that pass to backend
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
                            title: 'Student Registration Successfully',
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
    console.log(stureg)
    console.log(old_stureg)
    let updates = "";
    if (stureg != null && old_stureg != null) {

        if(stureg.student_id.studentid != old_stureg.student_id.studentid) {
            updates = updates + "Student ID Has Changed..<br>"
        }

        if (stureg.class_implementation_id.class_code != old_stureg.class_implementation_id.class_code) {
            updates = updates + "Student Class Has Changed..<br>"
        }


        if (stureg.registration_status_id.name != old_stureg.registration_status_id.name) {
            updates = updates + "Registration Status Has Changed..<br>"
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

                        $.ajax("/stureg",{
                            async : false,
                            type:"PUT",//Method
                            data:JSON.stringify(stureg),//data that pass to backend
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
                                title: 'Details Update Successfully',
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

