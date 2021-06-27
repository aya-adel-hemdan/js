var result=new Array();
function search() {

    document.getElementById("myDynamicTable").deleteTHead();
    document.getElementById("tbodyy").remove();
    result=[];
    var form = document.getElementById('myForm1'); // give the form an ID

    //form.setAttribute("action","/UpdateDocument")
    var xhr = new XMLHttpRequest();              // create XMLHttpRequest
    var data = new FormData(form);                // create formData object
    if(data.get("name")==null)
        data.set("name","");
    console.log("data " + data.get("filtercode"));
    xhr.open("post", "/SearchClass");      // open connection

    xhr.send(data);
    xhr.onload=function()
    {
        var arr=xhr.responseText.split(",");
        console.log(xhr.responseText);
        ////////////////////////////////////////////////////////////////////////////////////
        for(var i=0;i<arr.length;i+=4) {
            result.push(arr[i],arr[i+1],arr[i+2],arr[i+3]);
            if(i==0)
            {
                var myTable = document.getElementById("myDynamicTable");

                myTable.className="table table-striped";
                myTable.style.width="95%";
                myTable.style.marginLeft="10px";
                var tableBody = document.createElement('tbody');
                myTable.appendChild(tableBody);
                tableBody.id="tbodyy";

                var tablehead = document.createElement('thead');
                myTable.appendChild(tablehead);

                var tr = document.createElement('tr');
                tablehead.appendChild(tr);

                var header=['Name','Code','',''];
                for (var j=0; j<4; j++){
                    var th = document.createElement('th');
                    th.appendChild(document.createTextNode(header[j]));
                    tr.appendChild(th);
                }
            }

            var tbodyRef = document.getElementById('myDynamicTable').getElementsByTagName('tbody')[0];

            // Insert a row at the end of table
            var newRow = tbodyRef.insertRow();

            var idd = "row" + i/4;
            console.log("idd  " + idd);
            newRow.id = idd;

            // Insert a cell at the end of the row
            var Cell1 = newRow.insertCell();
            var Cell2 = newRow.insertCell();
            var Cell5 = newRow.insertCell();
            var Cell6 = newRow.insertCell();

            // Append a text node to the cell
            var newText1 = document.createTextNode(arr[i]);
            Cell1.appendChild(newText1);

            var newText2 = document.createTextNode(arr[i+1]);
            Cell2.appendChild(newText2);

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
            button2.setAttribute('onclick', 'EditRows()');

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
            button.setAttribute('onclick', 'deleteRows()');

            Cell6.appendChild(button);
            Cell6.style.backgroundColor="#F5F5F5";


        }
        /////////////////////////////////////////////////////////////////////////////////////
    }
    console.log(xhr.responseText);
    console.log("result "+result);
    //Savecountt++;

    //window.location.replace("AddCustomerMainData");
   // window.location.replace("/Customer_Classes");

}
function deleteRows() {
    console.log("result "+result);
//console.log(result.splice(",")[3]);
    //var dbidd=result.splice(",")[3];
    var rowId = event.target.parentNode.parentNode.id;
    var row = document.getElementById("rowId");
    console.log("rowId" + rowId);
    var d = parseInt(rowId.toString().substr(3,rowId.toString().length-1)) ;

    var list = document.getElementById("tbodyy");
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/DeleteCustomerClass?id="+result[(d*4)+3]);

    xhttp.send();
    console.log(xhttp.responseText);
    xhttp.onload=function () {
        if(xhttp.responseText.split(",")[0]==1)
        {

            list.removeChild(list.childNodes[d]);

            var x = document.getElementById("tbodyy").rows;
            console.log("d  " + d);
            for (var c = 0; c <= x.length - 1; c++) {
                x[c].id = "row" + c;
                //console.log("x[c].id"+ x[c].id);
                //documents.splice(d,d+1);
                 }
                result.splice(d,d+1);

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

function EditRows() {

    var newarr=new Array();
    for(var i=0;i<result.length;i++)
    {
        newarr.push([result[i],result[i+1],result[i+2]+result[i+3]]);
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
    console.log("result[(d*4)]"+result[(d*4)+3]);
    xhr.open("GET", "/UpdateCustomerClass?id="+result[(d*4)+3]);
    xhr.send();
    xhr.onload=function()
    {
        editflag=1;
        console.log(xhr.responseText);

        arr=xhr.responseText.split(",");
        window.location.replace("/Customer_Classes");

    }
 
}