//Function for browser onload event
window.addEventListener('load', refreshBrowser);

//Create function for browser onload event
function refreshBrowser(){
    loggeduser = httpGetRequest("/loguser")
}

const getAttendance = () => {

    attendancereport = httpGetRequest("/attendancereport/byclassandstu?class_implementation_id="+JSON.parse(floatingSelectClass.value).class_implementation_id.id+"&student_id="+loggeduser.student.id);
    console.log(attendancereport)

    let display_property_list = ['date','first_name','class_name','present_or_absent'];
    let display_property_datatype = ['text','text','text','text'];

    fillTable (tblAttendanceReportTable, attendancereport, display_property_list,display_property_datatype,formRefill, rowDelete, rowView,false);

    const result = calculatePresencePercentage(attendancereport);
    if (attendancereport != ""){
        precentage.value = "Present Percentage:"+Math.round(Number(result.presentPercentage))+"%";
    }else {precentage.value = ""}



}

const calculatePresencePercentage = (attendanceReport) => {
    const totalClassDays = attendanceReport.length;
    const presentDays = attendanceReport.filter(record =>
        record.present_or_absent === "Present"
    ).length;

    const presentPercentage = (presentDays / totalClassDays) * 100;
    return {
        totalClassDays,
        presentDays,
        presentPercentage: presentPercentage.toFixed(2)
    };
}

const formRefill = () => {


}

const rowView = () => {

}

const rowDelete = () => {

}

const getpercentage = () => {




}




