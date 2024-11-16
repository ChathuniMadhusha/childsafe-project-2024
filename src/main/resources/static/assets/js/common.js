const httpGetRequest = (url) => {
    let responce_data = new Array();
    $.ajax(url,{
        async:false,
        dataType:'json',
        success: function (data,status,xhr){
            responce_data = data;
        },
        error:function(rxhrdata,errorstatus,errorMessage){
            responce_data = [];
        }
    })

    return responce_data;
}

//validotors
const textFieldValidator = (feildid, pattern, object, property,oldObject) => {


    let ob = window[object];
    //console.log(ob);
    let old_ob =window[oldObject];
    //console.log(oldObject);

    if (feildid.value != "") {
        const namepattern = new RegExp(pattern);

        if (namepattern.test(feildid.value)) {
            ob[property] = feildid.value;

            //console.log(ob[property]);
            //console.log(old_ob[property]);

            if (old_ob != null && ob[property] != old_ob[property] ) {
                //update
                feildid.style.borderBottom = '2px solid orange';
            }else{
                feildid.style.borderBottom = '2px solid green';
            }

        } else {
            ob[property] = null;

            feildid.style.borderBottom = '2px solid red';
        }
    } else {
        ob[property] = null;

    }
}

const dateFeildValidate = (feildid, pattern, object, property,oldObject) => {
    let ob = window[object];
    let old_ob = window[oldObject];

    if (feildid.value != "") {
        ob[property] = feildid.value;

        if(old_ob != null && ob[property] != old_ob[property]){
            feildid.style.borderBottom = '2px solid orange';
        }else{feildid.style.borderBottom = '2px solid green';}



    } else {
        ob[property] = null;




    }
}

const selectValidater = (fieldId, pattern, object, property, oldObject) => {
    let ob = window[object];
    let oldOb = window[oldObject];

    if (fieldId.value != "") {
        ob[property] = JSON.parse(fieldId.value);

        if (oldOb != null && oldOb[property] != null && oldOb[property]['id'] != ob[property]['id']) {
            fieldId.style.borderBottom = '2px solid orange';
        } /*else if (oldOb == null && ob[property]['id']) {
            console.log("111")
            fieldId.style.borderBottom = '2px solid green';
        }*/else if(oldOb != null && oldOb[property] == null && ob[property]['id']){

            fieldId.style.borderBottom = '2px solid orange';
        } else {

            fieldId.style.borderBottom = '2px solid green';
        }
    } else {
        ob[property] = null;
        if (fieldId.required) {
            fieldId.style.borderBottom = '2px solid red';
        } else {
            fieldId.style.borderBottom = '1px solid #fff';
        }
    }
}




//form section

function fillSelectField(feildid,displayMg,dataList,displayProperty,selectedValue,visibality = false){

    feildid.innerHTML="";
    //placeholder

    element = document.createElement('option');
    element.value="";
    element.selected = "selected";
    element.disabled = 'disabled';
    element.innerText = displayMg;
    feildid.appendChild(element);



    //option
    for(index in dataList){
        element2 = document.createElement('option');


        //convert object in to string
        element2.value=JSON.stringify(dataList[index]);

        //element2.innerText=dataList[index][displayProperty];
        element2.innerText=getDataFromObject(dataList[index],displayProperty)

        if(getDataFromObject(dataList[index],displayProperty) == selectedValue){
            element2.selected = true;
            feildid.style.borderBottom="2px solid green"
        }

        feildid.appendChild(element2);
    }

    if(visibality)
        feildid.disabled = true;
    else
        feildid.disabled = false;



}

//Table Section

const fillTable = (tableid,dataList,propertyList,dataTypeList,modifyFunction,deleteFunction,viewFunction,buttonvisibility=true,userprivilage) => {

    //get tbody element
    tbody = tableid.children[1];
    //console.log(tbody);
    tbody.innerHTML="";//after delete a record table must clear else it refresh and data duplicate

    for(index in dataList){

        //create tr element
        tr = document.createElement("tr");

        //create td element
        td_index= document.createElement("td");
        td_index.innerText=parseInt(index)+1;
        tr.appendChild(td_index);

        //

        for(pro in propertyList){
            td=document.createElement("td");
            let data =dataList[index][propertyList[pro]];
            // console.log(emp_datatypeList[pro]);

            if(dataTypeList[pro] == "text"){
                if(data == null){
                    td.innerText="-";
                }else {td.innerText=data};
            }

            else if(dataTypeList[pro] == "yearbydate"){
                if(data == null){
                    td.innerText="-";
                }else {td.innerText=new Date(data).getFullYear()};
            }

            else if(dataTypeList[pro] == "decimal"){
                if(data == null) {
                    td.innerText = "-";
                }else {
                    td.innerText=parseFloat(data).toFixed(2)
                }
            }

            else if(dataTypeList[pro] == "image"){

                img=document.createElement("img");
                img.style.width = "30px";
                img.style.height = "30px"

                if(data == null){
                    img.src = "Resourse/Images/download.png";
                }else {img.src=data};

                td.appendChild(img);
            }

            else if(dataTypeList[pro] == "object"){
                td.innerText = getDataFromObject(dataList[index],propertyList[pro]);

            }

            else{
                td.innerText = dataTypeList[pro](dataList[index]);
                //console.log(dataList[index]);
            }



            tr.appendChild(td);
        }

        //create td for add modify button
        td_modify= document.createElement("td");

        //create button

        //create edit button
        edit_button = document.createElement("button");
        /*  edit_button.innerHTML='Edit';*/
        edit_button.innerHTML = "<i class='fas fa-edit'></i>";
        edit_button.classList.add("btn")
        edit_button.classList.add("btn-size")
        edit_button.classList.add("btn-outline-warning")

        edit_button.onclick = function (){
            //alert("Edit")
            let z = this.parentNode.parentNode.firstChild.innerHTML;
            //console.log(z);
            modifyFunction(dataList[parseInt(z)-1],parseInt(z)-1);
        };



        //create view button
        view_button = document.createElement("button");
        view_button.classList.add("btn")
        view_button.classList.add("btn-size")
        view_button.classList.add("btn-outline-info")
        view_button.style.margin="0 5px"
        /*view_button.innerHTML='View';*/
        view_button.innerHTML = "<i class='fa-solid fa-eye'></i>";


        view_button.onclick = function(event){
            //alert("View");

            let z = this.parentNode.parentNode.firstChild.innerHTML;
            //console.log(z);
            viewFunction(dataList[parseInt(z)-1],parseInt(z)-1);
        }

        //create delete button
        dlt_button = document.createElement("button")
        dlt_button.classList.add("btn")
        dlt_button.classList.add("btn-size")
        dlt_button.classList.add("btn-outline-danger")
        dlt_button.classList.add("delete-btn")
        /*dlt_button.innerHTML="Delete";*/
        dlt_button.innerHTML = "<i class='fas fa-trash-can'></i>";

        dlt_button.onclick = function(){
            //alert("Delete");
            let z = this.parentNode.parentNode.firstChild.innerHTML;
            deleteFunction(dataList[parseInt(z)-1],parseInt(z)-1);
        }



        td_modify.appendChild(edit_button);
        td_modify.appendChild(view_button);
        td_modify.appendChild(dlt_button);



        if(buttonvisibility)
            tr.appendChild(td_modify);

        tbody.appendChild(tr);



    }

}

const getDataFromObject = (obj,propertyPath) => {
    //console.log(obj);
    //console.log(propertyPath);

    let get = (modal,proPath) => {
        let proPaths = proPath.split(".")
        //console.log(modal[proPaths[0]]);
        //console.log(proPaths);


        if(proPaths.length > 1 && typeof modal[proPaths[0]] === "object"){
            //console.log(proPaths[1]);
            return get(modal[proPaths[0]],proPaths.splice(1).join('.'))
        }else{
            //console.log(modal[proPaths[0]]);
            return modal[proPaths[0]]
        }
    }

    let s = get(obj,propertyPath);
    return s;
}

function disabledButton(addbutton,updbutton) {

    if(addbutton){

        addbtn.disabled = false;
        $('#addbtn').css("pointer-events","all")
        $('#addbtn').css("cursor","pointer")

    }else{


        addbtn.disabled = true;
        $('#addbtn').css("pointer-events","all")
        $('#addbtn').css("cursor","not-allowed")



    }

    if(updbutton){
        console.log("aaa")
        updatebtn.disabled = false;
        $('#updatebtn').css("pointer-events","all")
        $('#updatebtn').css("cursor","pointer")
        $("#updatebtn").addClass("glow-on-hover");


    }else {

        console.log("bbb")
        updatebtn.disabled = true;
        $('#updatebtn').css("pointer-events","all")
        $('#updatebtn').css("cursor","not-allowed")


    }

}
