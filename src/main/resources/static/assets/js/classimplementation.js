//Function for browser onload event
window.addEventListener('load', refreshBrowser);

//Create function for browser onload event
function refreshBrowser() {
    refreshTable();
    refreshForm();
    refreshGradeForm();
    refreshSubjectForm();
}

//define refresh table
const refreshTable = () =>{
    //array for store processor data
    classimplementation = new Array();
    classimplementation=httpGetRequest("/classImplementation/findall")

    //create display property list
    let display_property_list = ["class_name","institute_implementation_id.inst_name","class_code","class_status_id.name"]

    //cretae display property type list
    let display_property_datatype = ["text","object","text","object"]

    //calling fillTable function
    fillTable(classimple_table,classimplementation,display_property_list,display_property_datatype,formReFill,rowDelete,rowView,true)


    for (let index in classimplementation){
        if (classimplementation[index].class_status_id.name == "Deleted"){
            classimple_table.children[1].children[index].children[5].children[2].disabled = true;
            classimple_table.children[1].children[index].children[5].children[0].disabled = true;
        }
    }

    //To add data table
    $('#classimple_table').dataTable();

}

const refreshSubjectForm = () => {

    subject = new Object();
    oldsubject = null;

    txtSubject.value = "";

    setStyle("1px solid #ced4da");
}

const checkSubject = () =>{

    let errors = "";

    if(subject.name == null){
        errors = errors+"Please enter Subject..<br>";
        txtSubject.style.borderBottom="2px solid red";
    }

    return errors;

}


const buttonAddSubjectMc = () =>{

    let errors = checkSubject();


    if(errors == ""){

        //Show the confirmation box when the Add button is clicked
        iziToast.show({
            theme: 'dark',
            title: "Are You Sure To Add following Subject ..?",
            message: "Subject " + subject.name,
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

                    $.ajax("/subject",{
                        async : false,
                        type:"POST",//Method
                        data:JSON.stringify(subject),//data that pass to backend
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
                            title: 'Subject Add Successfully',
                            position: 'topRight',
                            overlay: true,
                            displayMode: 'once',
                            zindex: 2000,
                            animateInside: true,
                            closeOnEscape:true,
                            timeout: 2000,
                            closeOnClick: true,

                        });
                        refreshSubjectForm();
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




const refreshGradeForm = () => {

    grade = new Object();
    oldgrade = null;

    txtGrade.value = "";

    setStyle("1px solid #ced4da");
}



const checkGrade = () =>{

    let errors = "";

    if(grade.name == null){
        errors = errors+"Please enter Grade..<br>";
        txtGrade.style.borderBottom="2px solid red";
    }

    return errors;

}


const buttonAddGradeMc = () =>{

    let errors = checkGrade();


    if(errors == ""){

        //Show the confirmation box when the Add button is clicked
        iziToast.show({
            theme: 'dark',
            title: "Are You Sure To Add following Grade ..?",
            message: "Grade " + grade.name,
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

                    $.ajax("/grade",{
                        async : false,
                        type:"POST",//Method
                        data:JSON.stringify(grade),//data that pass to backend
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
                            title: 'Grade Add Successfully',
                            position: 'topRight',
                            overlay: true,
                            displayMode: 'once',
                            zindex: 2000,
                            animateInside: true,
                            closeOnEscape:true,
                            timeout: 2000,
                            closeOnClick: true,

                        });
                        refreshGradeForm();
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







const getClassName = () => {

    var name = "";
    var today = new Date();
    if(classimplementation.institute_implementation_id != null && classimplementation.grade_id != null && classimplementation.subject_id != null){
        name = classimplementation.institute_implementation_id.inst_name + " " + "-" + " " + classimplementation.grade_id.name + " " + classimplementation.subject_id.name + " " +"-" + " " + today.getFullYear()  ;
    }

    floatingCName.value = name;
    classimplementation.class_name = floatingCName.value;
    floatingCName.style.borderBottom = '2px solid green';


}







const formReFill = (obj) =>{
    classimplementation = httpGetRequest("/classImplementation/getbyid?id="+obj.id)
    old_classimplementation = httpGetRequest("/classImplementation/getbyid?id="+obj.id)


    //set value in to text feild
    floatingCName.value=classimplementation.class_name;

    let class_status = httpGetRequest("/classimplestatus/findall")

    //set value in to select feild
    fillSelectField(floatingSelectGrade,"",class_grade,"name",classimplementation.grade_id.name);
    fillSelectField(floatingSelectSubject,"",class_subject,"name",classimplementation.subject_id.name);
    fillSelectField(floatingSelectInstitute,"",institute,"inst_name",classimplementation.institute_implementation_id.inst_name);
    fillSelectField(floatingSelectClassStatus,"",class_status,"name",classimplementation.class_status_id.name);


    setStyle("2px solid green")

    disabledButton(false,true);

    $('#basicModal').modal('show')


}

const rowDelete = (obj) => {
    //Show the confirmation box when the delete button is clicked
    iziToast.show({
        theme: 'dark',
        title: 'Are you sure to delete the following Storage Device...?',
        message: "Class Name: " + obj.class_name ,
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

                $.ajax("/classImplementation",{
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
                        title: 'Class Deleted',
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
    printclass = new Object();
    printclass = httpGetRequest("/classImplementation/getbyid?id="+obj.id);

    td_classname.innerHTML = printclass.class_name;
    td_classcode.innerHTML = printclass.class_code;

    td_grade.innerHTML = printclass.grade_id.name;
    td_subject.innerHTML = printclass.subject_id.name;
    td_institute.innerHTML = printclass.institute_implementation_id.inst_name;
    td_classstatus.innerHTML = printclass.class_status_id.name;
    $('#ClassViewModel').modal('show')
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
    classimplementation = new Object();
    old_classimplementation = null

    console.log(classimplementation);

    //create array for fill select element

    // class_status = new Array();
    // class_status = httpGetRequest("/classimplestatus/findall")
    //
    // //auto select value
    // fillSelectField(floatingSelectClassStatus,"",class_status,"name","Active");
    // classimplementation.class_status_id = JSON.parse(floatingSelectClassStatus.value);


    class_status = new Array();
    class_status = httpGetRequest("/classimplestatus/findactive")

    //auto select value
    fillSelectField(floatingSelectClassStatus,"",class_status,"name","Active");
    classimplementation.class_status_id = JSON.parse(floatingSelectClassStatus.value);



    class_grade = new Array();
    class_grade = httpGetRequest("/grade/findall");


    fillSelectField(floatingSelectGrade,"",class_grade,"name","");



    class_subject = new Array();
    class_subject = httpGetRequest("/subject/findall");

    fillSelectField(floatingSelectSubject,"",class_subject,"name","");


    institute = new Array();
    institute = httpGetRequest("/institute/findall");

    fillSelectField(floatingSelectInstitute,"",institute,"inst_name","");




     //clear value after refesh
    floatingSelectGrade.value="";
    floatingSelectSubject.value="";
    floatingCName.value="";
    floatingSelectInstitute.value="";
    floatingSelectClassStatus.value="";


    //set style to default
    setStyle("1px solid #ced4da")

    disabledButton(true,false);

    //dissable status field
    //$('#floatingSelectClassStatus').prop('disabled', true);

}

function setStyle(style){
    floatingSelectGrade.style.borderBottom=style;
    floatingSelectSubject.style.borderBottom=style;
    floatingCName.style.borderBottom=style;
    floatingSelectInstitute.style.borderBottom=style;
    floatingSelectClassStatus.style.borderBottom=style;



}

//function for check errors

const checkErrors = () =>{
    console.log("check error")
    let errors = "";

    if(classimplementation.class_name == null){
        errors = errors+"Please enter Class Name..<br>";
        floatingCName.style.borderBottom="2px solid red";
    }

    if(classimplementation.grade_id == null){
        errors = errors+"Please enter Grade..<br>";
        floatingSelectGrade.style.borderBottom="2px solid red";
    }

    if(classimplementation.institute_implementation_id == null){
        errors = errors+"Please enter institute..<br>";
        floatingSelectInstitute.style.borderBottom="2px solid red";
    }


    if(classimplementation.subject_id == null){
        errors = errors+"Please Select Subject..<br>";
        floatingSelectSubject.style.borderBottom="2px solid red";
    }

    if(classimplementation.class_status_id == null){
        errors = errors+"Please Select Status..<br>";
        floatingSelectClassStatus.style.borderBottom="2px solid red";
    }


    return errors;


}

const buttonAddMc = () =>{
    console.log(classimplementation)

    let errors = checkErrors();


    if(errors == ""){

        //Show the confirmation box when the Add button is clicked
        iziToast.show({
            theme: 'dark',
            title: "Are You Sure To Register following Class ..?",
            message: "Class Name: " + classimplementation.class_name,
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

                    $.ajax("/classImplementation",{
                        async : false,
                        type:"POST",//Method
                        data:JSON.stringify(classimplementation),//data that pass to backend
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
                            title: 'Class Add Successfully',
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
    if (classimplementation != null && old_classimplementation != null) {

        if(classimplementation.class_name != old_classimplementation.class_name) {
            updates = updates + "Class name  Has Changed..<br>"
        }



        if (classimplementation.grade_id.name != old_classimplementation.grade_id.name) {
            updates = updates + "Grade Has Changed..<br>"
        }

        if (classimplementation.subject_id.name != old_classimplementation.subject_id.name) {
            updates = updates + "Subject Has Changed..<br>"
        }

        if (classimplementation.class_status_id.name != old_classimplementation.class_status_id.name) {
            updates = updates + "Class Status Has Changed..<br>"
        }

        if (classimplementation.institute_implementation_id.inst_name != old_classimplementation.institute_implementation_id.inst_name) {
            updates = updates + "Institute Name Has Changed..<br>"
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
                title: "Are You Sure Update Following Institute?",
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

                        $.ajax("/classImplementation",{
                            async : false,
                            type:"PUT",//Method
                            data:JSON.stringify(classimplementation),//data that pass to backend
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