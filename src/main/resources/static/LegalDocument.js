
/////////////////////////////////////////////////////////////////////////////////////////////
var ii=0;
var idd = 0;
var dbID = 0;
var documents = new Array();
var saveMode=0;
var CustomerDocuments=new Array();
function activeSave() {
   console.log( document.getElementById("customerid").value);
    if(document.getElementById("customerid").value==0)
    {
        alert("please add customer first");
    }
    else {
        saveMode = 1;
        console.log("inside active save");
        validate();
        //document.getElementById("username").onkeyup="validate()";
        document.getElementById("typeid").addEventListener("change", validate);
        document.getElementById("countryid").addEventListener("change", validate);
        document.getElementById("IssuingDate").addEventListener("change", validate);
        document.getElementById("EndDate").addEventListener("change", validate);
        document.getElementById("picture").addEventListener("change", validate);
    }
}
function AddNewRow() {
    if(saveMode==1) {
        var doctype = document.getElementById("typeid").value;
        var mylist = document.getElementById("typeid");
        var DocumentType = mylist.options[mylist.selectedIndex].text;
        //console.log(DocumentType);

        var country = document.getElementById("countryid").value;
        var mylist2 = document.getElementById("countryid");
        var IssuingCountry = mylist2.options[mylist2.selectedIndex].text;
        //console.log(IssuingCountry);

        var issuedate = document.getElementById("IssuingDate").value;
        var enddate = document.getElementById("EndDate").value;
        var picture = document.getElementById("picture").value;
        var remark = document.getElementById("remark").value;

        if ([doctype, country, issuedate, enddate, picture].every(x => x !== '')) {

            if (ii == 0&&document.getElementById("result").value=="") {
                var myTable = document.getElementById("myDynamicTable");

                myTable.className = "table table-striped";

                var tableBody = document.createElement('tbody');
                myTable.appendChild(tableBody);
                tableBody.id = "tbodyy";

                var tablehead = document.createElement('thead');
                myTable.appendChild(tablehead);

                var tr = document.createElement('tr');
                tablehead.appendChild(tr);

                var header = ['Type', 'Issuing Country', 'Issuing Date', '', ''];
                for (var j = 0; j < 5; j++) {
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


            // Append a text node to the cell
            var newText1 = document.createTextNode(DocumentType);
            Cell1.appendChild(newText1);

            var newText2 = document.createTextNode(IssuingCountry);
            Cell2.appendChild(newText2);

            var newText3 = document.createTextNode(issuedate);
            Cell3.appendChild(newText3);

            ii++;

            //////////////////////////////////////////////////////////////////////////
            var form = document.getElementById('myForm'); // give the form an ID
            var xhr = new XMLHttpRequest();              // create XMLHttpRequest
            var data = new FormData(form);                // create formData object

            xhr.open("post", form.action);      // open connection
            xhr.send(data);

            var DataBaeId = xhr.responseText;
            console.log("DataBaeId " + DataBaeId);
            //documents.push(DataBaeId);
            CustomerDocuments.push([doctype, country, issuedate, enddate, picture, remark, DataBaeId]);
            xhr.onload = function () {

                DataBaeId = parseInt(this.responseText);
                console.log("DataBaeId2 " + DataBaeId);
                CustomerDocuments[ii - 1][6] = (DataBaeId);
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
            button2.style.border = "none";
            button2.style.backgroundColor = "#F5F5F5";

            button2.setAttribute('type', 'button');
            button2.setAttribute('value', 'Edit');

            // ADD THE BUTTON's 'onclick' EVENT.
            button2.setAttribute('onclick', 'EditRows()');

            Cell4.appendChild(button2);
            Cell4.style.backgroundColor = "#F5F5F5";

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

            Cell5.appendChild(button);
            Cell5.style.backgroundColor = "#F5F5F5";


            document.getElementById("typeid").value = '';
            document.getElementById("countryid").value = '';
            document.getElementById("IssuingDate").value = '';
            document.getElementById("EndDate").value = '';
            document.getElementById("picture").value = '';

        }

    else {

        alert("fill all columns");
    }
    }
}

function deleteRows() {
    if(document.getElementById("result").value!="") CustomerDocuments=ar;
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
    var dbidd=CustomerDocuments[d][6];
    console.log(dbidd);
    //console.log("documents before delete"+ documents);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/DeleteDocument?id="+dbidd);
    // xmlhttp.open("GET","getuser.php?fname="+abc ,true);
    //var params = JSON.stringify({ id: dbidd });
    xhttp.send();
    console.log(xhttp.responseText);

    documents.splice(d,d+1);
    // console.log("documents after"+ documents);
    ii--;
    if(ii==0)
    {
        document.getElementById("myDynamicTable").deleteTHead();
    }
}
var dbidd=0;
var rowId=0;
var updatecount=0;
function EditRows() {

    if(document.getElementById("result").value!="") CustomerDocuments=ar;
    rowId = event.target.parentNode.parentNode.id;
    var list = document.getElementById("tbodyy");
    var d = parseInt(rowId.charAt(3)) ;
    dbidd=CustomerDocuments[d][6];
    console.log("dbidd "+dbidd);

   // document.getElementById("typeid").value = CustomerDocuments[d][0];
    //document.getElementById("countryid").value = CustomerDocuments[d][1];
    for (var i = 0; i < document.getElementById("typeid").options.length; ++i) {
        if (document.getElementById("typeid").options[i].text === CustomerDocuments[d][0])
        {
            document.getElementById("typeid").options[i].selected = true;}
    }
    for (var i = 0; i < document.getElementById("countryid").options.length; ++i) {
        if (document.getElementById("countryid").options[i].text === CustomerDocuments[d][1])
        {
            document.getElementById("countryid").options[i].selected = true;}
    }
    document.getElementById("IssuingDate").value = CustomerDocuments[d][2];
    document.getElementById("EndDate").value = CustomerDocuments[d][3];
    //document.getElementById("picture").value = documents[d][4];
    document.getElementById("remark").value = CustomerDocuments[d][5];
    if(CustomerDocuments[d][4]!=""){
    document.getElementById("image").style.display="";
    document.getElementById("hreff").style.display="";
    document.getElementById("image").src="/sid?id="+CustomerDocuments[d][4];
    document.getElementById("hreff").href="/sid?id="+CustomerDocuments[d][4];}
    else{
        document.getElementById("image").style.display="none";
        document.getElementById("hreff").style.display="none";
        document.getElementById("image").src="";
        document.getElementById("hreff").href="";
    }

    document.getElementById("AddBtn").value="Update";
    console.log("111111111");
    document.getElementById("AddBtn").setAttribute("onclick","UpdateRow()");
    console.log(document.getElementById("AddBtn").getAttribute("onclick"));
}

function UpdateRow() {

    console.log("updaterow");
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
    databaseid.setAttribute("style","display:none" );
    form.appendChild(databaseid);

    //form.setAttribute("action","/UpdateDocument")
    var xhr = new XMLHttpRequest();              // create XMLHttpRequest
    var data = new FormData(form);                // create formData object
    console.log("data "+data.get("id"));
    xhr.open("post", "/UpdateDocument");      // open connection
    xhr.send(data);
    console.log(xhr.responseText);

    var doctype = document.getElementById("typeid").value;
    var mylist = document.getElementById("typeid");
    var DocumentType = mylist.options[mylist.selectedIndex].text;
    //console.log(DocumentType);

    var country = document.getElementById("countryid").value;
    var mylist2 = document.getElementById("countryid");
    var IssuingCountry = mylist2.options[mylist2.selectedIndex].text;
    //console.log(IssuingCountry);

    var issuedate = document.getElementById("IssuingDate").value;
    var enddate = document.getElementById("EndDate").value;
    var picture = document.getElementById("picture").value;
    var remark = document.getElementById("remark").value;

    //console.log("issuedate "+issuedate);
    //document.getElementById('tbodyy').rows[d].cells[0].childNodes[0]=DocumentType;
    document.getElementById('tbodyy').rows[d].cells[0].innerHTML=DocumentType;
    document.getElementById('tbodyy').rows[d].cells[1].innerHTML=IssuingCountry;
    document.getElementById('tbodyy').rows[d].cells[2].innerHTML=issuedate;

    document.getElementById("typeid").value = '';
    document.getElementById("countryid").value = '';
    document.getElementById("IssuingDate").value = '';
    document.getElementById("EndDate").value = '';
    document.getElementById("picture").value = '';
    document.getElementById("remark").value = '';
    document.getElementById("image").style.display="none";
    document.getElementById("hreff").style.display="none";
    document.getElementById("image").src="";
    document.getElementById("hreff").href="";

    document.getElementById("AddBtn").value="Save";
    document.getElementById("AddBtn").setAttribute("onclick","activeSave()");

    CustomerDocuments[d][0]=doctype;
    CustomerDocuments[d][1]=country;
    CustomerDocuments[d][2]=issuedate;
    CustomerDocuments[d][3]=enddate;
    CustomerDocuments[d][4]=picture;
    CustomerDocuments[d][5]=remark;

    updatecount++;

}

///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
var statuss=0;
var errorMessage=new Array();
function validate() {
    var tablee = document.getElementById("documentTable");
    var DocumentType = document.myForm.Documenttypeid.value;
    var Issuingcountry = document.myForm.countryid.value;
    var IssuingDate = document.myForm.IssuingDate.value;
    var EndDate = document.myForm.EndDate.value;
    var picture=document.myForm.picture.value;

    var nameFormat = /^([a-zA-Z ]){2,30}$/;
    var emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var phoneFormat = /^\d/;

    if (errorMessage.length>0) {
        // console.log("statuss " + statuss)
        for(var i=0;i<errorMessage.length;i++ ) {

         /*   if(errorMessage[i]==1){
            tablee.rows[errorMessage[i]-i - 1].cells[1].getElementsByTagName("select")[0].style.border = "1px solid #EFEEEE";
            tablee.rows[errorMessage[i] -i- 1].cells[3].getElementsByTagName("select")[0].style.border = "1px solid #EFEEEE";}
            else{
                tablee.rows[errorMessage[i]-i - 1].cells[1].getElementsByTagName("input")[0].style.border = "1px solid #EFEEEE";
                tablee.rows[errorMessage[i] -i- 1].cells[3].getElementsByTagName("input")[0].style.border = "1px solid #EFEEEE";
            }*/
            tablee.rows[errorMessage[i] - i - 1].cells.item(1).childNodes[0].style.border="1px solid #EFEEEE";
            //if(tablee.rows[errorMessage[i] - i - 1].cells.item(3)!=null)
            tablee.rows[errorMessage[i] - i - 1].cells.item(3).childNodes[0].style.border="1px solid #EFEEEE";

            tablee.deleteRow(errorMessage[i]-i);

        }
        errorMessage=[];
    }

     if (DocumentType==""||Issuingcountry=="")
    {
        var row = tablee.insertRow(1);
        row.setAttribute("class","row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className="column1";

        var cellLeft2 = row.insertCell(1);
        if(!DocumentType==""){
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
        if(!Issuingcountry==""){
            var textNode4 = document.createTextNode("");}
        else{ document.getElementById("countryid").style.border = "1px solid red";
            var textNode4 = document.createTextNode("this field is required");}
        cellLeft4.appendChild(textNode4);
        cellLeft4.className="spann";
        cellLeft4.style.float="left";

        statuss=1;
        errorMessage.push(statuss);
        saveMode=0;
    }
     if (IssuingDate==""||EndDate==""|| IssuingDate>EndDate)
    {
        if(errorMessage.length<1)
        {var row = tablee.insertRow(2);  statuss=2;}
        else{var row = tablee.insertRow(2+errorMessage.length); statuss=2+errorMessage.length;}
        row.setAttribute("class","row");

        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className="column1";

        var cellLeft2 = row.insertCell(1);
        if(!IssuingDate==""){
            //if(!creditFormat.test(credit))
            var textNode2 = document.createTextNode("");}
        else{document.getElementById("IssuingDate").style.border = "1px solid red";
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
        if(!EndDate==""){
            if(IssuingDate>EndDate)
            {var textNode4 = document.createTextNode("invalid date");
                document.getElementById("EndDate").style.border = "1px solid red"
                console.log("enddate");}
            else{  var textNode4 = document.createTextNode("");}}
        else{ document.getElementById("EndDate").style.border = "1px solid red";
            var textNode4 = document.createTextNode("this field is required");}
        cellLeft4.appendChild(textNode4);
        cellLeft4.className="spann";
        cellLeft4.style.float="left";

        //statuss=7;
        errorMessage.push(statuss);
        saveMode=0;
    }
    if (picture=="")
    {
        if(errorMessage.length<1)
        {var row = tablee.insertRow(3);  statuss=3;}
        else{var row = tablee.insertRow(3+errorMessage.length); statuss=3+errorMessage.length;}
        row.setAttribute("class","row");


        var cellLeft1 = row.insertCell(0);
        var textNode1 = document.createTextNode("");
        cellLeft1.appendChild(textNode1);
        cellLeft1.className="column1";

        var cellLeft2 = row.insertCell(1);
        if(!picture==""){
            var textNode2 = document.createTextNode("");}
        else{document.getElementById("picture").style.border = "1px solid red";
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
       else if (errorMessage.length == 0) {
        AddNewRow();
    }
}
var ar=new Array();
function onloading() {

    var documetsCount = document.getElementById("docType").length;
    var selectdocumetTypes = document.getElementById("docType");
    var selectIssuingDate = document.getElementById("docDate");
    var selectIssuingCountry = document.getElementById("docCountry");
    var selectDocid = document.getElementById("docid");
    var res=document.getElementById("result").value;
    console.log("res "+res);
    res=res.toString().split(",");
    if(res!="")
    {//CustomerDocuments=res;
        document.getElementById("tbodyy").rows="";
        document.getElementById("myDynamicTable").deleteTHead();

        for(var i=0;i<res.length-1;i+=7)
        {
            ar.push([res[i],res[i+1],res[i+2],res[i+3],res[i+4],res[i+5],res[i+6]]);
        }

        console.log("ar "+ar);
        for(var i=0;i<ar.length;i++)
        {
            if (i == 0) {
                var myTable = document.getElementById("myDynamicTable");

                myTable.className = "table table-striped";

                var tableBody = document.createElement('tbody');
                myTable.appendChild(tableBody);
                tableBody.id = "tbodyy";

                var tablehead = document.createElement('thead');
                myTable.appendChild(tablehead);

                var tr = document.createElement('tr');
                tablehead.appendChild(tr);

                var header = ['Type', 'Issuing Country', 'Issuing Date', '', ''];
                for (var j = 0; j < 5; j++) {
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

            var newText1 = document.createTextNode(ar[i][0]);
            Cell1.appendChild(newText1);

            var newText2 = document.createTextNode(ar[i][1]);
            Cell2.appendChild(newText2);

            var newText3 = document.createTextNode(ar[i][2]);
            Cell3.appendChild(newText3);


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

            Cell4.appendChild(button2);
            Cell4.style.backgroundColor = "#F5F5F5";

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

            Cell5.appendChild(button);
            Cell5.style.backgroundColor = "#F5F5F5";


        }

    }
    else{
    for (var m = 1; m < documetsCount; m++) {
        var tempArray = new Array();
        tempArray.push(selectdocumetTypes[m].value);
        tempArray.push(selectIssuingCountry[m].value);
        tempArray.push(selectIssuingDate[m].value);
        tempArray.push("");
        tempArray.push("");
        tempArray.push("")
        tempArray.push(selectDocid[m].value);
        CustomerDocuments.push(tempArray);
    }}

    for (var i = 0; i < CustomerDocuments.length; i++) {
        if (i == 0) {
            var myTable = document.getElementById("myDynamicTable");

            myTable.className = "table table-striped";

            var tableBody = document.createElement('tbody');
            myTable.appendChild(tableBody);
            tableBody.id = "tbodyy";

            var tablehead = document.createElement('thead');
            myTable.appendChild(tablehead);

            var tr = document.createElement('tr');
            tablehead.appendChild(tr);

            var header = ['Type', 'Issuing Country', 'Issuing Date', '', ''];
            for (var j = 0; j < 5; j++) {
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


        var typeid=CustomerDocuments[i][0];
        var typeDesc = document.createElement("input");
        var forme=document.createElement("form");
        typeDesc.setAttribute("type", "number");
        typeDesc.setAttribute("name", "id");
        typeDesc.setAttribute("id", "id");
        typeDesc.setAttribute("value", typeid);
        typeDesc.style.display = "none";
        // databaseid.setAttribute("value",dbidd );
        console.log("typeid  " + typeid);
        //forme2.method="post";
        forme.appendChild(typeDesc);

        //form.setAttribute("action","/UpdateDocument")
        var xhr = new XMLHttpRequest();              // create XMLHttpRequest
        var data = new FormData(forme);                // create formData object
        console.log("data " + data.get("id"));
        xhr.open("GET", "/findDescription?id="+typeid);      // open connection
        xhr.send();
        var newText1;
        xhr.onload = function () {

            console.log(this.responseText);
            var result = this.responseText;

             newText1 = document.createTextNode(result);
            Cell1.appendChild(newText1);
        }
        var countryidd=CustomerDocuments[i][1];
        var forme2=document.createElement("form");
        var countryDesc = document.createElement("input");
        countryDesc.setAttribute("type", "number");
        countryDesc.setAttribute("name", "id");
        countryDesc.setAttribute("id", "id");
        countryDesc.setAttribute("value", countryidd);
        countryDesc.style.display = "none";
        // databaseid.setAttribute("value",dbidd );
        console.log("countryidd  " + countryidd);
        //forme2.method="post";
        forme2.appendChild(countryDesc);

        //form.setAttribute("action","/UpdateDocument")
        var xhr = new XMLHttpRequest();              // create XMLHttpRequest
        var data = new FormData(forme2);                // create formData object
        console.log("data " + data.get("id"));
        xhr.open("GET", "/findDescription?id="+countryidd);      // open connection
        xhr.send();
        var newText1;
        xhr.onload = function () {

            console.log(this.responseText);
            var result = this.responseText;

            newText2 = document.createTextNode(result);
            Cell2.appendChild(newText2);
        }
        
        // Append a text node to the cell
       /* var newText1 = document.createTextNode(CustomerDocuments[i][0]);
        Cell1.appendChild(newText1);*/

        //var newText2 = document.createTextNode(CustomerDocuments[i][1]);
       // Cell2.appendChild(newText2);

        var newText3 = document.createTextNode(CustomerDocuments[i][2]);
        Cell3.appendChild(newText3);


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

        Cell4.appendChild(button2);
        Cell4.style.backgroundColor = "#F5F5F5";

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

        Cell5.appendChild(button);
        Cell5.style.backgroundColor = "#F5F5F5";


    }
}

