window.addEventListener("load",Window_Onload);
function togglediv() {
    showdiv = document.getElementById("adddiv");
    hidediv = document.getElementById("tbldiv");
    console.log(showdiv.style.display, showdiv)
    console.log(hidediv.style.display, hidediv)
    if(showdiv.style.display === "block") {
        showdiv.style.display = "none";
        hidediv.style.display = "block";
    } else {
       showdiv.style.display = "block";
       hidediv.style.display = "none";
    }
}


function searchField_onkeypress(event) {
   if (event.which == 13) {
       console.log(event);
   }
}
/*
var table=document.getElementById("datatbl");


for(let xi=0;xi<data.length;xi++){
var data1 = data[xi];
var row = table.insertRow(table.rows.length);
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);
cell1.innerHTML = data1.title;
cell2.innerHTML = data1.provider;
cell3.innerHTML = data1.watched_date;
cell4.innerHTML = "rating";
}
*/
function DoRest(restType)
{
   //document.getElementById("StatusCommand").innerText = "Do " + restType;
   console.log("DoRest", restType);
   if (restType === "Read")
   {
       DoRestRead(document.getElementById("read_recordid").value);
   }
   if (restType === "Create")
   {
       DoRestCreateUpdate(null, document.getElementById("create_title").value, document.getElementById("create_description").value);
   }
   if (restType === "Update")
   {
       DoRestCreateUpdate(document.getElementById("recordid").value, document.getElementById("title").value, document.getElementById("description").value);
   }
   if (restType === "Delete")
   {
       DoRestDelete(document.getElementById("read_recordid").value);
   }
   if (restType === "List")
   {
       DoRestList();
   }
}
// rest read record with id 
function DoRestRead(recordId)
{
   const options = {
       method: 'GET'
   }
   DoRestCall("/api/movies/" + recordId, options, CallbackAfterRead);
}
// rest create/update record 
function DoRestCreateUpdate(recordId, recordTitle, recordDescription)
{
   let url = "/api/movies";
   // data to send
   let postBody = {
       title: recordTitle,
       description: recordDescription
   }
   // with recordid, update values
   if (recordId)
   {
       url += "/" + recordId;
   }
   // POST for create/update
   const options = {
       method: 'POST',
       body: JSON.stringify(postBody),
       headers: new Headers({
           'Content-Type' : 'application/json'
       })
   }
   DoRestCall(url, options, CallbackAfterSave);
}
// rest delete record with id 
function DoRestDelete(recordId)
{
   const options = {
       method: 'DELETE'
   }
   DoRestCall("/api/movies/" + recordId, options, CallbackDelete);
}
           // rest read record with id 
function DoRestList()
{
   const options = {
       method: 'GET'
   }
   DoRestCall("/api/movies/", options, CallbacktFillTbl);
}
// Aufruf beim Start der Website
// Füllen der Tabelle
function Window_Onload(){
   console.log("windowonload...");
   DoRestList();
}

// set read record values in text boxes 


// finally rest call 
function DoRestCall(url, options, callback)
{
   return fetch(url, options)
       .then(response => {
           console.log("response", response);
           console.log("response headers Content-Type", response.headers.get('Content-Type'));

           console.log("response status", response.status);
           console.log("response statusText", response.statusText);
           console.log("response type", response.type);
           console.log("response url", response.url);
           return response;
       })
        //.then(response => response.json())
        .then(res => {
            var contentType = res.headers.get('Content-Type');
            console.log(contentType, contentType.indexOf("application/json"));
            if (contentType.indexOf("application/json") > -1)
                return res.json();
            else
                return { }
        })
       .then(res => {
           // call this function with the response object
           if (callback)
           {
               callback(res);
           }
           return res;
       })
       .then(res => console.log("response json", res))
       .catch(error =>console.error(error))
}
function CallbackRetJson(res)
{
   let innerText = "";
   if (res)
   {
       innerText += JSON.stringify(res);
   }
   document.getElementById("CommandResult").innerText = innerText;
}
//Tabelle füllen
function CallbacktFillTbl(resData){
    console.log("CallbackFillTbl", resData);
    
    var table=document.getElementById("datatbl");
    table.getElementsByTagName("tbody").innerHTML = "";


    for(let xi=0; xi<resData.length; xi++){
        var data1 = resData[xi];
        var row = table.insertRow(table.rows.length);
        row.onclick = tblOnclick;
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = data1.title;
        cell2.innerHTML = data1.description;
        cell3.innerHTML = data1.record_id;
        cell4.innerHTML = "rating";
    }
}
function tblOnclick(){
    console.log("tblOnclick");
    var cell = this.getElementsByTagName("td")[2];
    var id = cell.innerText;
    console.log("id: " + id);
    DoRestRead(id);
    Show_Hide_Delete();
}
function CallbackAfterRead(res)
{
   const record = res;
   document.getElementById("recordid").innerText = record.id;
   document.getElementById("title").value = record.title;
   document.getElementById("description").value = record.description;
   document.getElementById("btnUpdate").innerText = "Aktualisieren";
   togglediv();
}
function Create_Update_Record(){
    console.log("call Create_Update_Record");
    let recordId = document.getElementById("recordid").innerText;
    if (recordid = ""){
        DoRestCreateUpdate(null, document.getElementById("title").value, document.getElementById("description").value);
    } else {
        DoRestCreateUpdate(recordid, document.getElementById("title").value, document.getElementById("description").value);
    }
    
}
function CallbackAfterSave()
{
    clear_fields();
    togglediv();
    DoRestList();
}
function clear_fields(){
    document.getElementById("btnUpdate").innerText = "Hinzufügen";
    document.getElementById("recordid").innerText = "";
    document.getElementById("title").innerText = "";
    document.getElementById("description").innerText = "";
}
function Cancle_Btn(){
    clear_fields();
    togglediv();
    DoRestList();
}
function Delete_Btn(){
    let recordId = document.getElementById("recordid").innerText;
    DoRestDelete(recordId);
}
function CallbackDelete() {
    clear_fields();
    togglediv();
    DoRestList();
}