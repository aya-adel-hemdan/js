/////////////////////////////////////////////////////////////////////////////////////////////
var i = 0;
var idd = 0;
var dbID = 0;
var documents = new Array();

function AddNewAddressRow() {

    var phone = document.getElementById("myDynamicPhoneTable");
    phone.style.display = "none";

    var addresstable = document.getElementById("myDynamicAddressTable");
    addresstable.style.display = "";

    document.getElementById("AddAddress").style.backgroundColor = "#34a366";
    document.getElementById("AddAddress").style.color = "white";
    document.getElementById("AddPhone").style.backgroundColor = "#c0c0c0";
    document.getElementById("AddPhone").style.color = "black";

    var IssuingCountry = document.getElementById("countryid").value;
    var mylist2 = document.getElementById("countryid");
    var Country = mylist2.options[mylist2.selectedIndex].text;

    var IssuingCity = document.getElementById("cityid").value;
    var mylist2 = document.getElementById("cityid");
    var City = mylist2.options[mylist2.selectedIndex].text;

    var Address = document.getElementById("address").value;
    var primary = document.getElementById("primary").value;
    console.log("primary value " + primary);
    console.log("outside if");
    if ([IssuingCountry, IssuingCity, Address].every(x => x !== '')) {
        console.log("insife if");
        if (i == 0) {
            var myTable = document.getElementById("myDynamicAddressTable");

            myTable.className = "table table-striped";

            var tableBody = document.createElement('tbody');
            myTable.appendChild(tableBody);
            tableBody.id = "tbodyy";

            var tablehead = document.createElement('thead');
            myTable.appendChild(tablehead);

            var tr = document.createElement('tr');
            tablehead.appendChild(tr);

            var header = ['Country', 'City', 'Address', 'Primary Status', '', ''];
            for (var j = 0; j < 6; j++) {
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
        documents.push([IssuingCountry, IssuingCity, Address, primary, Country, City]);
        //////////////////////////////////////////////////////////////////////////
        /*   var form = document.getElementById('myForm'); // give the form an ID
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
           };  */

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
        button2.style.border = "none";
        button2.style.backgroundColor = "#F5F5F5";

        button2.setAttribute('type', 'button');
        button2.setAttribute('value', 'Edit');

        // ADD THE BUTTON's 'onclick' EVENT.
        button2.setAttribute('onclick', 'EditAddressRows()');

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
        button.setAttribute('onclick', 'deleteAddressRows()');

        Cell6.appendChild(button);
        Cell6.style.backgroundColor = "#F5F5F5";


        document.getElementById("countryid").value = '';
        document.getElementById("cityid").value = '';
        document.getElementById("address").value = '';
        //document.getElementById("primary").value = '';


    } else {

        alert("fill all columns");
    }
}

function deleteAddressRows() {

    var rowId = event.target.parentNode.parentNode.id;
    var row = document.getElementById("rowId");
    console.log("rowId" + rowId);

    var list = document.getElementById("tbodyy");

    var d = parseInt(rowId.charAt(3));
    list.removeChild(list.childNodes[d]);
    var x = document.getElementById("tbodyy").rows;
    console.log("d  " + d);
    for (var c = 0; c <= x.length - 1; c++) {
        x[c].id = "row" + c;
        //console.log("x[c].id"+ x[c].id);
    }
    /*  var dbidd=documents[d][5];
      console.log(dbidd);
      //console.log("documents before delete"+ documents);

      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "/DeleteAddress?id="+dbidd);
      // xmlhttp.open("GET","getuser.php?fname="+abc ,true);
      //var params = JSON.stringify({ id: dbidd });
      xhttp.send();
      console.log(xhttp.responseText); */

    documents.splice(d, d + 1);
    // console.log("documents after"+ documents);
    i--;
    if (i == 0) {
        document.getElementById("myDynamicAddressTable").deleteTHead();
    }
}

var dbidd = 0;
var rowId = 0;
var updatecount = 0;

function EditAddressRows() {

    rowId = event.target.parentNode.parentNode.id;
    var list = document.getElementById("tbodyy");
    var d = parseInt(rowId.charAt(3));
    /*  dbidd=documents[d][5];
      console.log("dbidd "+dbidd);  */

    document.getElementById("countryid").value = documents[d][0];
    console.log("documents[d][4] " + documents[d][4]);
    document.getElementById("cityid").value = documents[d][1];
    document.getElementById("address").value = documents[d][2];
    document.getElementById("primary").value = documents[d][3];

    document.getElementById("AddAddress").value = "Update";

    document.getElementById("AddAddress").setAttribute("onclick", "UpdateAddressRow()");
    console.log(document.getElementById("AddAddress").getAttribute("onclick"));
}

function UpdateAddressRow() {

    var d = parseInt(rowId.charAt(3));
    console.log(d);

    /* var form = document.getElementById('myForm'); // give the form an ID
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
     console.log(xhr.responseText); */

    var IssuingCountry = document.getElementById("countryid").value;
    var mylist2 = document.getElementById("countryid");
    var Country = mylist2.options[mylist2.selectedIndex].text;

    var IssuingCity = document.getElementById("cityid").value;
    var mylist2 = document.getElementById("cityid");
    var City = mylist2.options[mylist2.selectedIndex].text;

    var address = document.getElementById("address").value;
    var primary = document.getElementById("primary").value;

    document.getElementById('tbodyy').rows[d].cells[0].innerHTML = "Country";
    document.getElementById('tbodyy').rows[d].cells[1].innerHTML = City;
    document.getElementById('tbodyy').rows[d].cells[2].innerHTML = address;
    document.getElementById('tbodyy').rows[d].cells[3].innerHTML = primary;

    document.getElementById("countryid").value = '';
    document.getElementById("cityid").value = '';
    document.getElementById("address").value = '';
    //document.getElementById("primary").value = '';


    document.getElementById("AddAddress").value = "+ADD";
    document.getElementById("AddAddress").setAttribute("onclick", "AddNewAddressRow()");

    documents[d][0] = IssuingCountry;
    documents[d][1] = IssuingCity;
    documents[d][2] = address;
    documents[d][3] = primary;
    documents[d][4] = Country;
    documents[d][5] = City;


    updatecount++;

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
var ii = 0;
var iddd = 0;
var dbIDD = 0;
var documentss = new Array();

function AddNewPhoneRow() {

    console.log("inside new phone row");

    var address = document.getElementById("myDynamicAddressTable");
    address.style.display = "none";

    var phonetable = document.getElementById("myDynamicPhoneTable");
    phonetable.style.display = "";

    document.getElementById("AddPhone").style.background = "#34a366";
    document.getElementById("AddPhone").style.color = "white";
    document.getElementById("AddAddress").style.background = "#c0c0c0";
    document.getElementById("AddAddress").style.color = "black";

    var phone = document.getElementById("phone").value;

    if ([phone].every(x => x !== '')) {
        //if (phone !== '') {
        console.log("phone" + phone);
        if (ii == 0) {
            var myTable = document.getElementById("myDynamicPhoneTable");

            myTable.className = "table table-striped";


            var tableBody = document.createElement('tbody');
            myTable.appendChild(tableBody);
            tableBody.id = "tbodyyy";

            var tablehead = document.createElement('thead');
            myTable.appendChild(tablehead);

            var tr = document.createElement('tr');
            tablehead.appendChild(tr);

            var header = ['Phone', '', ''];
            for (var j = 0; j < 3; j++) {
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
        documentss.push([phone]);
        console.log("documentss  " + documentss);
        //////////////////////////////////////////////////////////////////////////
        /*    var form = document.getElementById('myForm'); // give the form an ID
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
            };  */

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
        button2.style.border = "none";
        button2.style.backgroundColor = "#F5F5F5";

        button2.setAttribute('type', 'button');
        button2.setAttribute('value', 'Edit');

        // ADD THE BUTTON's 'onclick' EVENT.
        button2.setAttribute('onclick', 'EditPhoneRows()');

        Cell2.appendChild(button2);
        Cell2.style.backgroundColor = "#F5F5F5";

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
        button.setAttribute('onclick', 'deletePhoneRows()');

        Cell3.appendChild(button);
        Cell3.style.backgroundColor = "#F5F5F5";

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

    var d = parseInt(rowId.charAt(3));
    list.removeChild(list.childNodes[d]);
    var x = document.getElementById("tbodyyy").rows;
    console.log("d  " + d);
    for (var c = 0; c <= x.length - 1; c++) {
        x[c].id = "row" + c;
        //console.log("x[c].id"+ x[c].id);
    }
    /*   var dbidd=documentss[d][2];
       console.log(dbidd);
       //console.log("documents before delete"+ documents);

       var xhttp = new XMLHttpRequest();
       xhttp.open("GET", "/DeletePhone?id="+dbidd);
       // xmlhttp.open("GET","getuser.php?fname="+abc ,true);
       //var params = JSON.stringify({ id: dbidd });
       xhttp.send(); */
    // console.log(xhttp.responseText);

    documentss.splice(d, d + 1);
    // console.log("documents after"+ documents);
    ii--;
    if (ii == 0) {
        document.getElementById("myDynamicPhoneTable").deleteTHead();
    }
}

var dbiddd = 0;
var rowIdd = 0;
var updatecountt = 0;

function EditPhoneRows() {

    rowIdd = event.target.parentNode.parentNode.id;
    var list = document.getElementById("tbodyyy");
    var d = parseInt(rowIdd.charAt(3));
    // dbiddd=documentss[d][2];
    // console.log("dbidd "+dbiddd);

    document.getElementById("phone").value = documentss[d][0];

    document.getElementById("AddPhone").value = "Update";

    document.getElementById("AddPhone").setAttribute("onclick", "UpdatePhoneRow()");
    console.log(document.getElementById("AddPhone").getAttribute("onclick"));
}

function UpdatePhoneRow() {

    var d = parseInt(rowIdd.charAt(3));
    console.log(d);

    /*    var form = document.getElementById('myForm'); // give the form an ID
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
        console.log(xhr.responseText);  */

    var phone = document.getElementById("phone").value;


    //console.log("issuedate "+issuedate);
    //document.getElementById('tbodyy').rows[d].cells[0].childNodes[0]=DocumentType;


    document.getElementById('tbodyyy').rows[d].cells[0].innerHTML = phone;


    document.getElementById("phone").value = '';

    document.getElementById("AddPhone").value = "+ADD";
    document.getElementById("AddPhone").setAttribute("onclick", "AddNewPhoneRow()");

    documentss[d][0] = phone;

    updatecountt++;

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var Savecountt = 0;
var saveMode=0;
function activeSave() {
    saveMode=1;
    validate();
    document.getElementById("email").addEventListener("keyup",validate);
    document.getElementById("url").addEventListener("keyup",validate);
    document.getElementById("phone").addEventListener("keyup",validate);
    document.getElementById("countryid").addEventListener("change",validate);
    document.getElementById("cityid").addEventListener("change",validate);
    document.getElementById("address").addEventListener("keyup",validate);
}

function Save() {
if(saveMode==1) {
    var form = document.getElementById('myForm'); // give the form an ID
    if (Savecountt > 0) {
        var olddata = document.getElementById("myForm").lastChild;
        document.getElementById("myForm").removeChild(olddata);
        var oldold = document.getElementById("myForm").lastChild;
        document.getElementById("myForm").removeChild(oldold);
    }
    //form.append("id",parseInt(dbidd));
    //console.log("databaseid "+dbiddd);
    var addresses = document.createElement("input");
    addresses.setAttribute("type", "text");
    addresses.setAttribute("name", "Address");
    addresses.setAttribute("id", "Address");
    addresses.setAttribute("value", documents);
    addresses.style.display = "none";
    // databaseid.setAttribute("value",dbidd );
    form.appendChild(addresses);

    var phones = document.createElement("input");
    phones.setAttribute("type", "text");
    phones.setAttribute("name", "phoness");
    phones.setAttribute("id", "phoness");
    phones.setAttribute("value", documentss);
    phones.style.display = "none";
    // databaseid.setAttribute("value",dbidd );
    console.log("phones  " + phones.value);
    form.appendChild(phones);

    //form.setAttribute("action","/UpdateDocument")
    var xhr = new XMLHttpRequest();              // create XMLHttpRequest
    var data = new FormData(form);                // create formData object
    //console.log("data "+data.get("id"));
    xhr.open("post", "/Test_SaveContact");      // open connection
    xhr.send(data);
    console.log(xhr.responseText);

    document.getElementById("email").value = '';
    document.getElementById("url").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("countryid").value = '';
    document.getElementById("cityid").value = '';
    document.getElementById("address").value = '';

    document.getElementById("myDynamicPhoneTable").deleteTHead();
    document.getElementById("myDynamicAddressTable").deleteTHead();
    var phoneParent = document.getElementById("myDynamicPhoneTable");
    while (phoneParent.hasChildNodes()) {
        phoneParent.removeChild(phoneParent.firstChild);
    }
    var AddressParent = document.getElementById("myDynamicAddressTable");
    while (AddressParent.hasChildNodes()) {
        AddressParent.removeChild(AddressParent.firstChild);
    }

    Savecountt++;
}
saveMode=0;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
var statuss = 0;
var errorMessage=new Array();
emailValidationFlag=0;
phoneValidationFlag=0;
var addressErros=new Array();
function validate() {
    var tablee = document.getElementById("contactTable");

    var maill = document.myForm.email.value;
    var url = document.myForm.url.value;
    var phone = document.myForm.phone.value;
    var country=document.myForm.countryid.value;
    var city=document.myForm.cityid.value;
    var addressfield=document.myForm.address.value;

    var emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var urlFormat = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    var phoneFormat = /^\d{11}$/;

  /*  if (!statuss == 0) {
        console.log("statuss " + statuss)
        //tablee.removeChild(tablee.childNodes[statuss]);
        if (statuss == 1) {
            console.log("inside condition");
            tablee.rows[statuss - 1].cells[1].getElementsByTagName("input")[0].style.border = "1px solid #EFEEEE";
            tablee.rows[statuss - 1].cells[3].getElementsByTagName("input")[0].style.border = "1px solid #EFEEEE";
        } else if (statuss == 2||statuss==5) {
            tablee.rows[statuss - 1].cells[1].getElementsByTagName("input")[0].style.border = "1px solid #EFEEEE";
            //tablee.rows[statuss-1].cells[3].getElementsByTagName("select")[0].style.border="1px solid #EFEEEE";
        }
        tablee.deleteRow(statuss);
        statuss = 0;
    }*/

    if (errorMessage.length>0) {
        // console.log("statuss " + statuss)
        console.log("errormessage ", errorMessage);
        for(var i=0;i<errorMessage.length;i++ ) {
            if(tablee.rows[errorMessage[i] - i - 1].cells.item(1)!=null)
            tablee.rows[errorMessage[i] - i - 1].cells.item(1).firstChild.style.border="1px solid #EFEEEE";
           // if(tablee.rows[errorMessage[i] - i - 1].cells.item(3)!=null)
             //tablee.rows[errorMessage[i] - i - 1].cells.item(3)..style.border="1px solid #EFEEEE";

            tablee.deleteRow(errorMessage[i] - i);
        }
        console.log("table lenghth after delete" + tablee.rows.length);
        errorMessage=[];
        phoneValidationFlag=0;

    }
  /*  if(addressErros.length>0) {
        console.log("addressErros ", addressErros);
        for (var j = 0; j < addressErros.length; j++) {
            if (tablee.rows[addressErros[j]- j - 1].cells.item(1) != null)
                //tablee.rows[addressErros[j] - j - 1].cells.item(1).firstChild.style.border="1px solid #EFEEEE";
                tablee.rows[addressErros[j] - j - 1].cells.item(1).style.border = "1px solid #EFEEEE";

            // if(tablee.rows[errorMessage[i] - i - 1].cells.item(3)!=null)
            //tablee.rows[errorMessage[i] - i - 1].cells.item(3)..style.border="1px solid #EFEEEE";

            tablee.deleteRow(addressErros[j]- j);
        }
        addressErros = [];
    }*/

    if (maill == "" || !emailFormat.test(maill) || url == "" || !urlFormat.test(url)) {
        //document.getElementById("email").style.border = "1px solid red";

        var row = tablee.insertRow(1);
        row.setAttribute("class", "row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className = "column1";

        var cellLeft2 = row.insertCell(1);
        if (!url == "") {
            if (!urlFormat.test(url)) {
                var textNode2 = document.createTextNode("invalid url");
                document.getElementById("url").style.border = "1px solid red"
                console.log("url");
            } else {
                var textNode2 = document.createTextNode("");
            }
        } else {
            document.getElementById("url").style.border = "1px solid red";
            var textNode2 = document.createTextNode("this field is required");
        }
        cellLeft2.appendChild(textNode2);
        cellLeft2.className = "spann";
        cellLeft2.style.float = "left";
        //cellLeft2.className="input1";

        var cellLeft3 = row.insertCell(2);
        var textNode3 = document.createTextNode("");
        cellLeft3.appendChild(textNode3);
        cellLeft3.className = "column2";

        var cellLeft4 = row.insertCell(3);
        if (!maill == "") {
            if (!emailFormat.test(maill)) {
                var textNode4 = document.createTextNode("invalid email");
                document.getElementById("email").style.border = "1px solid red"
                console.log("maill");
            } else {
                var textNode4 = document.createTextNode("");
            }
        } else {
            document.getElementById("email").style.border = "1px solid red";
            var textNode4 = document.createTextNode("this field is required");
        }
        cellLeft4.appendChild(textNode4);
        cellLeft4.className = "spann";
        cellLeft4.style.float = "left";
        emailValidationFlag=1;
        statuss = 1;
        errorMessage.push(statuss);
        saveMode=0;
    }
  //  if (!phone == "")
    if (!phone==""&&!phoneFormat.test(phone))

    {   console.log("hi from if");
        if(errorMessage.length<1)
        {var row = tablee.insertRow(2);  statuss=2;}
        else{var row = tablee.insertRow(2+errorMessage.length);   statuss=2+errorMessage.length;}
        row.setAttribute("class","row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className = "column1";

        var cellLeft2 = row.insertCell(1);
        if (!phoneFormat.test(phone)) {
            var textNode2 = document.createTextNode("invalid phone number");
            document.getElementById("phone").style.border = "1px solid red"
            console.log("phone");
            //statuss=2;
            //phoneValidationFlag=1;
        } else {
            var textNode2 = document.createTextNode("");
            //phoneValidationFlag=0;
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

        //phoneValidationFlag=1;
       console.log("phone status " + statuss);
        errorMessage.push(statuss);
        saveMode=0;
    }

    if(country!=""||city!=""||addressfield!="")
    {
        if((country==""||city=="")&&addressErros.length==0)
        {
            if(errorMessage.length<1)
            {var row = tablee.insertRow(4);  statuss=4;}
            else{var row = tablee.insertRow(4+errorMessage.length);   statuss=4+errorMessage.length;}
            //var row = tablee.insertRow(1);
            row.setAttribute("class", "row");

            var cellLeft1 = row.insertCell(0);
            var textNode1 = document.createTextNode("");
            cellLeft1.appendChild(textNode1);
            cellLeft1.className = "column1";

            var cellLeft2 = row.insertCell(1);
            if(!country==""){
                var textNode2 = document.createTextNode("");}
            else{document.getElementById("countryid").style.border = "1px solid red";
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
            if(!city==""){
                var textNode4 = document.createTextNode("");}
            else{ document.getElementById("cityid").style.border = "1px solid red";
                var textNode4 = document.createTextNode("this field is required");}
            cellLeft4.appendChild(textNode4);
            cellLeft4.className="spann";
            cellLeft4.style.float="left";
            //emailValidationFlag=1;
           // statuss = 1;
            errorMessage.push(statuss);
            addressErros.push(statuss);
            saveMode=0;
        }
        if(addressfield==""&&addressErros.length==0)
        {
            //var row = tablee.insertRow(5);
            if(errorMessage.length<1)
            {var row = tablee.insertRow(5);  statuss=5;}
            else{var row = tablee.insertRow(5+errorMessage.length);   statuss=5+errorMessage.length;}
            row.setAttribute("class","row");

            var cellLeft1 = row.insertCell(0);
            var textNode1 = document.createTextNode("");
            cellLeft1.appendChild(textNode1);
            cellLeft1.className="column1";

            var cellLeft2 = row.insertCell(1);
            if(!addressfield==""){
                var textNode2 = document.createTextNode("");}
            else{document.getElementById("address").style.border = "1px solid red";
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

            errorMessage.push(statuss);
            addressErros.push(statuss);
            saveMode=0;
    }

     if (errorMessage.length == 0) {
        Save();
    }
}}

var phoneStatus=0;
function validatePhone() {

        var tablee = document.getElementById("contactTable");
        var phone = document.myForm.phone.value;
        //var phoneFormat = /^\d{11}$/;
        var phoneFormat = /^[0-9]/;

    /*if (statuss == 2) {
          tablee.rows[statuss - 1].cells[1].getElementsByTagName("input")[0].style.border = "1px solid #EFEEEE";
        tablee.deleteRow(statuss);
        statuss = 0;
    }*/
    if (emailValidationFlag == 1&&(phoneStatus==1||phoneValidationFlag==1)) {
        console.log("inside phone flag =1");
        tablee.rows[2].cells[1].getElementsByTagName("input")[0].style.border = "1px solid #EFEEEE";
        tablee.deleteRow(3);
        //statuss = 0;
        phoneStatus=0;
    }
    else if(emailValidationFlag==0&&(phoneStatus==1||phoneValidationFlag==1))
    {
        console.log("inside phone flag =0");
        tablee.rows[1].cells[1].getElementsByTagName("input")[0].style.border = "1px solid #EFEEEE";
        tablee.deleteRow(2);
        //statuss = 0;
        phoneStatus=0;
    }

    if(phone==""||!phoneFormat.test(phone) ){
        var valid=0;
        if(emailValidationFlag==0)
        {var row = tablee.insertRow(2);  }
        else{var row = tablee.insertRow(3);  }
        row.setAttribute("class","row");
    //    var row = tablee.insertRow(2);
    //    row.setAttribute("class", "row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className = "column1";

        var cellLeft2 = row.insertCell(1);
        if(!phone=="" ){
            if (!phoneFormat.test(phone)) {
                console.log("phone");
                var textNode2 = document.createTextNode("invalid phone number");
                document.getElementById("phone").style.border = "1px solid red"

            } else {
                var textNode2 = document.createTextNode("");
                valid=1;
        }}
        else{ document.getElementById("phone").style.border = "1px solid red";
            var textNode2 = document.createTextNode("this field is required"); }
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


        //statuss = 2;
        //errorMessage.push(statuss);
        phoneStatus=1;
        phoneValidationFlag=1;
    }
    else {console.log("inside else");
        AddNewPhoneRow();}
}

function validateAddress() {

    var tablee = document.getElementById("contactTable");

    var country=document.myForm.countryid.value;
    var city=document.myForm.cityid.value;
    var addressfield=document.myForm.address.value;

    /*if (statuss == 4) {
        tablee.rows[statuss - 1].cells[1].getElementsByTagName("select")[0].style.border = "1px solid #EFEEEE";
        tablee.rows[statuss - 1].cells[3].getElementsByTagName("select")[0].style.border = "1px solid #EFEEEE";
        tablee.deleteRow(statuss);
        statuss = 0;
    }
    else if(statuss==5)
    {
        tablee.rows[statuss - 1].cells[1].getElementsByTagName("input")[0].style.border = "1px solid #EFEEEE";
        tablee.deleteRow(statuss);
        statuss = 0;
    }*/
    if(addressErros.length>0)
    {
        for(var x=0;x<addressErros.length;x++)
        {
            //tablee.rows[addressErros[x]-x - 1].cells[1].firstChild.style.border = "1px solid #EFEEEE";
            tablee.deleteRow(addressErros[x]-x);
        }
        addressErros=[];
        //console.log("addressErrors " + addressErros);
    }

    if(country==""||city==""){
        //console.log("addressErrors " + addressErros);
    //var row = tablee.insertRow(4);
        if(errorMessage.length<1)
        {var row = tablee.insertRow(4);  addressErros.push(4); }
        else{
            if(phoneValidationFlag==0)
            {var row = tablee.insertRow(5);   addressErros.push(5); console.log("inside if");}
            else
                {var row = tablee.insertRow(5+errorMessage.length);  addressErros.push(5+errorMessage.length); console.log("inside else");}

        }
    row.setAttribute("class","row");

    var cellLeft1 = row.insertCell(0);
    var textNode1 = document.createTextNode("");
    cellLeft1.appendChild(textNode1);
    cellLeft1.className="column1";

    var cellLeft2 = row.insertCell(1);
    if(!country==""){
        var textNode2 = document.createTextNode("");}
    else{document.getElementById("countryid").style.border = "1px solid red";
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
    if(!city==""){
        var textNode4 = document.createTextNode("");}
    else{ document.getElementById("cityid").style.border = "1px solid red";
        var textNode4 = document.createTextNode("this field is required");}
    cellLeft4.appendChild(textNode4);
    cellLeft4.className="spann";
    cellLeft4.style.float="left";
        console.log("addressErrors " + addressErros);
    //statuss=4;
       // addressErros.push(4);
   }
     if(addressfield=="")
    {
        //var row = tablee.insertRow(5);
        /*if(errorMessage.length<1)
        {var row = tablee.insertRow(5+addressErros.length);  addressErros.push(5+addressErros.length); }
        else{
            if(phoneValidationFlag==0)
            {var row = tabl]ee.insertRow(6+addressErros.length);   addressErros.push(6+addressErros.length); console.log("inside if");}
            else
            {var row = tablee.insertRow(6+errorMessage.length+addressErros.length);  addressErros.push(6+errorMessage.length+addressErros.length); console.log("inside else");}
           //var row = tablee.insertRow(5+addressErros.length+errorMessage.length+phoneValidationFlag);   addressErros.push(5+addressErros.length+errorMessage.length+phoneValidationFlag); console.log("inside if");

        }*/
        if(addressErros.length==0)
        {
            if(errorMessage.length==0&&phoneValidationFlag==0)
            {
                var row = tablee.insertRow(5);  addressErros.push(5);

            }
            else if((errorMessage.length>0&&phoneValidationFlag==0)||(errorMessage.length==0&&phoneValidationFlag==1))
            {
                var row = tablee.insertRow(6);  addressErros.push(6);

            }
            else
            {
                var row = tablee.insertRow(7);  addressErros.push(7);

            }
        }
        else
        {
            if(errorMessage.length==0&&phoneValidationFlag==0)
            {
                var row = tablee.insertRow(6);  addressErros.push(6);

            }
            else if((errorMessage.length>0&&phoneValidationFlag==0)||(errorMessage.length==0&&phoneValidationFlag==1))
            {
                var row = tablee.insertRow(7);  addressErros.push(7);

            }
            else
            {
                var row = tablee.insertRow(8);  addressErros.push(8);

            }
        }
        row.setAttribute("class","row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className="column1";

        var cellLeft2 = row.insertCell(1);
        if(!addressfield==""){
            var textNode2 = document.createTextNode("");}
        else{document.getElementById("address").style.border = "1px solid red";
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

        //statuss=5;
        //addressErros.push(5);
   }
    else{console.log("inside else");
        AddNewAddressRow();}

}
