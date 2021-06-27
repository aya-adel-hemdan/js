function changedisplayy() {
    var typeid=document.getElementById("LookupTypes").value;
    var type = document.createElement("input");
    var forme=document.createElement("form");
    type.setAttribute("type", "text");
    type.setAttribute("name", "lookup");
    type.setAttribute("id", "lookup");
    type.setAttribute("value", typeid);
    type.style.display = "none";
    // databaseid.setAttribute("value",dbidd );
    console.log("longid  " + typeid);
    //forme.method="post";
    forme.appendChild(type);
    var longid=document.getElementById("ParentLookup").value;
    var parent = document.createElement("input");
    var forme=document.createElement("form");
    parent.setAttribute("type", "text");
    parent.setAttribute("name", "parent");
    parent.setAttribute("id", "parent");
    parent.setAttribute("value", longid);
    parent.style.display = "none";
    // databaseid.setAttribute("value",dbidd );
    console.log("longid  " + longid);
    //forme.method="post";
    forme.appendChild(parent);


    //form.setAttribute("action","/UpdateDocument")
    var xhr = new XMLHttpRequest();              // create XMLHttpRequest
    var data = new FormData(forme);                // create formData object
    console.log("data " + data.get("id"));
    xhr.open("GET", "/findLookupValue?id="+typeid+"&parent="+longid);      // open connection
    xhr.send();
    xhr.onload = function () {

        var arrr=new Array();
        arrr=xhr.responseText.split(",");
        //document.getElementById("currencyid").getElementsByTagName('option')[1].selected = 'selected';
        var daySelect = document.getElementById("cityid");
        daySelect.innerHTML="";
        for (var i = 1; i < arrr.length; i+=2) {
            /*  document.getElementById("cityid").options[i].text = arrr[i-1] ;
              document.getElementById("cityid").options[i].value=arrr[i];*/

            if(i==1)
            {
                var myOption2 = document.createElement("option");
                myOption2.text = "";
                daySelect.add(myOption2);
            }

            var myOption = document.createElement("option");
            myOption.text = arrr[i - 1];
            console.log("lookup value text "+arrr[i-1]);
            myOption.value = arrr[i];
            console.log("lookup value value "+arrr[i]);
            daySelect.add(myOption);

        }

    };


    if(!document.myForm1.lookupTypes.value=="")
    { document.getElementById("cityid").disabled=false; }
    else
    {
        document.getElementById("cityid").disabled=true;

    }

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
var result=new Array();
function search() {
    if(document.getElementById("tbodyy").rows.length>0)
    {document.getElementById("myDynamicTable").deleteTHead();
    document.getElementById("tbodyy").remove();}

    var form = document.getElementById('myForm1'); // give the form an ID

    //form.setAttribute("action","/UpdateDocument")
    var xhr = new XMLHttpRequest();              // create XMLHttpRequest
    var data = new FormData(form);                // create formData object
    console.log("data " + data.get("lookupTypes"));
    console.log(data.get("cityid"));
    if(data.get("ParentLookup")==null)
        data.set("ParentLookup","");
    if(data.get("cityid")=="")
        data.set("cityid","");
    console.log(data.get("ParentLookup"));
    xhr.open("post", "/SearchLookups");      // open connection

    xhr.send(data);
    xhr.onload = function () {
        var arr = xhr.responseText.split(",");
        console.log(xhr.responseText);
        ////////////////////////////////////////////////////////////////////////////////////
        if(data.get("lookupTypes")==""||data.get("lookupTypes")==null) alert("please select lookuptype");
        else {
            for (var i = 0; i < arr.length; i += 7) {
                result.push(arr[i], arr[i + 1], arr[i + 2], arr[i + 3], arr[i + 4], arr[i + 5], arr[i + 6]);
                if (i == 0) {
                    var myTable = document.getElementById("myDynamicTable");

                    myTable.className = "table table-striped";
                    myTable.style.width = "98%";
                    myTable.style.marginLeft = "10px";
                    var tableBody = document.createElement('tbody');
                    myTable.appendChild(tableBody);
                    tableBody.id = "tbodyy";

                    var tablehead = document.createElement('thead');
                    myTable.appendChild(tablehead);

                    var tr = document.createElement('tr');
                    tablehead.appendChild(tr);

                    var header = ['LookupType', 'LookupCode', 'LookupValue', 'ParentValue', 'Active Status', '', ''];
                    for (var j = 0; j < 7; j++) {
                        var th = document.createElement('th');
                        th.appendChild(document.createTextNode(header[j]));
                        tr.appendChild(th);
                    }
                }

                var tbodyRef = document.getElementById('myDynamicTable').getElementsByTagName('tbody')[0];

                // Insert a row at the end of table
                var newRow = tbodyRef.insertRow();

                var idd = "row" + i / 7;
                console.log("idd  " + idd);
                newRow.id = idd;

                // Insert a cell at the end of the row
                var Cell1 = newRow.insertCell();
                var Cell2 = newRow.insertCell();
                var Cell3 = newRow.insertCell();
                var Cell4 = newRow.insertCell();
                var Cell5 = newRow.insertCell();
                var Cell6 = newRow.insertCell();
                var Cell7 = newRow.insertCell();

                // Append a text node to the cell
                var newText1 = document.createTextNode(arr[i]);
                Cell1.appendChild(newText1);

                var newText2 = document.createTextNode(arr[i + 1]);
                Cell2.appendChild(newText2);

                var newText3 = document.createTextNode(arr[i + 2]);
                Cell3.appendChild(newText3);

                var newText4 = document.createTextNode(arr[i + 3]);
                Cell4.appendChild(newText4);

                var newText5 = document.createTextNode(arr[i + 4]);
                Cell5.appendChild(newText5);

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

                Cell6.appendChild(button2);
                Cell6.style.backgroundColor = "#F5F5F5";

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

                Cell7.appendChild(button);
                Cell7.style.backgroundColor = "#F5F5F5";


            }
        }
    }
    //result="";
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteRows() {
    console.log("result "+result);
//console.log(result.splice(",")[3]);
    //var dbidd=result.splice(",")[3];
    var rowId = event.target.parentNode.parentNode.id;
    var row = document.getElementById("rowId");
    console.log("rowId" + rowId);

    var list = document.getElementById("tbodyy");

    var d = parseInt(rowId.charAt(3)) ;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/DeleteLookup?id="+parseInt(result[(d*7)+5]));

    xhttp.send();
    console.log(xhttp.responseText);
    xhttp.onload=function()
    {
        if(xhttp.responseText.split(",")[0]==1)
        {
            list.removeChild(list.childNodes[d]);

            var x = document.getElementById("tbodyy").rows;
            console.log("d  " + d);
            for (var c = 0; c <= x.length - 1; c++) {
                x[c].id = "row" + c;
                //console.log("x[c].id"+ x[c].id);
            }
            console.log("result[(d*7)+6]"+result[(d*7)+5]);



            //documents.splice(d,d+1);
            result.splice(d*7,(d*7)+6);

            if(result.length==0)
            {
                document.getElementById("myDynamicTable").deleteTHead();
                //sessionStorage.removeItem("contactPerson");
            }
            alert(xhttp.responseText.split(",")[1]);
        }
        else
        {
            alert(xhttp.responseText.split(",")[1]);
        }
    }


}

/////////////////////////////////////////////////////////////////////////////////////

function EditRows() {

    var newarr=new Array();
    for(var i=0;i<result.length;i++)
    {
        newarr.push([result[i],result[i+1],result[i+2]+result[i+3]+result[i+4]+result[i+5]+result[i+6]])
    }
    //console.log("newarr"+newarr);

    var rowId = event.target.parentNode.parentNode.id;
    console.log(rowId);
    var list = document.getElementById("tbodyy");
    var d = parseInt(rowId.charAt(3));
    console.log("d "+d);
    console.log("result[0]"+result);
    console.log("result[d][3] "+result[3]);
    var xhr=new XMLHttpRequest();
    //xhr.open("GET", "/UpdateCustomerClass?id="+result.splice(",")[3]);
    console.log("result[(d*4)]"+result[(d*7)+5]);
    xhr.open("GET", "/UpdateLookup?id="+result[(d*7)+5]);
    xhr.send();
    xhr.onload=function()
    {
        editflag=1;
        console.log(xhr.responseText);

        arr=xhr.responseText.split(",");
        window.location.replace("/Add_Lookup");
    }

}