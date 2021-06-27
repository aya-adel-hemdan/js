
var Savecountt=0;
var saveMode=0;

function Save_Customer() {
    if(saveMode==1) {
        console.log("inside save customer")
        var form = document.getElementById('myForm1'); // give the form an ID
        if (Savecountt > 0) {
            var olddata = document.getElementById("myForm1").lastChild;
            document.getElementById("myForm1").removeChild(olddata);
            var oldold = document.getElementById("myForm1").lastChild;
            document.getElementById("myForm1").removeChild(oldold);
        }

        if (document.getElementById("active").checked == false) {
            document.getElementById("active").value = 0;
            document.getElementById("active").checked = true;
        }
        //form.append("id",parseInt(dbidd));
        //console.log("databaseid "+dbiddd);
        var us_value = document.createElement("input");
        us_value.setAttribute("type", "text");
        us_value.setAttribute("name", "us");
        us_value.setAttribute("id", "us");
        us_value.setAttribute("value", us_desc);
        us_value.style.display = "none";
        // databaseid.setAttribute("value",dbidd );
        form.appendChild(us_value);

        var ar_value = document.createElement("input");
        ar_value.setAttribute("type", "text");
        ar_value.setAttribute("name", "ar");
        ar_value.setAttribute("id", "ar");
        ar_value.setAttribute("value", ar_desc);
        ar_value.style.display = "none";
        // databaseid.setAttribute("value",dbidd );
        console.log("ar_value  " + ar_value.value);
        form.appendChild(ar_value);

        //form.setAttribute("action","/UpdateDocument")
        var xhr = new XMLHttpRequest();              // create XMLHttpRequest
        var data = new FormData(form);                // create formData object
        console.log("data " + data.get("us"));
        xhr.open("post", "/Add_Lookup_data");      // open connection

        xhr.send(data);
        console.log(xhr.responseText);
        Savecountt++;

        //window.location.replace("AddCustomerMainData");
        window.location.replace("/Add_Lookup");

    }
}
//////////////////////////////////////////////////////////////////////////////////////
function activeSave() {

    var description=document.getElementById("username").value;
    var newinput = document.createElement("input");
    var forme=document.createElement("form");
    newinput.setAttribute("type", "text");
    newinput.setAttribute("name", "desc");
    newinput.setAttribute("id", "desc");
    newinput.setAttribute("value", description);
    newinput.style.display = "none";
    // databaseid.setAttribute("value",dbidd );
    console.log("longid  " + description);
    //forme.method="post";
    forme.appendChild(newinput);

    //form.setAttribute("action","/UpdateDocument")
    var xhr = new XMLHttpRequest();              // create XMLHttpRequest
    var data = new FormData(forme);                // create formData object
    console.log("data " + data.get("id"));
    xhr.open("GET", "/findLookupDescription?desc="+description);      // open connection
    xhr.send();
    xhr.onload = function () {

        console.log(this.responseText);
        var result = this.responseText;
        if (result.includes("true")) {
            alert("invalid Description value 'should be unique value'");
        } else {
            saveMode = 1;
            console.log("inside active save");
            validate();
            //document.getElementById("username").onkeyup="validate()";
            document.getElementById("username").addEventListener("keyup", validate);
            document.getElementById("LookupTypes").addEventListener("change", validate);
        }
    }
}


var statuss=0;
var errorMessage=new Array();

function validate() {
    var tablee=document.getElementById("maintable");

    var name=document.myForm1.username.value;
    var lookuptype=document.myForm1.lookupTypes.value;

    var nameFormat = /^([a-zA-Z ]){2,30}$/;
    //var emailFormat=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // var creditFormat=/[1-9][0-9]*/;

    var nameindex=document.getElementById("username").parentNode.parentNode.rowIndex;
    var typeindex=document.getElementById("LookupTypes").parentNode.parentNode.rowIndex;
    if(nameindex-typeindex>1)
    {
        document.getElementById("LookupTypes").style.border="1px solid #EFEEEE";
        tablee.deleteRow(typeindex+1);
        errorMessage=[];
    }
    nameindex=document.getElementById("username").parentNode.parentNode.rowIndex;
    var activeindex=document.getElementById("active").parentNode.parentNode.rowIndex;
    if(activeindex-nameindex>1)
    {
        document.getElementById("username").style.border="1px solid #EFEEEE";
        tablee.deleteRow(nameindex+1);
        errorMessage=[];
    }

    if( lookuptype=="" ){
        document.getElementById("LookupTypes").style.border = "1px solid red";

        var row = tablee.insertRow(1);
        row.setAttribute("class","row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className="column1";

        var cellLeft2 = row.insertCell(1);
        var textNode2 = document.createTextNode("this field is required");
        //el_span1.appendChild(textNode1);
        cellLeft2.appendChild(textNode2);
        cellLeft2.className="input1";
        cellLeft2.className="spann";
        cellLeft2.style.float="left";

        var cellLeft3 = row.insertCell(2);
        var textNode3 = document.createTextNode("");
        cellLeft3.appendChild(textNode3);
        cellLeft3.className="column2";

        var cellLeft4 = row.insertCell(3);
        var textNode4 = document.createTextNode("");
        cellLeft4.appendChild(textNode4);


        statuss=1;
        errorMessage.push(statuss);
        saveMode=0;
    }
    if( (name=="" || !nameFormat.test(name) )){

        if(errorMessage.length<1)
        {var row = tablee.insertRow(2);  statuss=2;}
        else{var row = tablee.insertRow(3); statuss=3;}
        row.setAttribute("class","row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className="column1";

        var cellLeft2 = row.insertCell(1);
        var textNode2 = document.createTextNode("this field is required");
        document.getElementById("username").style.border = "1px solid red"
        cellLeft2.appendChild(textNode2);
        cellLeft2.className="input1";
        cellLeft2.className="spann";
        cellLeft2.style.float="left";

        var cellLeft3 = row.insertCell(2);
        var textNode3 = document.createTextNode("");
        cellLeft3.appendChild(textNode3);
        cellLeft3.className="column2";

        var cellLeft4 = row.insertCell(3);
        var textNode4 = document.createTextNode("");
        cellLeft4.appendChild(textNode4);


        // statuss=3;
        errorMessage.push(statuss);
        saveMode=0;
    }
    else if(errorMessage.length==0){
        Save_Customer();
    }
}

function checkparentdisable() {
    var lookuptype=document.getElementById("LookupTypes").value;
    if(lookuptype=="Cities")
    {
        document.getElementById("ParentLookup").disabled=false;
    }
    else
    {
        document.getElementById("ParentLookup").disabled=true;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////

var inputvalues=document.getElementById("result").value;
inputvalues=inputvalues.toString().split(",");
function updatefields() {
    console.log("input array "+ document.getElementById("result").value);
    console.log("inside update");
    if(inputvalues!="")
    {
        console.log("inside if");
        //document.getElementById("LookupTypes").value=inputvalues[0];
        for (var i = 0; i < document.getElementById("LookupTypes").options.length; ++i) {
            if (document.getElementById("LookupTypes").options[i].text === inputvalues[0]) document.getElementById("LookupTypes").options[i].selected = true;
        }
        document.getElementById("lookupCode").value=inputvalues[1];
        document.getElementById("username").value=inputvalues[6];
        if(inputvalues[3]!="null")
        {for (var i = 0; i < document.getElementById("ParentLookup").options.length; ++i) {
            if (document.getElementById("ParentLookup").options[i].text === inputvalues[3]) document.getElementById("ParentLookup").options[i].selected = true;
            document.getElementById("ParentLookup").disabled=false;
        }}
        else {document.getElementById("ParentLookup").disabled=true;}
        document.getElementById("savebtn").setAttribute("onclick","saveEdits()");

        document.getElementById("us").value=inputvalues[6];
        document.getElementById("ar").value=inputvalues[2];
        //document.getElementById("active").innerHTML=arr[5];

    }
}

function saveEdits() {

    var form = document.getElementById('myForm1'); // give the form an ID

    var databaseid = document.createElement("input");
    databaseid.setAttribute("type", "text");
    databaseid.setAttribute("name", "id");
    databaseid.setAttribute("id", "inputid");
    databaseid.setAttribute("value",inputvalues[5].toString() );
    databaseid.setAttribute("style", "display:none");
    // databaseid.setAttribute("value",dbidd );
    form.appendChild(databaseid);

    //form.setAttribute("action","/UpdateDocument")
    var xhr = new XMLHttpRequest();              // create XMLHttpRequest
    var data = new FormData(form);                // create formData object
    console.log("data "+data.get("id"));
    xhr.open("post", "/UpdateLookupData");      // open connection
    xhr.send(data);
    console.log(xhr.responseText);

}