
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
    if(inputvalues==""){
    var name= document.getElementById("username").value;
    document.getElementById("us").value=name;
    document.getElementById("ar").value=name;}
    else
    {
        document.getElementById("us").value=inputvalues[1];
        document.getElementById("ar").value=inputvalues[13];
    }
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

////////////////////////////////////////////////////////////////////
var us_desc='';
var ar_desc='';
var Savecountt=0;
var saveMode=0;
function translateee() {
    us_desc=document.getElementById("us").value;
    ar_desc=document.getElementById("ar").value;
    modal.style.display = "none";
}

function changedisplay() {
    var longid=document.getElementById("classid").value;
    var ar_value = document.createElement("input");
    var forme=document.createElement("form");
    ar_value.setAttribute("type", "number");
    ar_value.setAttribute("name", "id");
    ar_value.setAttribute("id", "id");
    ar_value.setAttribute("value", longid);
    ar_value.style.display = "none";
    // databaseid.setAttribute("value",dbidd );
    console.log("longid  " + longid);
    forme.method="post";
    forme.appendChild(ar_value);

    //form.setAttribute("action","/UpdateDocument")
    var xhr = new XMLHttpRequest();              // create XMLHttpRequest
    var data = new FormData(forme);                // create formData object
    console.log("data " + data.get("id"));
    xhr.open("post", "/findcurrency");      // open connection
    xhr.send(data);
    console.log(xhr.responseText);
    var respo=xhr.responseText;
    xhr.overrideMimeType('text/xml');

    //respo=JSON.parse(respo);
    console.log(xhr.responseText);

    var doc = window.document.createElement("doc");
    doc.innerHTML = xhr.responseText;
    console.log(doc.innerHTML);

    if(!document.myForm1.classid.value=="")
    { document.getElementById("currencyid").disabled=false;
      document.getElementById("PaymentMethods").disabled=false;}
    else
    {
        document.getElementById("currencyid").disabled=true;
        document.getElementById("PaymentMethods").disabled=true;
    }

}

function changedisplay2() {
    var longid=document.getElementById("classid").value;
    var ar_value = document.createElement("input");
    var forme=document.createElement("form");
    ar_value.setAttribute("type", "number");
    ar_value.setAttribute("name", "id");
    ar_value.setAttribute("id", "id");
    ar_value.setAttribute("value", longid);
    ar_value.style.display = "none";
    // databaseid.setAttribute("value",dbidd );
    console.log("longid  " + longid);
    //forme.method="post";
    forme.appendChild(ar_value);

    //form.setAttribute("action","/UpdateDocument")
    var xhr = new XMLHttpRequest();              // create XMLHttpRequest
    var data = new FormData(forme);                // create formData object
    console.log("data " + data.get("id"));
    xhr.open("GET", "/findcurrency?id="+longid);      // open connection
    xhr.send();
    xhr.onload = function () {

        console.log(this.responseText);
        var result=this.responseText;
        var re=new Array();
        re=result.split(",");
        var currencyname=re[0];
        console.log(currencyname);
        var currencyidd=re[1];
        console.log(currencyidd);
        var paymentname=re[2];
        console.log(paymentname)
        var paymentidd=re[3];2
        console.log(paymentidd);

        //document.getElementById("currencyid").getElementsByTagName('option')[1].selected = 'selected';
        for (var i = 0; i < document.getElementById("currencyid").options.length; ++i) {
            if (document.getElementById("currencyid").options[i].text === currencyname) document.getElementById("currencyid").options[i].selected = true;
        }
        for (var i = 0; i < document.getElementById("PaymentMethods").options.length; ++i) {
            if (document.getElementById("PaymentMethods").options[i].text === paymentname) document.getElementById("PaymentMethods").options[i].selected = true;
        }

    };


    if(!document.myForm1.classid.value=="")
    { document.getElementById("currencyid").disabled=false;
        document.getElementById("PaymentMethods").disabled=false;}
    else
    {
        document.getElementById("currencyid").disabled=true;
        document.getElementById("PaymentMethods").disabled=true;
    }

}

function activeSave() {
    saveMode=1;
    console.log("inside active save");
    validate();
    //document.getElementById("username").onkeyup="validate()";
    document.getElementById("username").addEventListener("keyup",validate);
    document.getElementById("typeid").addEventListener("change",validate);
    document.getElementById("classid").addEventListener("change",validate);
    document.getElementById("PaymentMethods").addEventListener("change",validate);
    document.getElementById("currencyid").addEventListener("change",validate);
    document.getElementById("credit").addEventListener("keyup",validate);
    document.getElementById("credit").addEventListener("change",validate);
    document.getElementById("statusid").addEventListener("change",validate);
    document.getElementById("taxNumber").addEventListener("keyup",validate);
    document.getElementById("vatID").addEventListener("keyup",validate);
    document.getElementById("TaxRegistrationID").addEventListener("keyup",validate);
    document.getElementById("startDate").addEventListener("keyup",validate);
    document.getElementById("startDate").addEventListener("change",validate);
    document.getElementById("endDate").addEventListener("keyup",validate);
    document.getElementById("endDate").addEventListener("change",validate);

}

function Save_Customer() {
    if(saveMode==1) {
        var form = document.getElementById('myForm1'); // give the form an ID
        if (Savecountt > 0) {
            var olddata = document.getElementById("myForm1").lastChild;
            document.getElementById("myForm1").removeChild(olddata);
            var oldold = document.getElementById("myForm1").lastChild;
            document.getElementById("myForm1").removeChild(oldold);
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
        xhr.open("post", "/contact_info");      // open connection
        xhr.send(data);
        xhr.onload = function () {
                if(xhr.responseText.split(",")[0]==0)
                    alert(xhr.responseText.split(",")[1]);
                else
                    alert("added successfully");

        }
        console.log(xhr.responseText);

        Savecountt++;

        //window.location.replace("AddCustomerMainData");
        //window.location.replace("AddCustomerMainData");
        saveMode=0;
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////
var statuss=0;
var errorMessage=new Array();
function validate() {
    var tablee=document.getElementById("maintable");

    var name=document.myForm1.username.value;
    var customerType=document.myForm1.typeid.value;
    var classs=document.myForm1.classid.value;
    var method=document.myForm1.Paymentid.value;
    var currency=document.myForm1.currencyid.value;
    var credit=document.myForm1.credit.value;
    var active=document.myForm1.statusid.value;
    var taxid=document.myForm1.taxNumber.value;
    var commercialid=document.myForm1.TaxRegistrationID.value;
    var vatid=document.myForm1.vatID.value;
    var startdate=document.myForm1.startDate.value;
    var enddate=document.myForm1.endDate.value;

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

        statuss=1;
        errorMessage.push(statuss);
        saveMode=0;
    }

     if (customerType==""||classs=="")//||method==""||currency==""||credit==""||active=="")
    {
        if(errorMessage.length<1)
        {var row = tablee.insertRow(2);  statuss=2;}
        else{var row = tablee.insertRow(2+errorMessage.length); statuss=2+errorMessage.length;}
        row.setAttribute("class","row");
        row.setAttribute("class","row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className="column1";

        var cellLeft2 = row.insertCell(1);
        if(!customerType==""){
            var textNode2 = document.createTextNode("");}
        else{document.getElementById("typeid").style.border = "1px solid red";
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
        if(!classs==""){
            var textNode4 = document.createTextNode("");}
        else{ document.getElementById("classid").style.border = "1px solid red";
            var textNode4 = document.createTextNode("this field is required");}
        cellLeft4.appendChild(textNode4);
        cellLeft4.className="spann";
        cellLeft4.style.float="left";

       // statuss=2;
        errorMessage.push(statuss);
        saveMode=0;
    }
     if ((method==""||currency==""))//||method==""||currency==""||credit==""||active=="")
    {
        if(errorMessage.length<1)
        {var row = tablee.insertRow(3);  statuss=3;}
        else{var row = tablee.insertRow(3+errorMessage.length); statuss=3+errorMessage.length;}
        row.setAttribute("class","row");
        row.setAttribute("class","row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className="column1";

        var cellLeft2 = row.insertCell(1);
        if(!method==""){
            var textNode2 = document.createTextNode("");}
        else{document.getElementById("PaymentMethods").style.border = "1px solid red";
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
        if(!currency==""){
            var textNode4 = document.createTextNode("");}
        else{ document.getElementById("currencyid").style.border = "1px solid red";
            var textNode4 = document.createTextNode("this field is required");}
        cellLeft4.appendChild(textNode4);
        cellLeft4.className="spann";
        cellLeft4.style.float="left";

       // statuss=3;
        errorMessage.push(statuss);
        saveMode=0;
    }
     if (credit==""||active==""|| credit<0)
    {
        if(errorMessage.length<1)
        {var row = tablee.insertRow(4);  statuss=4;}
        else{var row = tablee.insertRow(4+errorMessage.length); statuss=4+errorMessage.length;}
        row.setAttribute("class","row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className="column1";

        var cellLeft2 = row.insertCell(1);
        if(!credit==""){
            //if(!creditFormat.test(credit))
            if(credit<0)
            {var textNode2 = document.createTextNode("this field should be positive number");
                document.getElementById("credit").style.border = "1px solid red"}
            else{  var textNode2 = document.createTextNode("");}}
        else{document.getElementById("credit").style.border = "1px solid red";
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
        if(!active==0){
            var textNode4 = document.createTextNode("");}
        else{ document.getElementById("statusid").style.border = "1px solid red";
            var textNode4 = document.createTextNode("this field is required");}
        cellLeft4.appendChild(textNode4);
        cellLeft4.className="spann";
        cellLeft4.style.float="left";

        //statuss=4;
        errorMessage.push(statuss);
        saveMode=0;
    }
     if (taxid==""||vatid=="")
    {
        if(errorMessage.length<1)
        {var row = tablee.insertRow(5);  statuss=5;}
        else{var row = tablee.insertRow(5+errorMessage.length); statuss=5+errorMessage.length;}
        row.setAttribute("class","row");
        row.setAttribute("class","row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className="column1";

        var cellLeft2 = row.insertCell(1);
        if(!taxid==""){
            var textNode2 = document.createTextNode("");}
        else{document.getElementById("taxNumber").style.border = "1px solid red";
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
        if(!vatid==""){
            var textNode4 = document.createTextNode("");}
        else{ document.getElementById("vatID").style.border = "1px solid red";
            var textNode4 = document.createTextNode("this field is required");}
        cellLeft4.appendChild(textNode4);
        cellLeft4.className="spann";
        cellLeft4.style.float="left";

        //statuss=5;
        errorMessage.push(statuss);
        saveMode=0;
    }
     if (commercialid=="")
    {
        if(errorMessage.length<1)
        {var row = tablee.insertRow(6);  statuss=6;}
        else{var row = tablee.insertRow(6+errorMessage.length); statuss=6+errorMessage.length;}
        row.setAttribute("class","row");
        row.setAttribute("class","row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className="column1";

        var cellLeft2 = row.insertCell(1);
        if(!commercialid==""){
            var textNode2 = document.createTextNode("");}
        else{document.getElementById("TaxRegistrationID").style.border = "1px solid red";
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
        var textNode4 = document.createTextNode("");

        cellLeft4.appendChild(textNode4);
        //cellLeft4.className="spann";
        //cellLeft4.style.float="left";

        //statuss=6;
        errorMessage.push(statuss);
        saveMode=0;
    }
     if (startdate==""||enddate==""|| startdate>enddate)
    {
        if(errorMessage.length<1)
        {var row = tablee.insertRow(7);  statuss=7;}
        else{var row = tablee.insertRow(7+errorMessage.length); statuss=7+errorMessage.length;}
        row.setAttribute("class","row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className="column1";

        var cellLeft2 = row.insertCell(1);
        if(!startdate==""){
            //if(!creditFormat.test(credit))
            var textNode2 = document.createTextNode("");}
        else{document.getElementById("startDate").style.border = "1px solid red";
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
        if(!enddate==""){
            if(startdate>enddate)
            {var textNode4 = document.createTextNode("invalid date");
                document.getElementById("endDate").style.border = "1px solid red"
                console.log("enddate");}
            else{  var textNode4 = document.createTextNode("");}}
        else{ document.getElementById("endDate").style.border = "1px solid red";
            var textNode4 = document.createTextNode("this field is required");}
        cellLeft4.appendChild(textNode4);
        cellLeft4.className="spann";
        cellLeft4.style.float="left";

       // statuss=7;
        errorMessage.push(statuss);
        saveMode=0;
    }
    else if(errorMessage.length==0&&inputvalues==""){
        Save_Customer();
    }
    else if(errorMessage.length==0&&inputvalues!="")
     {
         saveEdits();
     }
}

/*function selection() {
    document.getElementById("statusid").getElementsByTagName('option')[1].selected = 'selected';
}*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////
var inputvalues=document.getElementById("result").value;
inputvalues=inputvalues.toString().split(",");
var updatecount=0;
function updatefields() {
    document.getElementById("statusid").getElementsByTagName('option')[1].selected = 'selected';

    console.log("input array "+ document.getElementById("result").value);


    console.log("inside update");
    if(inputvalues!="")
    {

        console.log("inside if");
        document.getElementById("code").value=inputvalues[0];
        document.getElementById("username").value=inputvalues[1];

        for (var i = 0; i < document.getElementById("typeid").options.length; ++i) {
            if (document.getElementById("typeid").options[i].text === inputvalues[2]) document.getElementById("typeid").options[i].selected = true;
        }
        for (var i = 0; i < document.getElementById("classid").options.length; ++i) {
            if (document.getElementById("classid").options[i].text === inputvalues[3]) document.getElementById("classid").options[i].selected = true;
        }
        document.getElementById("PaymentMethods").disabled=false;
        for (var i = 0; i < document.getElementById("PaymentMethods").options.length; ++i) {
            if (document.getElementById("PaymentMethods").options[i].text === inputvalues[5])
            {
                document.getElementById("PaymentMethods").options[i].selected = true;}
        }
        document.getElementById("currencyid").disabled=false;
        for (var i = 0; i < document.getElementById("currencyid").options.length; ++i) {
            if (document.getElementById("currencyid").options[i].text === inputvalues[4])
            {
                document.getElementById("currencyid").options[i].selected = true;}
        }
        document.getElementById("credit").value=inputvalues[6];

        for (var i = 0; i < document.getElementById("statusid").options.length; ++i) {
            if (document.getElementById("statusid").options[i].text === inputvalues[7]) document.getElementById("statusid").options[i].selected = true;
        }
        document.getElementById("taxNumber").value=inputvalues[8];
        document.getElementById("vatID").value=inputvalues[9];
        document.getElementById("TaxRegistrationID").value=inputvalues[10];
        document.getElementById("startDate").value=inputvalues[11];
        document.getElementById("endDate").value=inputvalues[12];

       document.getElementById("savebtn").setAttribute("onclick","activeSave()");

       // document.getElementById("us").value=inputvalues[1];
        //document.getElementById("ar").value=inputvalues[13];
        //document.getElementById("active").innerHTML=arr[5];
        //updatecount=1;

    }
}

function saveEdits() {

    var form = document.getElementById('myForm1'); // give the form an ID
    /*if(updatecount>0)
     {
         var olddata=document.getElementById("myForm1").lastChild;
         document.getElementById("myForm1").removeChild(olddata);
     }*/
    //form.append("id",parseInt(dbidd));

    var databaseid = document.createElement("input");
    databaseid.setAttribute("type", "text");
    databaseid.setAttribute("name", "id");
    databaseid.setAttribute("id", "inputid");
    databaseid.setAttribute("value",inputvalues[14].toString());
    databaseid.setAttribute("style", "display:none");
    // databaseid.setAttribute("value",dbidd );
    form.appendChild(databaseid);

    //form.setAttribute("action","/UpdateDocument")
    var xhr = new XMLHttpRequest();              // create XMLHttpRequest
    var data = new FormData(form);                // create formData object
    console.log("data "+data.get("id"));
    xhr.open("post", "/UpdateCustomerData");      // open connection
    xhr.send(data);
    console.log(xhr.responseText);
    alert("updated successfully");
    updatefields();
}