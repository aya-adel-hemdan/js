/////////////////////////////////////////////////////////////////////////////////////////////
var ii=0;
var iddd = 0;
var dbIDD = 0;
var documentss = new Array();
function AddNewPhoneRow() {

    var address= document.getElementById("myDynamicAddressTable");
    address.style.display="none";

    var phonetable = document.getElementById("myDynamicPhoneTable");
    phonetable.style.display="";

    document.getElementById("AddPhone").style.background="#34a366";
    document.getElementById("AddPhone").style.color="white";
    document.getElementById("AddAddress").style.background="#c0c0c0";
    document.getElementById("AddAddress").style.color="black";

    var phone = document.getElementById("phone").value;

   // if ([phone].every(x => x !== '')) {
        if (phone !== '') {

        if(ii==0)
        {
            var myTable = document.getElementById("myDynamicPhoneTable");

            myTable.className="table table-striped";



            var tableBody = document.createElement('tbody');
            myTable.appendChild(tableBody);
            tableBody.id="tbodyyy";

            var tablehead = document.createElement('thead');
            myTable.appendChild(tablehead);

            var tr = document.createElement('tr');
            tablehead.appendChild(tr);

            var header=['Phone','',''];
            for (var j=0; j<3; j++){
                var th = document.createElement('th');
                th.appendChild(document.createTextNode(header[j]));
                tr.appendChild(th);
            }
        }


        var tbodyRef = document.getElementById('myDynamicPhoneTable').getElementsByTagName('tbody')[0];

        // Insert a row at the end of table
        var newRow = tbodyRef.insertRow();

        iddd = "row" + ii;
        console.log("idd  " + iddd);
        newRow.id = iddd;

        // Insert a cell at the end of the row
        var Cell1 = newRow.insertCell();
        var Cell2 = newRow.insertCell();
        var Cell3 = newRow.insertCell();


        // Append a text node to the cell
        var newText1 = document.createTextNode(phone);
        Cell1.appendChild(newText1);


        ii++;

        //////////////////////////////////////////////////////////////////////////
        var form = document.getElementById('myForm'); // give the form an ID
        var xhr = new XMLHttpRequest();              // create XMLHttpRequest
        var data = new FormData(form);                // create formData object

        xhr.open("post", "/SavePhone");      // open connection
        xhr.send(data);

        var DataBaeId = xhr.responseText;
        console.log("DataBaeId "+DataBaeId);
        //documents.push(DataBaeId);
        documentss.push([phone, ii, DataBaeId]);
        xhr.onload = function  () {

            DataBaeId = parseInt(this.responseText);
            console.log("DataBaeId2 "+DataBaeId);
            documentss[ii-1][2]=(DataBaeId);
        };

        // console.log("documents "+documents);
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
        button2.style.border="none";
        button2.style.backgroundColor="#F5F5F5";

        button2.setAttribute('type', 'button');
        button2.setAttribute('value', 'Edit');

        // ADD THE BUTTON's 'onclick' EVENT.
        button2.setAttribute('onclick', 'EditPhoneRows()');

        Cell2.appendChild(button2);
        Cell2.style.backgroundColor="#F5F5F5";

        ///////////////////////////////////////////////////////////////////
        // Create anchor element.
        var button = document.createElement('input');

        // Create the text node for anchor element.
        var link = document.createTextNode("deletetest");

        // Append the text node to anchor element.
        button.appendChild(link);

        button.style.color = "#ff6347";
        button.style.border="none";
        button.style.backgroundColor="#F5F5F5";

        button.setAttribute('type', 'button');
        button.setAttribute('value', 'Delete');

        // ADD THE BUTTON's 'onclick' EVENT.
        button.setAttribute('onclick', 'deletePhoneRows()');

        Cell3.appendChild(button);
        Cell3.style.backgroundColor="#F5F5F5";

        document.getElementById("phone").value = '';


    } else {

        alert("fill all columns");
    }
}

function deletePhoneRows() {

    var rowId = event.target.parentNode.parentNode.id;
    var row = document.getElementById("rowId");
    console.log("rowId" + rowId);

    var list = document.getElementById("tbodyyy");

    var d = parseInt(rowId.charAt(3)) ;
    list.removeChild(list.childNodes[d]);
    var x = document.getElementById("tbodyyy").rows;
    console.log("d  " + d);
    for (var c = 0; c <= x.length - 1; c++) {
        x[c].id = "row" + c;
        //console.log("x[c].id"+ x[c].id);
    }
    var dbidd=documentss[d][2];
    console.log(dbidd);
    //console.log("documents before delete"+ documents);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/DeletePhone?id="+dbidd);
    // xmlhttp.open("GET","getuser.php?fname="+abc ,true);
    //var params = JSON.stringify({ id: dbidd });
    xhttp.send();
    console.log(xhttp.responseText);

    documentss.splice(d,d+1);
    // console.log("documents after"+ documents);
    ii--;
    if(ii==0)
    {
        document.getElementById("myDynamicPhoneTable").deleteTHead();
    }
}
var dbiddd=0;
var rowIdd=0;
var updatecountt=0;
function EditPhoneRows() {

    rowIdd = event.target.parentNode.parentNode.id;
    var list = document.getElementById("tbodyyy");
    var d = parseInt(rowIdd.charAt(3)) ;
    dbiddd=documentss[d][2];
    console.log("dbidd "+dbiddd);

    document.getElementById("phone").value = documentss[d][0];

    document.getElementById("AddPhone").value="Update";

    document.getElementById("AddPhone").setAttribute("onclick","UpdatePhoneRow()");
    console.log(document.getElementById("AddPhone").getAttribute("onclick"));
}

function UpdatePhoneRow() {

    var d = parseInt(rowIdd.charAt(3)) ;
    console.log(d);

    var form = document.getElementById('myForm'); // give the form an ID
    if(updatecountt>0)
    {
        var olddata=document.getElementById("myForm").lastChild;
        document.getElementById("myForm").removeChild(olddata);
    }
    //form.append("id",parseInt(dbidd));
    console.log("databaseid "+dbiddd);
    var databaseid = document.createElement("input");
    databaseid.setAttribute("type", "text");
    databaseid.setAttribute("name", "id");
    databaseid.setAttribute("id", "inputid");
    databaseid.setAttribute("value",dbiddd );
    // databaseid.setAttribute("value",dbidd );
    form.appendChild(databaseid);

    //form.setAttribute("action","/UpdateDocument")
    var xhr = new XMLHttpRequest();              // create XMLHttpRequest
    var data = new FormData(form);                // create formData object
    console.log("data "+data.get("id"));
    xhr.open("post", "/UpdatePhone");      // open connection
    xhr.send(data);
    console.log(xhr.responseText);

    var phone = document.getElementById("phone").value;


    //console.log("issuedate "+issuedate);
    //document.getElementById('tbodyy').rows[d].cells[0].childNodes[0]=DocumentType;


    document.getElementById('tbodyyy').rows[d].cells[0].innerHTML=phone;


    document.getElementById("phone").value = '';

    document.getElementById("AddPhone").value="+ADD";
    document.getElementById("AddPhone").setAttribute("onclick","AddNewPhoneRow()");

    documentss[d][0]=phone;

    updatecountt++;

}

