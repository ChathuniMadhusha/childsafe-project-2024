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
    let display_property_list = ["stu_class_code","student_id.studentid","class_implementation_id.class_name","class_implementation_id.institute_implementation_id.Inst_name"]

    //cretae display property type list
    let display_property_datatype = ["text","object","object","object"]

    //calling fillTable function
    fillTable(stucls_tbl,sturegs,display_property_list,display_property_datatype,formReFill,rowDelete,rowView,true)

    // for (let index in teachers){
    //     if (sturegs[index].registration_status_id.name == "Deleted"){
    //         stucls_tbl.children[1].children[index].children[3].children[2].disabled = true;
    //         stucls_tbl.children[1].children[index].children[3].children[0].disabled = true;
    //     }
    // }

}

const formReFill = (obj) =>{

    // parent = httpGetRequest("/parent/getbyid?id="+obj.id)
    // old_parent = httpGetRequest("/parent/getbyid?id="+obj.id)
    //
    //
    // //set value in to text feild
    // floatingFName.value=parent.first_name
    // floatingLName.value=parent.last_name
    // floatingEmail.value=parent.email;
    // floatingTextarea.value=parent.address;
    // floatingNIC.value=parent.nic;
    // floatingMobile.value=parent.mobile_number;
    // floatingPPassword.value=parent.te_password;
    // floatingStid.value=parent.student_id.studentid;
    //
    // //set value in to select feild
    // fillSelectField(floatingSelect,"",statuss,"name",parent.parent_status_id.name);
    //
    // //disable add button
    // disabledButton(false,true);
    //
    // //set style after refill
    // setStyle("2px solid green")
    //
    // //Enable status field
    // $('#floatingSelect').prop('disabled', false);



}

const rowDelete = (obj) => {
    //Show the confirmation box when the delete button is clicked
    // iziToast.show({
    //     theme: 'dark',
    //     title: 'Are you sure to delete the following Parent...?',
    //     message: "Paarent NIC: " + obj.nic + "<br>Parent Name: " + obj.first_name,
    //     layout: 2,
    //     position: 'topCenter',
    //     overlay: true,
    //     timeout: false,
    //     close:false,
    //     closeOnEscape: false,
    //     progressBar: false,
    //     buttons: [
    //         ['<button><b>Yes</b></button>', function (instance, toast) {
    //             // Do something when the "Yes" button is clicked
    //
    //             let delete_server_responce;
    //
    //             $.ajax("/parent",{
    //                 async : false,
    //                 type:"DELETE",//Method
    //                 data:JSON.stringify(obj),//data that pass to backend
    //                 contentType:"application/json",
    //                 success:function(succsessResData,successStatus,resObj){
    //                     delete_server_responce = succsessResData;
    //                 },error:function (errorResOb,errorStatus,errorMsg){
    //                     delete_server_responce = errorMsg;
    //                 }
    //             })
    //             if(delete_server_responce == "0"){
    //                 iziToast.success({
    //                     theme: 'dark',
    //                     title: 'Parent Deleted',
    //                     position: 'topRight',
    //                     overlay: true,
    //                     displayMode: 'once',
    //                     zindex: 999,
    //                     animateInside: true,
    //                     closeOnEscape:true,
    //                     timeout: 2000,
    //                     closeOnClick: true,
    //
    //                 });
    //                 refreshTable();
    //             }else{
    //                 iziToast.error({
    //                     title: 'An error occurred',
    //                     message: delete_server_responce,
    //                     position: 'topRight',
    //                     overlay: true,
    //                     closeOnEscape: false,
    //                     close: true,
    //                     layout: 2,
    //                     displayMode: 'once',
    //                     zindex: 999,
    //                     animateInside: true,
    //                     buttons: [
    //                         ['<button><b>OK</b></button>', function (instance, toast) {
    //                             instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
    //                         }, true]
    //                     ]
    //                 });
    //             }
    //             instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
    //
    //         }, true],
    //         ['<button>No</button>', function (instance, toast) {
    //             // Do something when the "No" button is clicked
    //             iziToast.warning({
    //                 title: 'Cancel',
    //             })
    //             instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
    //         }]
    //     ]
    // });
}

const rowView = (obj) =>{
    // printParent = new Object();
    // printParent = httpGetRequest("/parent/getbyid?id="+obj.id);
    //
    //
    // td_fname.innerHTML = printParent.first_name;
    // td_sadd.innerHTML = printParent.address;
    // td_id.innerHTML = printParent.nic;
    // td_lname.innerHTML = printParent.last_name;
    // td_smobile.innerHTML = printParent.mobile_number;
    // td_semail.innerHTML = printParent.email;
    // td_stid.innerHTML = printParent.student_id.studentid;
    // td_stname.innerHTML = printParent.student_id.first_name;
    // td_sstatus.innerHTML = printParent.parent_status_id.name;
    // $('#parentViewModel').modal('show')
}

// const parentPrintModel = () => {
//     let newWindow = window.open();
//     newWindow.document.write(
//         '<link rel="stylesheet" href="Resourse/bootstrap/css/bootstrap.min.css">'+'<script src="Resourse/Jquary/jquary.js"></script>'
//         +"<h2>Parent Details</h2>"
//         + tablePrintTbl.outerHTML);
//     //newWindow.print();
//     setTimeout(function() {
//         newWindow.print();
//     },1000)
// }
