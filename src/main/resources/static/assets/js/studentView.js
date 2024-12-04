//Function for browser onload event
window.addEventListener('load', refreshBrowser);

//Create function for browser onload event


const getAttendance = () => {

    attendancereport = httpGetRequest("/attendancereport/byclassandstu?class_implementation_id="+JSON.parse(floatingSelectClass.value).id+"&student_id="+loggeduser.student.id);

    let display_property_list = ['date','first_name','class_name','present_or_absent'];
    let display_property_datatype = ['text','text','text','text'];

    fillTable (tblAttendanceReportTable, attendancereport, display_property_list,display_property_datatype,formRefill, rowDelete, rowView,false);


}

const formRefill = () => {


}

const rowView = () => {

}

const rowDelete = () => {

}

const getpercentage = () => {




}




