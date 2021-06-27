
// Get the modal
var modal = document.getElementById("myModal");

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

////////////////////////////////////////////////////////////////////
var us_desc='';
var ar_desc='';
var Savecountt=0;
function translateee() {
    us_desc=document.getElementById("us").value;
    ar_desc=document.getElementById("ar").value;
    modal.style.display = "none";
}
function Save_Customer() {
    var form = document.getElementById('myForm1'); // give the form an ID
    if(Savecountt>0)
    {
        var olddata=document.getElementById("myForm1").lastChild;
        document.getElementById("myForm1").removeChild(olddata);
        var oldold=document.getElementById("myForm1").lastChild;
        document.getElementById("myForm1").removeChild(oldold);
    }
    //form.append("id",parseInt(dbidd));
    //console.log("databaseid "+dbiddd);
    var us_value = document.createElement("input");
    us_value.setAttribute("type", "text");
    us_value.setAttribute("name", "us");
    us_value.setAttribute("id", "us");
    us_value.setAttribute("value",us_desc );
    us_value.style.display="none";
    // databaseid.setAttribute("value",dbidd );
    form.appendChild(us_value);

    var ar_value = document.createElement("input");
    ar_value.setAttribute("type", "text");
    ar_value.setAttribute("name", "ar");
    ar_value.setAttribute("id", "ar");
    ar_value.setAttribute("value",ar_desc );
    ar_value.style.display="none";
    // databaseid.setAttribute("value",dbidd );
    console.log("ar_value  "+ar_value.value);
    form.appendChild(ar_value);

    //form.setAttribute("action","/UpdateDocument")
    var xhr = new XMLHttpRequest();              // create XMLHttpRequest
    var data = new FormData(form);                // create formData object
    console.log("data "+data.get("us"));
    xhr.open("post", "/contact_info");      // open connection
    xhr.send(data);
    console.log(xhr.responseText);
    Savecountt++;

    //window.location.replace("AddCustomerMainData");
    window.location.replace("ContactInfoo");


}

////////////////////////////////////////////////////////////////////////////////////////////////////////
var statuss=0;

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

    if(!statuss==0)
    {
        console.log("statuss "+statuss)
        //tablee.removeChild(tablee.childNodes[statuss]);
        if(statuss==1)
        {
            tablee.rows[statuss-1].cells[3].getElementsByTagName("input")[0].style.border="1px solid #EFEEEE";
        }
        else if(statuss==2||statuss==3)
        {
            tablee.rows[statuss-1].cells[1].getElementsByTagName("select")[0].style.border="1px solid #EFEEEE";
            tablee.rows[statuss-1].cells[3].getElementsByTagName("select")[0].style.border="1px solid #EFEEEE";
        }
       else if(statuss==4)
        {
            tablee.rows[statuss-1].cells[1].getElementsByTagName("input")[0].style.border="1px solid #EFEEEE";
            tablee.rows[statuss-1].cells[3].getElementsByTagName("select")[0].style.border="1px solid #EFEEEE";

        }
        else if(statuss==6)
        {
            tablee.rows[statuss-1].cells[1].getElementsByTagName("input")[0].style.border="1px solid #EFEEEE";

        }
    else{
        tablee.rows[statuss-1].cells[1].getElementsByTagName("input")[0].style.border="1px solid #EFEEEE";
        tablee.rows[statuss-1].cells[3].getElementsByTagName("input")[0].style.border="1px solid #EFEEEE";}
        tablee.deleteRow(statuss);
        statuss=0;
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

    }

   else if (customerType==""||classs=="")//||method==""||currency==""||credit==""||active=="")
    {
        var row = tablee.insertRow(2);
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

        statuss=2;
    }
    else if ((method==""||currency==""))//||method==""||currency==""||credit==""||active=="")
    {
        var row = tablee.insertRow(3);
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

        statuss=3;
    }
    else if (credit==""||active==""|| credit<0)
    {
        var row = tablee.insertRow(4);
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

        statuss=4;
    }
    else if (taxid==""||vatid=="")//||method==""||currency==""||credit==""||active=="")
    {
        var row = tablee.insertRow(5);
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

        statuss=5;
    }
    else if (commercialid=="")
    {
        var row = tablee.insertRow(6);
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

        statuss=6;
    }
    else if (startdate==""||enddate==""|| startdate>enddate)
    {
        var row = tablee.insertRow(7);
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

        statuss=7;
    }
    else if(statuss==0){
        Save_Customer();
    }
}