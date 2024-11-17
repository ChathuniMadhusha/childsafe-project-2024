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
    patents = new Array();
    parents=httpGetRequest("/parent/findall")

    //create display property list
    let display_property_list = ["first_name","nic","mobile_number","student_id.studentid","parent_status_id.name"]

    //cretae display property type list
    let display_property_datatype = ["text","text","text","object","object"]

    //calling fillTable function
    fillTable(prnt_table,parents,display_property_list,display_property_datatype,formReFill,rowDelete,rowView,true)

    for (let index in parents){
        if (parents[index].parent_status_id.name == "Deleted"){
            prnt_table.children[1].children[index].children[6].children[2].disabled = true;
            prnt_table.children[1].children[index].children[6].children[0].disabled = true;
        }
    }

}

const formReFill = (obj) =>{

    parent = httpGetRequest("/parent/getbyid?id="+obj.id)
    old_parent = httpGetRequest("/parent/getbyid?id="+obj.id)


    //set value in to text feild
    floatingFName.value=parent.first_name
    floatingLName.value=parent.last_name
    floatingEmail.value=parent.email;
    floatingTextarea.value=parent.address;
    floatingNIC.value=parent.nic;
    floatingMobile.value=parent.mobile_number;
    floatingPPassword.value=parent.te_password;
    floatingStid.value=parent.student_id.studentid;

    //set value in to select feild
    fillSelectField(floatingSelect,"",statuss,"name",parent.parent_status_id.name);

    //disable add button
    disabledButton(false,true);

    //set style after refill
    setStyle("2px solid green")

    //Enable status field
    $('#floatingSelect').prop('disabled', false);



}

const rowDelete = (obj) => {
    //Show the confirmation box when the delete button is clicked
    iziToast.show({
        theme: 'dark',
        title: 'Are you sure to delete the following Parent...?',
        message: "Paarent NIC: " + obj.nic + "<br>Parent Name: " + obj.first_name,
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

                $.ajax("/parent",{
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
                        title: 'Parent Deleted',
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
    // printTeacher = new Object();
    // printTeacher = httpGetRequest("/teacher/getbyid?id="+obj.id);
    //
    // td_id.innerHTML = printTeacher.teacherid;
    // td_fname.innerHTML = printTeacher.first_name;
    // td_lname.innerHTML = printTeacher.last_name;
    // td_smobile.innerHTML = printTeacher.mobile_number;
    // td_snic.innerHTML = printTeacher.nic;
    // td_sadd.innerHTML = printTeacher.dob;
    // td_sdob.innerHTML = printTeacher.address;
    // td_semail.innerHTML = printTeacher.email;
    // td_sstatus.innerHTML = printTeacher.teacher_status_id.name;
    // $('#teacherViewModel').modal('show')
}

const refreshForm = () =>{
    parent = new Object();
    old_parent = null;

    //create array for get data to select element
    statuss = new Array();
    statuss = httpGetRequest("/parentstatus/findall")


    //auto select value
    fillSelectField(floatingSelect,"",statuss,"name","Active");
    parent.parent_status_id = JSON.parse(floatingSelect.value);


    //clear value after refesh
    floatingFName.value="";
    floatingLName.value="";
    floatingNIC.value="";
    floatingEmail.value="";
    floatingTextarea.value="";
    floatingMobile.value="";
    floatingPPassword.value="";
    floatingStid.value="";

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
    floatingEmail.style.borderBottom=style;
    floatingTextarea.style.borderBottom=style;
    floatingMobile.style.borderBottom=style;
    floatingPPassword.style.borderBottom=style;
    floatingStid.style.borderBottom=style;

}

const findStudentID = () => {


    if(floatingStid.value != ""){
        let sid_pattern = new RegExp('^ST[0-9]{4}[1-9]$')
        if(sid_pattern.test(floatingStid.value)){
            let stcode = floatingStid.value;
            stu = httpGetRequest("/student/getbystudentno?studentno="+stcode);

            if (stu !=""){
                stuName.value = stu.first_name;
                parent.student_id = stu;
                floatingStid.style.borderBottom = "2px solid green";
            }else {
                floatingStid.style.borderBottom = "2px solid red";
                parent.student_id = null;
                stuName.value = "";
            }


        }else{
            floatingStid.style.borderBottom = "2px solid red";
            parent.student_id = null;
            stuName.value = "";
        }
    }else{
        parent.student_id = null;
        floatingStid.style.borderBottom = "2px solid red";

    }
}

const getParentByNic = () =>{
    if(floatingNIC.value != ""){
        let nic_pattern = new RegExp('^(([0-9]{9}[V|v|X|x])|([0-9]{12}))$')
        if(nic_pattern.test(floatingNIC.value)){
            let prnic = floatingNIC.value;
            exnic = httpGetRequest("/parent/getbynic?nic="+prnic);

            if (exnic !=""){

                floatingFName.value = exnic.first_name
                parent.first_name = floatingFName.value
                $('#floatingFName').prop('disabled', true);

                floatingLName.value = exnic.last_name
                parent.last_name = floatingLName.value
                $('#floatingLName').prop('disabled', true);

                floatingEmail.value = exnic.email
                parent.email = floatingEmail.value
                $('#floatingEmail').prop('disabled', true);

                floatingTextarea.value = exnic.address
                parent.address = floatingTextarea.value
                $('#floatingTextarea').prop('disabled', true);

                floatingMobile.value = exnic.mobile_number
                parent.mobile_number = floatingMobile.value
                $('#floatingMobile').prop('disabled', true);

                floatingPPassword.value = exnic.pr_password
                parent.pr_password = floatingPPassword.value
                $('#floatingPPassword').prop('disabled', true);

                //floatingSelect.value = exnic.parent_status_id;
                //fillSelectField(floatingSelect,"",exnic,"parent_status_id.name","");
                //parent.parent_status_id = JSON.parse(floatingSelect.value);

            }else {
                floatingFName.value = "";
                floatingLName.value = "";
                floatingEmail.value = "";
                floatingTextarea.value = "";
                floatingMobile.value = "";
                floatingPPassword.value = "";

                $('#floatingFName').prop('disabled', false);
                $('#floatingLName').prop('disabled', false);
                $('#floatingEmail').prop('disabled', false);
                $('#floatingTextarea').prop('disabled', false);
                $('#floatingMobile').prop('disabled', false);
                $('#floatingPPassword').prop('disabled', false);
            }


        }else{
            floatingNIC.style.borderBottom = "2px solid red";
            parent.nic = null;

        }
    }else{
        floatingNIC.style.borderBottom = "2px solid red";
        parent.nic = null;

    }
}

//function for check errors
const checkErrors = () =>{
    console.log("check error")
    let errors = "";

    if(parent.first_name == null){
        errors = errors+"Please enter parent First Name..<br>";
        floatingFName.style.borderBottom="2px solid red";
    }

    if(parent.last_name == null){
        errors = errors+"Please enter parent Last Name..<br>";
        floatingLName.style.borderBottom="2px solid red";
    }

    if(parent.email == null){
        errors = errors+"Please enter parent Mail..<br>";
        floatingEmail.style.borderBottom="2px solid red";
    }

    if(parent.nic == null){
        errors = errors+"Please enter parent NIC..<br>";
        floatingNIC.style.borderBottom="2px solid red";
    }

    if(parent.mobile_number == null){
        errors = errors+"Please enter parent Mobile..<br>";
        floatingMobile.style.borderBottom="2px solid red";
    }

    if(parent.address == null){
        errors = errors+"Please enter parent Address..<br>";
        floatingTextarea.style.borderBottom="2px solid red";
    }

    if(parent.pr_password == null){
        errors = errors+"Please enter parent Password..<br>";
        floatingPPassword.style.borderBottom="2px solid red";
    }

    if(parent.parent_status_id == null){
        errors = errors+"Please Select parent Status..<br>";
        floatingSelect.style.borderBottom="2px solid red";
    }

    if(parent.student_id == null){
        errors = errors+"Please enter valid student ID..<br>";
        floatingStid.style.borderBottom="2px solid red";
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
            title: "Are You Suer To Register following Parent ..?",
            message: "Parent Name: " + parent.first_name,
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

                    $.ajax("/parent",{
                        async : false,
                        type:"POST",//Method
                        data:JSON.stringify(parent),//data that pass to backend
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

//Check updates for object
const checkUpdates = () => {
    let updates = "";
    if (parent != null && old_parent != null) {

        if(parent.first_name != old_parent.first_name) {
            updates = updates + "parent First Name  Has Changed..<br>"
        }

        if (parent.last_name != old_parent.last_name) {
            updates = updates + "parent Last Name Has Changed..<br>"
        }

        if (parent.mobile_number != old_parent.mobile_number) {
            updates = updates + "parent Mobile Has Changed..<br>"
        }


        if (parent.address != old_parent.address) {
            updates = updates + "parent Address Has Changed..<br>"
        }

        if (parent.email != old_parent.email) {
            updates = updates + "parent Email Has Changed..<br>"
        }

        if (parent.nic != old_parent.nic) {
            updates = updates + "parent NIC Has Changed..<br>"
        }

        if (parent.pr_password != old_parent.pr_password) {
            updates = updates + "parent Password Has Changed..<br>"
        }

        if (parent.parent_status_id.name != old_parent.parent_status_id.name) {
            updates = updates + "parent Status Has Changed..<br>"
        }

        if (parent.student_id.studentid != old_parent.student_id.studentid) {
            updates = updates + "parent's Student Id Has Changed..<br>"
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
                title: "Are You Suer Update Following Parent?",
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

                        $.ajax("/parent",{
                            async : false,
                            type:"PUT",//Method
                            data:JSON.stringify(parent),//data that pass to backend
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
                                title: 'Parent Update Successfully',
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
                                message: update_server_responce,
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