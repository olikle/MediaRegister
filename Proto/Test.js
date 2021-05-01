//global var
let movieData = null;

/*const getPost = () => {
    return  fetch (url)
    .then(res => res.json())
    .then(post => console.log(posts))
}

const post = {

}

const newPost = post => {
    const options = {
        method: 'POST',
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type' : 'application/json'
        })
    }

return fetch(url, options)
.then(res => res.json())
.then(res => console.log(res))
.catch(error =>console.error(error))
}*/

function getdata(url) {
    console.log("getdata from " + url);

    
    fetch(url)

        /*.then(response => {
            if (response.status === 200) {
                fillTable(response.json());
            }
            //console.log("getdata response", response);
        })*/
        .then(function (response) {
            console.log("getdata check")
            return response.json();
        })
        .then(function (data) {
            movieData = data;
            fillTable();
        })
        .catch(error => {
            console.log("getdata error", error);
        });
}

function fillTable(){
    console.log("fillTable",movieData);

    var table=document.getElementById("datatbl");

    for(let xi=0;xi<movieData.length;xi++){
        var data1 = movieData[xi];
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
}