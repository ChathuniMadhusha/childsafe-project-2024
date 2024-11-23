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
    institute = new Array();
    institute=httpGetRequest("/institute/findall")

    //create display property list
    let display_property_list = ["inst_name","location","contact_number","institute_status_id.name"]

    //cretae display property type list
    let display_property_datatype = ["text","text","text","object"]

    //calling fillTable function
    fillTable(ins_table,institute,display_property_list,display_property_datatype,formReFill,rowDelete,rowView,true)

    for (let index in institute){
        if (institute[index].institute_status_id.name == "Deleted"){
            ins_table.children[1].children[index].children[5].children[2].disabled = true;
            ins_table.children[1].children[index].children[5].children[0].disabled = true;
        }
    }


}



const formReFill = (obj) =>{
    institute = httpGetRequest("/institute/getbyid?id="+obj.id)
    old_institute = httpGetRequest("/institute/getbyid?id="+obj.id)


    //set value in to text feild
    floatingInsName.value=institute.inst_name;
    floatingLocation.value=institute.location;
    floatingMobile.value=institute.contact_number;
    floatingEmail.value=institute.email;


    //set value in to select feild
    fillSelectField(floatingSelectInsStatus,"",int_status,"name",institute.institute_status_id.name);

    setStyle("2px solid green")

    //disable add button
    disabledButton(false,true);

    $('#basicModal').modal('show')

}

const rowDelete = (obj) => {
    //Show the confirmation box when the delete button is clicked
    iziToast.show({
        theme: 'dark',
        title: 'Are you sure to delete the following Storage Device...?',
        message: "Institute Name: " + obj.inst_name + "<br>Location: " + obj.location,
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

                $.ajax("/institute",{
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
                        title: 'Institute Deleted',
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
    printinstitute = new Object();
    printinstitute = httpGetRequest("/institute/getbyid?id="+obj.id);

    td_insname.innerHTML = printinstitute.inst_name;
    td_location.innerHTML = printinstitute.location;
    td_cnumber.innerHTML = printinstitute.contact_number
    td_email.innerHTML = printinstitute.email
    td_insstatus.innerHTML = printinstitute.institute_status_id.name;
    $('#instituteViewModel').modal('show')
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
    institute = new Object();
    old_Institute = null;

    //create array for fill select element

    int_status = new Array();
    int_status = httpGetRequest("/institutestatus/findall")

    //auto select value
    fillSelectField(floatingSelectInsStatus,"",int_status,"name","Active");
    institute.institute_status_id = JSON.parse(floatingSelectInsStatus.value);


    //clear value after refesh
    floatingInsName.value="";
    floatingLocation.value="";
    floatingMobile.value="";
    floatingEmail.value="";


    //set style to default
    setStyle("1px solid #ced4da")

//disable update button
    disabledButton(true,false);


}

function setStyle(style){
    floatingInsName.style.borderBottom=style;
    floatingLocation.style.borderBottom=style;
    floatingMobile.style.borderBottom=style;
    floatingEmail.style.borderBottom=style;



}

//function for check errors

const checkErrors = () =>{
    console.log("check error")
    let errors = "";

    if(institute.inst_name == null){
        errors = errors+"Please enter Institute name..<br>";
        floatingInsName.style.borderBottom="2px solid red";
    }

    if(institute.location == null){
        errors = errors+"Please enter Location..<br>";
        floatingLocation.style.borderBottom="2px solid red";
    }

    if(institute.contact_number == null){
        errors = errors+"Please enter Contact number..<br>";
        floatingMobile.style.borderBottom="2px solid red";
    }

    if(institute.email == null){
        errors = errors+"Please enter Email..<br>";
        floatingEmail.style.borderBottom="2px solid red";
    }


    if(institute.institute_status_id == null){
        errors = errors+"Please Select Insitute Status..<br>";
        floatingSelectInsStatus.style.borderBottom="2px solid red";
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
            title: "Are You Suer To Register following Institute ..?",
            message: "Institute Name: " + institute.inst_name,
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

                    $.ajax("/institute",{
                        async : false,
                        type:"POST",//Method
                        data:JSON.stringify(institute),//data that pass to backend
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
    if (institute != null && old_institute != null) {

        if(institute.inst_name != old_institute.inst_name) {
            updates = updates + "Institute name  Has Changed..<br>"
        }

        if (institute.location != old_institute.location) {
            updates = updates + "Location Has Changed..<br>"
        }

        if (institute.contact_number != old_institute.contact_number) {
            updates = updates + "Contact Number Has Changed..<br>"
        }

        if (institute.email != old_institute.email) {
            updates = updates + "Email Has Changed..<br>"
        }

        if (institute.institute_status_id.name != old_institute.institute_status_id.name) {
            updates = updates + "Institute Status Has Changed..<br>"
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
                title: "Are You Suer Update Following Institute?",
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

                        $.ajax("/institute",{
                            async : false,
                            type:"PUT",//Method
                            data:JSON.stringify(institute),//data that pass to backend
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
                                title: 'Institute Update Successfully',
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