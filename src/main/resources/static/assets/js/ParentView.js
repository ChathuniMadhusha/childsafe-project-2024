//Function for browser onload event
window.addEventListener('load', refreshBrowser);

//Create function for browser onload event
function refreshBrowser(){
    loggeduser = httpGetRequest("/loguser")

    stu_list = httpGetRequest("/student/getStByParenetNIC?nic="+loggeduser.parent.nic);
    fillSelectFieldtwoproperty(floatingSelectStudent,"",stu_list,"first_name","studentid","first_name");

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

function getRegisteredClass (){
    clz_list = httpGetRequest("/stureg/getclasslistaccorstu?studentid="+JSON.parse(floatingSelectStudent.value).id);

    fillSelectField(floatingSelectClass,"",clz_list,"class_implementation_id.class_name","");
    ttttbody.innerHTML="";
}


const getAttendance = () => {

    attendancereport = httpGetRequest("/attendancereport/byclassandstu?class_implementation_id="+JSON.parse(floatingSelectClass.value).class_implementation_id.id+"&student_id="+JSON.parse(floatingSelectStudent.value).id);
    console.log(attendancereport)

    let display_property_list = ['date','first_name','class_name','present_or_absent'];
    let display_property_datatype = ['text','text','text','text'];

    fillTable (tblAttendanceReportTable, attendancereport, display_property_list,display_property_datatype,formRefill, rowDelete, rowView,false);

    const result = calculatePresencePercentage(attendancereport);
    if (attendancereport != ""){
        precentage.value = "Present Percentage : "+Math.round(Number(result.presentPercentage))+"%";
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




