var translationError=new Array();
var statuss=0;
var transsaveMode=0;
function translateee() {
    us_desc=document.getElementById("us").value;
    ar_desc=document.getElementById("ar").value;
    modal.style.display = "none";
}

function validateTransForm() {

    var transtable=document.getElementById("translation");
    var nameFormat = /^([a-zA-Z ]){2,30}$/;
    var arformat=/^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$/;

    var usValue=document.getElementById("us").value;
    var arValue=document.getElementById("ar").value;

    var arindex=document.getElementById("ar").parentNode.parentNode.rowIndex;
    var usindex=document.getElementById("us").parentNode.parentNode.rowIndex;
    if(arindex-usindex>1)
    {
        document.getElementById("us").style.border="1px solid #EFEEEE";
        transtable.deleteRow(usindex+1);
        translationError=[];
    }
    arindex=document.getElementById("ar").parentNode.parentNode.rowIndex;
    if(transtable.rows.length-arindex>1)
    {
        document.getElementById("ar").style.border="1px solid #EFEEEE";
        transtable.deleteRow(arindex+1);
        translationError=[];
    }

    if( usValue=="" || !nameFormat.test(usValue) ){
        document.getElementById("us").style.border = "1px solid red";

        var row = transtable.insertRow(2);
        row.setAttribute("class","row");

        var cellLeft2 = row.insertCell(0);
        var textNode2 = document.createTextNode("this field is required");
        cellLeft2.appendChild(textNode2);
        cellLeft2.className="column1";
        cellLeft2.className="spann";
        cellLeft2.style.float="left";
        cellLeft2.style.paddingLeft="10px";

        statuss=1;
        translationError.push(statuss);
        saveMode=0;
    }
    if( arValue=="" || !arformat.test(arValue) ){

        if(translationError.length<1)
        {var row = transtable.insertRow(3);  statuss=3;}
        else{var row = transtable.insertRow(4); statuss=4;}
        row.setAttribute("class","row");

        var cellLeft2 = row.insertCell(0);
        var textNode2 = document.createTextNode("this field is required");
        document.getElementById("ar").style.border = "1px solid red"
        cellLeft2.appendChild(textNode2);
        cellLeft2.className="column1";
        cellLeft2.className="spann";
        cellLeft2.style.float="left";
        cellLeft2.style.paddingLeft="10px";

        translationError.push(statuss);
        saveMode=0;
    }
    else if(translationError.length==0){
        translateee();
    }

}

//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
var us_desc='';
var ar_desc='';
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
        document.getElementById("us").value=inputvalues[6];
        document.getElementById("ar").value=inputvalues[2];
    }
    /*var name= document.getElementById("username").value;
    if(!ar_desc==""||!us_desc==""){
        document.getElementById("us").value=us_desc;
        document.getElementById("ar").value=ar_desc;}
    else {
        document.getElementById("us").value=name;
        document.getElementById("ar").value=name;
    }*/
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    if(translationError.length==0)
    {modal.style.display = "none";}
    else  {modal.style.display="block";}
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        console.log("translationError.length "+translationError.length)
        if(translationError.length==0)
        {modal.style.display = "none";}
        else  {modal.style.display="block";}

    }
}

/////////////////////////////////////////////////////////////////////////////////
