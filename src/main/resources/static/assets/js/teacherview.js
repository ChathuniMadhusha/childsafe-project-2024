//Function for browser onload event
window.addEventListener('load', refreshBrowser);

//Create function for browser onload event
function refreshBrowser() {
    refreshForm();

}

const refreshForm = () => {
     loggeduser = httpGetRequest("/loguser")
    if (loggeduser != null) {
        teacherFName.innerText = "Hello.." + loggeduser.teacher.first_name + " " + loggeduser.teacher.last_name;
        teacherID.innerText = loggeduser.teacher.teacherid;
    }

    let registerClassCount = httpGetRequest("/teacherregistration/getclassaccorteacher?teacherid=" + loggeduser.teacher.id);
    regClassCount.innerText = registerClassCount.teacher_reg_code;

    getregistrationaccorteacher = httpGetRequest("/teacherregistration/getclasslistaccorteac?teacherid=" + loggeduser.teacher.id)
    fillSelectField(floatingSelectClass, "Select Class Name", getregistrationaccorteacher, 'class_implementation_id.class_name', '');

}

function getTableDetails(){
    classDetails = httpGetRequest("/teacherview/getclassdetailsbyid/" + JSON.parse(floatingSelectClass.value).class_implementation_id.id)

    console.log(classDetails);

    // Get the tbody element and clear its contents
    let tbody = tblAttendanceMark.children[1];
    tbody.innerHTML = "";

    // Generate rows dynamically based on the classDetails array
    classDetails.forEach((detail, index) => {
        let row = document.createElement("tr");

        // Create and append cells for the row
        let cellIndex = document.createElement("td");
        cellIndex.textContent = index + 1; // Serial number
        row.appendChild(cellIndex);

        let cellDate = document.createElement("td");
        cellDate.textContent = detail.date; // Date property
        row.appendChild(cellDate);

        let cellClassName = document.createElement("td");
        cellClassName.textContent = detail.class_implementation_id.class_name; // Class name property
        row.appendChild(cellClassName);

        let cellPresentCount = document.createElement("td");
        cellPresentCount.textContent = detail.present_count; // present count property
        row.appendChild(cellPresentCount);

        let cellAbsentCount = document.createElement("td");
        cellAbsentCount.textContent = detail.absent_count; // present count property
        row.appendChild(cellAbsentCount);

        let cellPercentage = document.createElement("td");

        // Detailed logging
        console.log("Raw present_count:", detail.present_count);
        console.log("Raw absent_count:", detail.absent_count);
        console.log("Type of present_count:", typeof detail.present_count);
        console.log("Type of absent_count:", typeof detail.absent_count);

        let totalCount = detail.present_count + detail.absent_count;
        console.log("Total Count:", totalCount);

        let presentage = Math.round((Number(detail.present_count) / (Number(detail.present_count) + Number(detail.absent_count))) * 100);
        console.log("Calculated Percentage:", presentage);

        cellPercentage.textContent = presentage + "%";
        row.appendChild(cellPercentage);

        // Append the row to the table body
        tbody.appendChild(row);
    });
}


