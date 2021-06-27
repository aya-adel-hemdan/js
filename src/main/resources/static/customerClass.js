var editflag=0;
var arr=new Array();
// Get the modal
/*var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
    var name= document.getElementById("username").value;
    document.getElementById("us").value=name;
    document.getElementById("ar").value=name;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/////////////////////////////////////////////////////////////////////////////////

var us_desc='';
var ar_desc='';

function translateee() {
    us_desc=document.getElementById("us").value;
    ar_desc=document.getElementById("ar").value;
    modal.style.display = "none";
}*/
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
        xhr.open("post", "/Add_CustomerClass_data");      // open connection

        xhr.send(data);
        console.log(xhr.responseText);
        Savecountt++;

        //window.location.replace("AddCustomerMainData");
        window.location.replace("/Customer_Classes");
    }

}
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
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
    xhr.open("GET", "/findClassDescription?desc="+description);      // open connection
    xhr.send();
    xhr.onload = function () {

        console.log(this.responseText);
        var result = this.responseText;
        if(result.includes("true"))
        {alert("invalid Description value 'should be unique value'");}
        else
        {
            saveMode = 1;
            console.log("inside active save");
            validate();
            //document.getElementById("username").onkeyup="validate()";
            document.getElementById("username").addEventListener("keyup", validate);
            document.getElementById("PaymentMethods").addEventListener("change", validate);
            document.getElementById("currencyid").addEventListener("change", validate);
        }
    }


}
var statussClass=0;
var errorMessage=new Array();

function validate() {
    var tablee=document.getElementById("maintable");

    var name=document.myForm1.username.value;
    var method=document.myForm1.Paymentid.value;
    var currency=document.myForm1.currencyid.value;

    var nameFormat = /^([a-zA-Z ]){2,30}$/;
    //var emailFormat=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // var creditFormat=/[1-9][0-9]*/;

    if (errorMessage.length>0) {
        // console.log("statuss " + statuss)
        for(var i=0;i<errorMessage.length;i++ ) {

            tablee.rows[errorMessage[i] - i - 1].cells.item(1).childNodes[0].style.border="1px solid #EFEEEE";
            if(tablee.rows[errorMessage[i] - i - 1].cells.item(3)!=null)
                tablee.rows[errorMessage[i] - i - 1].cells.item(3).childNodes[0].style.border="1px solid #EFEEEE";

            tablee.deleteRow(errorMessage[i] - i);
        }

        errorMessage=[];
    }
    if( (name=="" || !nameFormat.test(name) )){
        document.getElementById("username").style.border = "1px solid red";

        var row = tablee.insertRow(1);
        row.setAttribute("class","row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className="column1";

        var cellLeft2 = row.insertCell(1);
        var textNode2 = document.createTextNode("");
        //el_span1.appendChild(textNode1);
        cellLeft2.appendChild(textNode2);
        cellLeft2.className="input1";

        var cellLeft3 = row.insertCell(2);
        var textNode3 = document.createTextNode("");
        cellLeft3.appendChild(textNode3);
        cellLeft3.className="column2";

        var cellLeft4 = row.insertCell(3);
        var textNode4 = document.createTextNode("user name should has at least one character");
        cellLeft4.appendChild(textNode4);
        cellLeft4.className="spann";
        cellLeft4.style.float="left";

        statussClass=1;
        errorMessage.push(statussClass);
        saveMode=0;
    }
    if ((method==""||currency==""))//||method==""||currency==""||credit==""||active=="")
    {
        if(errorMessage.length<1)
        {var row = tablee.insertRow(2);  statussClass=2;}
        else{var row = tablee.insertRow(2+errorMessage.length); statussClass=2+errorMessage.length;}
        row.setAttribute("class","row");
        row.setAttribute("class","row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className="column1";

        var cellLeft2 = row.insertCell(1);
        if(!currency==""){
            var textNode2 = document.createTextNode("");}
        else{document.getElementById("currencyid").style.border = "1px solid red";
            var textNode2 = document.createTextNode("this field is required");}
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
        if(!method==""){
            var textNode4 = document.createTextNode("");}
        else{ document.getElementById("PaymentMethods").style.border = "1px solid red";
            var textNode4 = document.createTextNode("this field is required");}
        cellLeft4.appendChild(textNode4);
        cellLeft4.className="spann";
        cellLeft4.style.float="left";

        // statuss=3;
        errorMessage.push(statussClass);
        saveMode=0;
    }
    else if(errorMessage.length==0){
        Save_Customer();
    }
}
var inputvalues="";
function updatefields() {
    console.log("input array "+ document.getElementById("result").value);

    inputvalues=document.getElementById("result").value.toString().split(",");

    console.log("inside update");
     if(inputvalues!="")
    {
        console.log("inside if");
        document.getElementById("code").value=inputvalues[0];
        document.getElementById("username").value=inputvalues[1];
        for (var i = 0; i < document.getElementById("currencyid").options.length; ++i) {
            if (document.getElementById("currencyid").options[i].text === inputvalues[3]) document.getElementById("currencyid").options[i].selected = true;
        }
        for (var i = 0; i < document.getElementById("PaymentMethods").options.length; ++i) {
            if (document.getElementById("PaymentMethods").options[i].text === inputvalues[4]) document.getElementById("PaymentMethods").options[i].selected = true;
        }
        document.getElementById("savebtn").setAttribute("onclick","saveEdits()");

        document.getElementById("us").value=inputvalues[5];
        document.getElementById("ar").value=inputvalues[6];
        //document.getElementById("active").innerHTML=arr[5];

    }
}

function saveEdits() {

    var form = document.getElementById('myForm1'); // give the form an ID
   /* if(updatecount>0)
    {
        var olddata=document.getElementById("myForm1").lastChild;
        document.getElementById("myForm1").removeChild(olddata);
    }*/
    //form.append("id",parseInt(dbidd));

    var databaseid = document.createElement("input");
    databaseid.setAttribute("type", "text");
    databaseid.setAttribute("name", "id");
    databaseid.setAttribute("id", "inputid");
    databaseid.setAttribute("value",inputvalues[7].toString() );
    databaseid.setAttribute("style", "display:none");
    // databaseid.setAttribute("value",dbidd );
    form.appendChild(databaseid);

    //form.setAttribute("action","/UpdateDocument")
    var xhr = new XMLHttpRequest();              // create XMLHttpRequest
    var data = new FormData(form);                // create formData object
    console.log("data "+data.get("id"));
    xhr.open("post", "/UpdateCustomerClassData");      // open connection
    xhr.send(data);
    console.log(xhr.responseText);

}