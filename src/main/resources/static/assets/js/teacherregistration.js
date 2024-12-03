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
    teacherregistration = new Array();
    teacherregistration=httpGetRequest("/teacherregistration/findall")

    //create display property list
    let display_property_list = ["teacher_reg_code","teacher_id.teacherid","class_implementation_id.class_name","teacher_reg_status_id.name"]

    //cretae display property type list
    let display_property_datatype = ["text","object","object","object"]

    //calling fillTable function
    fillTable(teacherregistration_tbl,teacherregistration,display_property_list,display_property_datatype,formReFill,rowDelete,rowView,true)


    for (let index in teacherregistration){
        if (teacherregistration[index].teacher_reg_status_id.name == "Deleted"){
            teacherregistration_tbl.children[1].children[index].children[5].children[2].disabled = true;
            teacherregistration_tbl.children[1].children[index].children[5].children[0].disabled = true;
        }
    }


}


const getFisrtName = () => {


    if(floatingTID.value != ""){
        let tid_pattern = new RegExp('^TE[0-9]{6}$')
        if(tid_pattern.test(floatingTID.value)){
            let tecode = floatingTID.value;
            te = httpGetRequest("/teacher/getbyteacherid?teacherid="+tecode);

            if (te !=""){
                teacherName.value = te.first_name;
                teacherregistration.teacher_id = te;
                floatingTID.style.borderBottom = "2px solid green";
            }else {
                floatingTID.style.borderBottom = "2px solid red";
                teacherregistration.teacher_id = null;
                teacherName.value = "";
            }


        }else{
            floatingTID.style.borderBottom = "2px solid red";
            teacherregistration.teacher_id = null;
            teacherName.value = "";
        }
    }else{
        teacherregistration.teacher_id = null;
        floatingTID.style.borderBottom = "2px solid red";

    }


}

const formReFill = (obj) =>{
    teacherregistration = httpGetRequest("/teacherregistration/getbyid?id="+obj.id)
    old_teacherregistration = httpGetRequest("/teacherregistration/getbyid?id="+obj.id)


    // //set value in to text feild
    floatingTID.value=teacherregistration.teacher_id.teacherid;
    teacherName.value=teacherregistration.teacher_id.first_name;


    // //set value in to select feild
    fillSelectField(floatingSelectStatus,"",tereg_status,"name",teacherregistration.teacher_reg_status_id.name);
    //fillSelectField(floatingSelectClassCode,"",classimple,"class_code",teacherregistration.class_implementation_id.class_code);
    fillSelectFieldtwoproperty(floatingSelectClassCode,"",classimple,"class_code","class_name",teacherregistration.class_implementation_id.class_code);

    //
    //
    setStyle("2px solid green")

    disabledButton(false,true);

    $('#basicModal').modal('show')
}

const rowDelete = (obj) => {
    //Show the confirmation box when the delete button is clicked
    iziToast.show({
        theme: 'dark',
        title: 'Are you sure to delete the following Teacher Regsitration...?',
        message: "Registration Code: " + obj.teacher_reg_code,
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

                $.ajax("/teacherregistration",{
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
                        title: 'Teacher Registration Deleted',
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
    printregistration = new Object();
    printregistration = httpGetRequest("/teacherregistration/getbyid?id="+obj.id);

    td_regcode.innerHTML =printregistration.teacher_reg_code;
    td_teacherid.innerHTML =printregistration.teacher_id.teacherid;
    td_firstname.innerHTML =printregistration.teacher_id.first_name;
    td_classcode.innerHTML =printregistration.class_implementation_id.class_code;
    td_status.innerHTML =printregistration.teacher_reg_status_id.name;

    $('#teacherRegViewModel').modal('show')
}

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
    teacherregistration = new Object();
    old_teacherregistration = null;

    //create array for fill select element

    classimple = new Array();
    classimple = httpGetRequest("/classImplementation/activeclass")

    fillSelectFieldtwoproperty(floatingSelectClassCode,"",classimple,"class_name","class_code","");


    tereg_status = new Array();
    tereg_status = httpGetRequest("/teacherregstatus/findall")

    //auto select value
    fillSelectField(floatingSelectStatus,"",tereg_status,"name","Active");
    teacherregistration.teacher_reg_status_id = JSON.parse(floatingSelectStatus.value);

    //clear value after refesh
    floatingTID.value="";
    floatingSelectClassCode.value="";
    floatingSelectStatus.value="";
    teacherName.value="";



    //set style to default
    setStyle("1px solid #ced4da")
    //dissable status field
    $('#floatingSelectStatus').prop('disabled', true);
    disabledButton(true,false);

}


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
    floatingTID.style.borderBottom=style;
    floatingSelectClassCode.style.borderBottom=style;
    floatingSelectStatus.style.borderBottom=style;




}

//function for check errors

const checkErrors = () =>{
    console.log("check error")
    let errors = "";

    if(teacherregistration.teacher_id == null){
        errors = errors+"Please enter Teacher Id..<br>";
        floatingTID.style.borderBottom="2px solid red";
    }

    if(teacherregistration.class_implementation_id == null){
        errors = errors+"Please enter Class code..<br>";
        floatingSelectClassCode.style.borderBottom="2px solid red";
    }


    if(teacherregistration.teacher_reg_status_id == null){
        errors = errors+"Please Select Teacher Registration Status..<br>";
        floatingSelectStatus.style.borderBottom="2px solid red";
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
            title: "Are You Suer To Add following Registration ..?",
            message: "Teacher ID: " + teacherregistration.teacher_id.teacherid,
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

                    $.ajax("/teacherregistration",{
                        async : false,
                        type:"POST",//Method
                        data:JSON.stringify(teacherregistration),//data that pass to backend
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
                            title: 'Institute Add Successfully',
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

const checkUpdates = () => {
    let updates = "";
    if (teacherregistration != null && old_teacherregistration != null) {

        if(teacherregistration.teacher_id.teacherid != old_teacherregistration.teacher_id.teacherid) {
            updates = updates + "Teacher ID  Has Changed..<br>"
        }

        if (teacherregistration.teacher_reg_status_id.name != old_teacherregistration.teacher_reg_status_id.name) {
            updates = updates + "Teacher Registration Status Has Changed..<br>"
        }

        if (teacherregistration.class_implementation_id.class_code != old_teacherregistration.class_implementation_id.class_code) {
            updates = updates + "Class Code Has Changed..<br>"
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
                title: "Are You Suer Update Following Registration?",
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

                        $.ajax("/teacherregistration",{
                            async : false,
                            type:"PUT",//Method
                            data:JSON.stringify(teacherregistration),//data that pass to backend
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
                                title: 'Teacher Registration Update Successfully',
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