/////////////////////////////////////////////////////////////////////////////////////////////

var idd = 0;
var dbID = 0;
var documents = new Array();
var storedArrayy=new Array();
var saveMode=0;
var onloadingMode=0;
var CustomerPersons=new Array();
var ii=CustomerPersons.length;
function activeSave() {
    if(document.getElementById("customerid").value==0)
    {
        alert("please add customer first");
    }
    else {
        saveMode = 1;
        validate();
        document.getElementById("name").addEventListener("keyup", validate);
        document.getElementById("phone").addEventListener("keyup", validate);
        document.getElementById("email").addEventListener("keyup", validate);
        document.getElementById("title").addEventListener("keyup", validate);
    }
}
function AddNewRow() {
console.log("add new row");
        if (saveMode == 1) {
            var name = document.getElementById("name").value;
            var title = document.getElementById("title").value;
            var phone = document.getElementById("phone").value;
            var email = document.getElementById("email").value;

            if ([name].every(x => x !== '')) {

                if (CustomerPersons.length == 0&&document.getElementById("result").value=="") {
                    var myTable = document.getElementById("myDynamicTable");

                    myTable.className = "table table-striped";
                    myTable.style.width = "94%";
                    var tableBody = document.createElement('tbody');
                    myTable.appendChild(tableBody);
                    tableBody.id = "tbodyy";

                    var tablehead = document.createElement('thead');
                    myTable.appendChild(tablehead);

                    var tr = document.createElement('tr');
                    tablehead.appendChild(tr);

                    var header = ['Name', 'Title', 'Phone', 'Email', '', ''];
                    for (var j = 0; j < 6; j++) {
                        var th = document.createElement('th');
                        th.appendChild(document.createTextNode(header[j]));
                        tr.appendChild(th);
                    }
                }


                var tbodyRef = document.getElementById('myDynamicTable').getElementsByTagName('tbody')[0];

                // Insert a row at the end of table
                var newRow = tbodyRef.insertRow();

                idd = "row" + ii;
                console.log("idd  " + idd);
                newRow.id = idd;

                // Insert a cell at the end of the row
                var Cell1 = newRow.insertCell();
                var Cell2 = newRow.insertCell();
                var Cell3 = newRow.insertCell();
                var Cell4 = newRow.insertCell();
                var Cell5 = newRow.insertCell();
                var Cell6 = newRow.insertCell();


                // Append a text node to the cell
                var newText1 = document.createTextNode(name);
                Cell1.appendChild(newText1);

                var newText2 = document.createTextNode(title);
                Cell2.appendChild(newText2);

                var newText3 = document.createTextNode(phone);
                Cell3.appendChild(newText3);

                var newText4 = document.createTextNode(email);
                Cell4.appendChild(newText4);

                //ii++;

                //////////////////////////////////////////////////////////////////////////
                var form = document.getElementById('myForm'); // give the form an ID
                var xhr = new XMLHttpRequest();              // create XMLHttpRequest
                var data = new FormData(form);                // create formData object

                xhr.open("post", form.action);      // open connection
                xhr.send(data);

                var DataBaeId = xhr.responseText;
                console.log("DataBaeId " + DataBaeId);
                console.log("i is " + ii);
                //documents.push(DataBaeId);
                //documents.push([name, title, phone, email, DataBaeId]);
                CustomerPersons.push([name, title, phone, email, DataBaeId]);
                xhr.onload = function () {

                    DataBaeId = parseInt(this.responseText);
                    console.log("DataBaeId2 " + DataBaeId);
                    //documents[ii-1][5]=(DataBaeId);
                    CustomerPersons[ii][4] = (DataBaeId);
                };

                //console.log("documents[i-1][5] "+documents[i-1][5]);
                //console.log("x "+x);

                ////////////////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////

                // Create anchor element.
                var button2 = document.createElement('input');

                // Create the text node for anchor element.
                var link = document.createTextNode("Edittest");

                // Append the text node to anchor element.
                button2.appendChild(link);

                button2.style.color = "#4CAF50";
                button2.style.border = "none";
                button2.style.backgroundColor = "#F5F5F5";

                button2.setAttribute('type', 'button');
                button2.setAttribute('value', 'Edit');

                // ADD THE BUTTON's 'onclick' EVENT.
                button2.setAttribute('onclick', 'EditRows()');

                Cell5.appendChild(button2);
                Cell5.style.backgroundColor = "#F5F5F5";

                ///////////////////////////////////////////////////////////////////
                // Create anchor element.
                var button = document.createElement('input');

                // Create the text node for anchor element.
                var link = document.createTextNode("deletetest");

                // Append the text node to anchor element.
                button.appendChild(link);

                button.style.color = "#ff6347";
                button.style.border = "none";
                button.style.backgroundColor = "#F5F5F5";

                button.setAttribute('type', 'button');
                button.setAttribute('value', 'Delete');

                // ADD THE BUTTON's 'onclick' EVENT.
                button.setAttribute('onclick', 'deleteRows()');

                Cell6.appendChild(button);
                Cell6.style.backgroundColor = "#F5F5F5";


                document.getElementById("name").value = '';
                document.getElementById("title").value = '';
                document.getElementById("phone").value = '';
                document.getElementById("email").value = '';


            } else {

                alert("fill all columns");
            }


            saveMode = 0;
        }
    }

function deleteRows() {

    var rowId = event.target.parentNode.parentNode.id;
    var row = document.getElementById("rowId");
    console.log("rowId" + rowId);

    var list = document.getElementById("tbodyy");

    var d = parseInt(rowId.charAt(3)) ;
    list.removeChild(list.childNodes[d]);

    var x = document.getElementById("tbodyy").rows;
    console.log("d  " + d);
    for (var c = 0; c <= x.length - 1; c++) {
        x[c].id = "row" + c;
        //console.log("x[c].id"+ x[c].id);
    }
    //var dbidd=documents[d][5];
    console.log("CustomerPersons  "+CustomerPersons);
    var dbidd=CustomerPersons[d][4];
    console.log(dbidd);
    //console.log("documents before delete"+ documents);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/DeleteManager?id="+dbidd);
    // xmlhttp.open("GET","getuser.php?fname="+abc ,true);
    //var params = JSON.stringify({ id: dbidd });
    xhttp.send();
    console.log(xhttp.responseText);

    //documents.splice(d,d+1);
    CustomerPersons.splice(d,d+1);
    /* storedArrayy.splice(d,d+1);
     sessionStorage.setItem("contactPerson",storedArrayy.toString() );*/
    // console.log("documents after"+ documents);
    ii--;
    //console.log("storedArray ", storedArrayy);
    //console.log("storedArray length ", storedArrayy.length);
    if(CustomerPersons.length==0)
    {
        document.getElementById("myDynamicTable").deleteTHead();
        //sessionStorage.removeItem("contactPerson");
    }
}
var dbidd=0;
var rowId=0;
var updatecount=0;
function EditRows() {

    rowId = event.target.parentNode.parentNode.id;
    var list = document.getElementById("tbodyy");
    var d = parseInt(rowId.charAt(3));

    dbidd=CustomerPersons[d][4];
    console.log("dbidd "+dbidd);

    document.getElementById("name").value = CustomerPersons[d][0];
    document.getElementById("title").value = CustomerPersons[d][1];
    document.getElementById("phone").value = CustomerPersons[d][2];
    document.getElementById("email").value = CustomerPersons[d][3];

    document.getElementById("AddBtn").value="Update";

    document.getElementById("AddBtn").setAttribute("onclick","UpdateRow()");
    console.log(document.getElementById("AddBtn").getAttribute("onclick"));
}

function UpdateRow() {

    var d = parseInt(rowId.charAt(3)) ;
    console.log(d);

    var form = document.getElementById('myForm'); // give the form an ID
    if(updatecount>0)
    {
        var olddata=document.getElementById("myForm").lastChild;
        document.getElementById("myForm").removeChild(olddata);
    }
    //form.append("id",parseInt(dbidd));
    console.log("databaseid "+dbidd);
    var databaseid = document.createElement("input");
    databaseid.setAttribute("type", "text");
    databaseid.setAttribute("name", "id");
    databaseid.setAttribute("id", "inputid");
    databaseid.setAttribute("value",dbidd );
    databaseid.setAttribute("style", "display:none");
    // databaseid.setAttribute("value",dbidd );
    form.appendChild(databaseid);

    //form.setAttribute("action","/UpdateDocument")
    var xhr = new XMLHttpRequest();              // create XMLHttpRequest
    var data = new FormData(form);                // create formData object
    console.log("data "+data.get("id"));
    xhr.open("post", "/UpdateManager");      // open connection
    xhr.send(data);
    console.log(xhr.responseText);


    var name = document.getElementById("name").value;
    var title = document.getElementById("title").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;


    //console.log("issuedate "+issuedate);
    //document.getElementById('tbodyy').rows[d].cells[0].childNodes[0]=DocumentType;
    document.getElementById('tbodyy').rows[d].cells[0].innerHTML=name;
    document.getElementById('tbodyy').rows[d].cells[1].innerHTML=title;
    document.getElementById('tbodyy').rows[d].cells[2].innerHTML=phone;
    document.getElementById('tbodyy').rows[d].cells[3].innerHTML=email;

    document.getElementById("name").value = '';
    document.getElementById("title").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("email").value = '';


    document.getElementById("AddBtn").value="Save";
    document.getElementById("AddBtn").setAttribute("onclick","activeSave()");

    CustomerPersons[d][0]=name;
    CustomerPersons[d][1]=title;
    CustomerPersons[d][2]=phone;
    CustomerPersons[d][3]=email;

    updatecount++;

}
///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
var statuss=0;
var errorMessage=new Array();
function validate() {
    var tablee = document.getElementById("managertable");
    var name = document.myForm.name.value;''
    var title = document.myForm.title.value;
    var email = document.myForm.email.value;
    var phone = document.myForm.phone.value;

    var nameFormat = /^([a-zA-Z ]){2,30}$/;
    var emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var phoneFormat = /^\d/;

    if (errorMessage.length>0) {
        // console.log("statuss " + statuss)
        for(var i=0;i<errorMessage.length;i++ ) {

            tablee.rows[errorMessage[i]-i - 1].cells[1].getElementsByTagName("input")[0].style.border = "1px solid #EFEEEE";
            tablee.rows[errorMessage[i] -i- 1].cells[3].getElementsByTagName("input")[0].style.border = "1px solid #EFEEEE";
            tablee.deleteRow(errorMessage[i]-i);

        }
        errorMessage=[];
    }
    if ((name == "" || !nameFormat.test(name))) {
        var row = tablee.insertRow(1);
        row.setAttribute("class", "row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className = "column1";

        var cellLeft2 = row.insertCell(1);
        if (!name == "") {
            if (!nameFormat.test(name)) {
                var textNode2 = document.createTextNode("name should has at least one character");
                document.getElementById("name").style.border = "1px solid red"
                console.log("name");
            } else {
                var textNode2 = document.createTextNode("");
            }
        } else {
            document.getElementById("name").style.border = "1px solid red";
            var textNode2 = document.createTextNode("this field is required");
        }
        cellLeft2.appendChild(textNode2);
        cellLeft2.className = "spann";
        cellLeft2.style.float = "left";

        var cellLeft3 = row.insertCell(2);
        var textNode3 = document.createTextNode("");
        cellLeft3.appendChild(textNode3);
        cellLeft3.className = "column2";

        var cellLeft4 = row.insertCell(3);
        var textNode4 = document.createTextNode("");

        cellLeft4.appendChild(textNode4);

        statuss = 1;
        errorMessage.push(statuss);
        saveMode=0;

    }  if ((!phone==""&&!phoneFormat.test(phone))|| (!email==""&& !emailFormat.test(email)))
    {
        console.log("inside elseif");
        if(errorMessage.length<1)
        {var row = tablee.insertRow(2);  statuss=2;}
        else{var row = tablee.insertRow(3); statuss=3;}
        row.setAttribute("class", "row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className = "column1";

        var cellLeft2 = row.insertCell(1);

        if (!phoneFormat.test(phone)&& !phone=="") {
            var textNode2 = document.createTextNode("invalid phone");
            document.getElementById("phone").style.border = "1px solid red"
            console.log("phone");
        } else {
            var textNode2 = document.createTextNode("");
        }

        cellLeft2.appendChild(textNode2);
        cellLeft2.className = "spann";
        cellLeft2.style.float = "left";

        var cellLeft3 = row.insertCell(2);
        var textNode3 = document.createTextNode("");
        cellLeft3.appendChild(textNode3);
        cellLeft3.className = "column2";

        var cellLeft4 = row.insertCell(3);

        if (!emailFormat.test(email)&& !email=="") {
            var textNode4 = document.createTextNode("invalid email");
            document.getElementById("email").style.border = "1px solid red"
            console.log("email");
        } else {
            var textNode4 = document.createTextNode("");
        }

        cellLeft4.appendChild(textNode4);
        cellLeft4.className = "spann";
        cellLeft4.style.float = "left";

        //statuss = 2;
        errorMessage.push(statuss);
        saveMode=0;
    }  else if (errorMessage.length == 0) {
        console.log("inside else");
        AddNewRow();
    }
}

function onloading() {
    // var CustomerPersons=new Array();

    var personsCount=document.getElementById("personName").length;
    var selectNames=document.getElementById("personName");
    var selectTitle=document.getElementById("personTitle");
    var selectPhone=document.getElementById("personPhone");
    var selectEmail=document.getElementById("personEmail");
    var selectPersonId=document.getElementById("personPersonId");
    var contactperson=document.getElementById("result").value;
    contactperson=contactperson.toString().substr(0,contactperson.length-2).split(",");
    console.log("managers ",contactperson);
    if(contactperson!="")
    {
        for(var i=0;i<contactperson.length;i+=5)
        {
            CustomerPersons.push([contactperson[i],contactperson[i+1],contactperson[i+2],contactperson[i+3],contactperson[i+4]]);

        }
        console.log("CustomerPersons if "+CustomerPersons);
    }
    else {
        for (var m = 1; m < personsCount; m++) {
            var tempArray = new Array();
            tempArray.push(selectNames[m].value);
            tempArray.push(selectTitle[m].value);
            tempArray.push(selectPhone[m].value);
            tempArray.push(selectEmail[m].value);
            tempArray.push(selectPersonId[m].value);
            CustomerPersons.push(tempArray);
        }}
        //console.log("All persons  " + CustomerPersons);
        //console.log("All persons  " + tempArray);
        /* var storedElement=sessionStorage.getItem("contactPerson");
         console.log("storedElement "+ storedElement);
         var storedArray=storedElement.split(",");
         console.log("storedArray "+ storedArray);
         if(storedArray.length>0)  {onloadingMode=1;}*/
        for (var i = 0; i < CustomerPersons.length; i++) {
            if (i == 0) {
                var myTable = document.getElementById("myDynamicTable");

                myTable.className = "table table-striped";
                myTable.style.width = "98%";
                var tableBody = document.createElement('tbody');
                myTable.appendChild(tableBody);
                tableBody.id = "tbodyy";

                var tablehead = document.createElement('thead');
                myTable.appendChild(tablehead);

                var tr = document.createElement('tr');
                tablehead.appendChild(tr);

                var header = ['Name', 'Title', 'Phone', 'Email', '', ''];
                for (var j = 0; j < 6; j++) {
                    var th = document.createElement('th');
                    th.appendChild(document.createTextNode(header[j]));
                    tr.appendChild(th);
                }
            }

            var tbodyRef = document.getElementById('myDynamicTable').getElementsByTagName('tbody')[0];

            // Insert a row at the end of table
            var newRow = tbodyRef.insertRow();

            idd = "row" + i;
            console.log("idd  " + idd);
            newRow.id = idd;

            // Insert a cell at the end of the row
            var Cell1 = newRow.insertCell();
            var Cell2 = newRow.insertCell();
            var Cell3 = newRow.insertCell();
            var Cell4 = newRow.insertCell();
            var Cell5 = newRow.insertCell();
            var Cell6 = newRow.insertCell();


            // Append a text node to the cell
            var newText1 = document.createTextNode(CustomerPersons[i][0]);
            Cell1.appendChild(newText1);

            var newText2 = document.createTextNode(CustomerPersons[i][1]);
            Cell2.appendChild(newText2);

            var newText3 = document.createTextNode(CustomerPersons[i][2]);
            Cell3.appendChild(newText3);

            var newText4 = document.createTextNode(CustomerPersons[i][3]);
            Cell4.appendChild(newText4);

            //i++;

            // Create anchor element.
            var button2 = document.createElement('input');

            // Create the text node for anchor element.
            var link = document.createTextNode("Edittest");

            // Append the text node to anchor element.
            button2.appendChild(link);

            button2.style.color = "#4CAF50";
            button2.style.border = "none";
            button2.style.backgroundColor = "#F5F5F5";

            button2.setAttribute('type', 'button');
            button2.setAttribute('value', 'Edit');

            // ADD THE BUTTON's 'onclick' EVENT.
            button2.setAttribute('onclick', 'EditRows()');

            Cell5.appendChild(button2);
            Cell5.style.backgroundColor = "#F5F5F5";

            ///////////////////////////////////////////////////////////////////
            // Create anchor element.
            var button = document.createElement('input');

            // Create the text node for anchor element.
            var link = document.createTextNode("deletetest");

            // Append the text node to anchor element.
            button.appendChild(link);

            button.style.color = "#ff6347";
            button.style.border = "none";
            button.style.backgroundColor = "#F5F5F5";

            button.setAttribute('type', 'button');
            button.setAttribute('value', 'Delete');

            // ADD THE BUTTON's 'onclick' EVENT.
            button.setAttribute('onclick', 'deleteRows()');

            Cell6.appendChild(button);
            Cell6.style.backgroundColor = "#F5F5F5";


        }

}
