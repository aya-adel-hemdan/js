/////////////////////////////////////////////////////////////////////////////////////////////
var i=0;
var idd = 0;
var dbID = 0;
var documents = new Array();
function AddNewAddressRow() {

    var phone = document.getElementById("myDynamicPhoneTable");
    phone.style.display="none";

    var addresstable= document.getElementById("myDynamicAddressTable");
    addresstable.style.display="";

    document.getElementById("AddAddress").style.backgroundColor="#34a366";
    document.getElementById("AddAddress").style.color="white";
    document.getElementById("AddPhone").style.backgroundColor="#c0c0c0";
    document.getElementById("AddPhone").style.color="black";

    var IssuingCountry = document.getElementById("countryid").value;
    var mylist2 = document.getElementById("countryid");
    var Country = mylist2.options[mylist2.selectedIndex].text;

    var IssuingCity = document.getElementById("cityid").value;
    var mylist2 = document.getElementById("cityid");
    var City = mylist2.options[mylist2.selectedIndex].text;

    var Address = document.getElementById("address").value;
    var primary = document.getElementById("primary").value;
    console.log("outside if");
    if ([IssuingCountry,IssuingCity,Address].every(x => x !== '')) {
        console.log("insife if");
        if(i==0)
        {
            var myTable = document.getElementById("myDynamicAddressTable");

            myTable.className="table table-striped";

            var tableBody = document.createElement('tbody');
            myTable.appendChild(tableBody);
            tableBody.id="tbodyy";

            var tablehead = document.createElement('thead');
            myTable.appendChild(tablehead);

            var tr = document.createElement('tr');
            tablehead.appendChild(tr);

            var header=['Country','City','Address','Primary Status','',''];
            for (var j=0; j<6; j++){
                var th = document.createElement('th');
                th.appendChild(document.createTextNode(header[j]));
                tr.appendChild(th);
            }
        }


        var tbodyRef = document.getElementById('myDynamicAddressTable').getElementsByTagName('tbody')[0];

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
        var newText1 = document.createTextNode(Country);
        Cell1.appendChild(newText1);

        var newText2 = document.createTextNode(City);
        Cell2.appendChild(newText2);

        var newText3 = document.createTextNode(Address);
        Cell3.appendChild(newText3);

        var newText4 = document.createTextNode(primary);
        Cell4.appendChild(newText4);

        i++;

        //////////////////////////////////////////////////////////////////////////
        var form = document.getElementById('myForm'); // give the form an ID
        var xhr = new XMLHttpRequest();              // create XMLHttpRequest
        var data = new FormData(form);                // create formData object

        xhr.open("post", form.action);      // open connection
        xhr.send(data);

        var DataBaeId = xhr.responseText;
        console.log("DataBaeId "+DataBaeId);
        //documents.push(DataBaeId);
        documents.push([Country, City, Address, primary, i, DataBaeId]);
        xhr.onload = function  () {

            DataBaeId = parseInt(this.responseText);
            console.log("DataBaeId2 "+DataBaeId);
            documents[i-1][5]=(DataBaeId);
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
        button2.setAttribute('onclick', 'EditAddressRows()');

        Cell5.appendChild(button2);
        Cell5.style.backgroundColor="#F5F5F5";

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
        button.setAttribute('onclick', 'deleteAddressRows()');

        Cell6.appendChild(button);
        Cell6.style.backgroundColor="#F5F5F5";


        document.getElementById("countryid").value = '';
        document.getElementById("cityid").value = '';
        document.getElementById("address").value = '';
        document.getElementById("primary").value = '';


    } else {

        alert("fill all columns");
    }
}

function deleteAddressRows() {

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
    var dbidd=documents[d][5];
    console.log(dbidd);
    //console.log("documents before delete"+ documents);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/DeleteAddress?id="+dbidd);
    // xmlhttp.open("GET","getuser.php?fname="+abc ,true);
    //var params = JSON.stringify({ id: dbidd });
    xhttp.send();
    console.log(xhttp.responseText);

    documents.splice(d,d+1);
    // console.log("documents after"+ documents);
    i--;
    if(i==0)
    {
        document.getElementById("myDynamicAddressTable").deleteTHead();
    }
}
var dbidd=0;
var rowId=0;
var updatecount=0;
function EditAddressRows() {

    rowId = event.target.parentNode.parentNode.id;
    var list = document.getElementById("tbodyy");
    var d = parseInt(rowId.charAt(3)) ;
    dbidd=documents[d][5];
    console.log("dbidd "+dbidd);

    document.getElementById("countryid").value = documents[d][0];
    document.getElementById("cityid").value = documents[d][1];
    document.getElementById("address").value = documents[d][2];
    document.getElementById("primary").value = documents[d][3];


    document.getElementById("AddAddress").value="Update";

    document.getElementById("AddAddress").setAttribute("onclick","UpdateAddressRow()");
    console.log(document.getElementById("AddAddress").getAttribute("onclick"));
}

function UpdateAddressRow() {

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
    // databaseid.setAttribute("value",dbidd );
    form.appendChild(databaseid);

    //form.setAttribute("action","/UpdateDocument")
    var xhr = new XMLHttpRequest();              // create XMLHttpRequest
    var data = new FormData(form);                // create formData object
    console.log("data "+data.get("id"));
    xhr.open("post", "/UpdateAddress");      // open connection
    xhr.send(data);
    console.log(xhr.responseText);

    var IssuingCountry = document.getElementById("countryid").value;
    var mylist2 = document.getElementById("countryid");
    var Country = mylist2.options[mylist2.selectedIndex].text;

    var IssuingCity = document.getElementById("cityid").value;
    var mylist2 = document.getElementById("cityid");
    var City = mylist2.options[mylist2.selectedIndex].text;

    var address = document.getElementById("address").value;
    var primary = document.getElementById("primary").value;


    //console.log("issuedate "+issuedate);
    //document.getElementById('tbodyy').rows[d].cells[0].childNodes[0]=DocumentType;


    document.getElementById('tbodyy').rows[d].cells[0].innerHTML=Country;
    document.getElementById('tbodyy').rows[d].cells[1].innerHTML=City;
    document.getElementById('tbodyy').rows[d].cells[2].innerHTML=address;
    document.getElementById('tbodyy').rows[d].cells[3].innerHTML=primary;

    document.getElementById("countryid").value = '';
    document.getElementById("cityid").value = '';
    document.getElementById("address").value = '';
    document.getElementById("primary").value = '';


    document.getElementById("AddAddress").value="+ADD";
    document.getElementById("AddAddress").setAttribute("onclick","AddNewAddressRow()");

    documents[d][0]=IssuingCountry;
    documents[d][1]=IssuingCity;
    documents[d][2]=address;
    documents[d][3]=primary;


    updatecount++;

}

