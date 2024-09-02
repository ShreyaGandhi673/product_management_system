console.log("script working");

function fetchData() {
    console.log("Data");
    let xhr = new XMLHttpRequest();
    console.log("Data");
    xhr.open("GET", "http://localhost:3000/products", true);
    console.log("Data");
    xhr.onload = function () {
        console.log("inside function");
        displayRecords(JSON.parse(xhr.responseText));
        console.log(xhr.responseText);

    }
    xhr.send();
}
window.onload = fetchData();

//function for displaying fetched medical records on ui
function displayRecords(records) {
    //design table and table column
    //console.log("displayRecords");
    let table = document.getElementById("table");
    //design colgroup
    let colgroup = document.createElement("colgroup");

    let col1 = document.createElement("col");
    col1.setAttribute("style", "width:10%;background:white");

    let col2 = document.createElement("col");
    col2.setAttribute("style", "width:10%;background:white");

    let col3 = document.createElement("col");
    col3.setAttribute("style", "width:10%;background:white");

    let col4 = document.createElement("col");
    col4.setAttribute("style", "width:10%;background:white");

    let col5 = document.createElement("col");
    col5.setAttribute("style", "width:10%;background:white");

    let col6 = document.createElement("col");
    col6.setAttribute("style", "width:10%;background:white");

    let col7 = document.createElement("col");
    col7.setAttribute("style", "width:10%;background:white");

    let col8 = document.createElement("col");
    col8.setAttribute("style", "width:10%;background:white");

    let col9 = document.createElement("col");
    col9.setAttribute("style", "width:10%;background:white");

    let col10 = document.createElement("col");
    col10.setAttribute("style", "width:10%;background:white");

    colgroup.appendChild(col1);
    colgroup.appendChild(col2);
    colgroup.appendChild(col3);
    colgroup.appendChild(col4);
    colgroup.appendChild(col5);
    colgroup.appendChild(col6);
    colgroup.appendChild(col7);
    colgroup.appendChild(col8);
    colgroup.appendChild(col9);
    colgroup.appendChild(col10);

    table.appendChild(colgroup);


    //create header row according to keys
    const headings = Object.keys(records[0]);

    let tr = document.createElement("tr");

    let th = document.createElement("th");
    th.innerText = "Product Id"
    tr.appendChild(th);

    let th1 = document.createElement("th");
    th1.innerText = "Product Name"
    tr.appendChild(th1);

    let th2 = document.createElement("th");
    th2.innerText = "Description"
    tr.appendChild(th2);

    let th3 = document.createElement("th");
    th3.innerText = "Price"
    tr.appendChild(th3);

    let th4 = document.createElement("th");
    th4.innerText = "Category"
    tr.appendChild(th4);

    let th5 = document.createElement("th");
    th5.innerText = "Stock Quantity"
    tr.appendChild(th5);

    let th6 = document.createElement("th");
    th6.innerText = "Manufacturer"
    tr.appendChild(th6);

    let th7 = document.createElement("th");
    th7.innerText = "Release Date"
    tr.appendChild(th7);

    let th8 = document.createElement("th");
    th8.innerText = "Rating"
    tr.appendChild(th8);

    // let th9=document.createElement("th");
    // th9.innerText="Operation"
    // tr.appendChild(th9);

    //append heading cells to header row
    headings.forEach(heading => {
    //     // if(heading !== 'id'){
    //     //     let th=document.createElement("th");
    //     //     th.innerText=heading;
    //     //     tr.appendChild(th);
    //     // }

    })
    th = document.createElement("th");
    th.innerText = "Actions";
    tr.appendChild(th);
    table.appendChild(tr);


    //design input cells and append to row
    records.forEach((record, index) => {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        // td.innerText = index + 1;
        // tr.appendChild(td);
        console.log("data loading");
        headings.forEach(heading => {
            // if (heading !== 'id') {
                let td = document.createElement("td");
                let input = document.createElement("input");
                input.type = "text";
                input.name = heading;
                input.value = record[heading];
                input.disabled = true;
                input.setAttribute("class", "ip" + record.id);
                input.setAttribute("id", 'inputbox');
                td.appendChild(input);
                tr.appendChild(td);

            // }
        })
        console.log("display records");
        console.log(`${record.id}`);
        
        //designing button section 
        td = document.createElement("td");
        td.innerHTML = `<div class='rowbtns'>
            <button id='editBtn' class= "editbtn ip${record.id}" onClick="editRecord(${record.id})">
                Edit
            </button>
            <button id='dltBtn' class = "dltbtn ip${record.id}" onClick='deleteRecord(${record.id})'> 
               Delete
            </button>
        </div>`
        td.style.borderRadius = "4%";
        tr.appendChild(td);
        table.appendChild(tr);

    })

    applyTableStyles();
    //table.style.display = "block";
}

function applyTableStyles() {
    let table = document.getElementById('table');
    table.style.width = '100%';
    table.style.position = 'absolute';
    table.style.marginTop = '10px';
    //table.style.marginLeft = '10%';
    table.style.textAlign = 'left';
    table.style.display = "block";
    table.style.borderCollapse = 'collapse';
    let th = table.querySelectorAll('th');
    th.forEach(header => {
        header.style.padding = '10px';
        header.style.borderBottom = '1px solid rgb(211, 211, 219)';
    });
    let td = table.querySelectorAll('td');
    td.forEach(cell => {
        cell.style.padding = '10px';
        cell.style.borderTop = '1px solid rgb(211, 211, 219)';
    });
    // let col = table.querySelector('col');
}



//update
function editRecord(id) {
    // let dltbtn=document.querySelector(`.dltbtn.ip${id}`);
    // dltbtn.setAttribute("style", "border-radius: 0");
    let allfields = document.querySelectorAll(`.ip${id}`);
    if (allfields[7].parentElement.childElementCount) {
        let savBtn = document.createElement('button');
        savBtn.setAttribute('class', `btn ip${id}`);
        savBtn.setAttribute('id', 'saveBtn');
        savBtn.addEventListener('click', () => updateRecords(allfields));
        savBtn.innerText = "Save";
        allfields[9].parentElement.appendChild(savBtn);

        allfields[0].disabled = false;
        allfields[0].focus();
        allfields.forEach(ip => {

            if (ip.tagName !== "BUTTON") {
                ip.style.border = "3px solid black"
                ip.style.borderRadius = "4px"
                ip.disabled = false;
            }
        })
        allfields.forEach(ip => ip.addEventListener('keypress', function (event) {
            if (event.key === "Enter") {
                updateRecords(allfields);
            }
        }))
    }
}

function updateRecords(fields) {
    let errorFlag = false;
    fields.forEach(ip => {
        if (ip.tagName !== "BUTTON" && ip.value === '') {
            alert(`${ip.name} Cannot be empty`)
            errorFlag = true;
            return;
        }
    });
    if (!errorFlag) {
        // console.log(fields);
        let className = fields[0].getAttribute('class');
        let match = className.match(/\d+/);
        let id;
        if (match) {
            id = match[0];
        }
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", `http://localhost:3000/products/${id}`, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        console.log(fields[2].value);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let table = document.getElementById('table');
                table.innerText = ""
                fetchData();
                alert('Updates SuccessFully');
                //     let dltbtn = document.querySelector(`.dltbtn.ip${id}`);
                //     dltbtn.setAttribute("style", "border-top-right-radius: 10px");
                //     dltbtn.setAttribute("style", "border-bottom-right-radius: 10px");
            }
        };
        xhr.send(JSON.stringify({
            

            id:fields[0].value,
            prod_name:fields[1].value,
            prod_description:fields[2].value,
            price: fields[3].value,
            category: fields[4].value,
            stock_quantity:fields[5].value,
            manufacturer:fields[6].value,
            release_date:fields[7].value,
            rating:fields[8].value
        }));
    }
}

function getResponse(id) {
    let name = "";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/products/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function () {
        if (xhr.status === 200) {
            

            console.log("Response received:", xhr.responseText); // Log the entire response
            let jsonreq = JSON.parse(xhr.responseText); // Parse the JSON response
            console.log("Parsed JSON:", jsonreq); // Log the parsed JSON object

            let name = jsonreq[0].prod_name; // Extract the product name
            console.log("Product Name:", name); 

            parseDate(name);
        }
    }
    xhr.send();
}

function parseDate(name) {
    let dlttext = document.getElementById('deleteText');
    dlttext.innerHTML = `<h2> Deleting record of ${name} <h2>`
}

let flag = false;
function showpopup(dltId) {
    getResponse(dltId)
    let popup = document.getElementById("popup");
    popup.style.display = "block";
    flag = true;
}
let dltId = null;

function deleteRecord(id) {
    if (!flag) {
        dltId = id;
        showpopup(dltId);
    } else {
        console.log("deleting");
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", `http://localhost:3000/products/${dltId}`, true);
        console.log("deleting api send");
        
        xhr.onreadystatechange = function () {
            //  console.log("deleting2");
            //  console.log(xhr.readyState,xhr.status);
             
            if (xhr.readyState === 4 && xhr.status === 204) {
                console.log("inside if");

                let table = document.getElementById('table');
                table.innerText = ""
                fetchData();
                alert('Product record deleted');
                let dlttext = document.getElementById('deleteText');
                dlttext.innerHTML = ""
            }
        };
        xhr.send();
        closePopUp();
    }
}

function closePopUp() {
    let popup = document.getElementById("popup");
    popup.style.display = "none";
    flag = false;
}

function showForm() {
    let form = document.getElementById("userForm");
    let table = document.getElementById("table");
    table.style.display = 'none';
    form.style.display = "block";
}

function addProduct(event) {
    event.preventDefault();
    console.log('adding product');
    let id = document.getElementById('id');
    let name = document.getElementById('name');
    let desc = document.getElementById('desc');
    let price= document.getElementById('price');
    let category = document.getElementById('category');
    let stock_quan = document.getElementById('stock_quan');
    let manu = document.getElementById('manu');
    let release_date = document.getElementById('date');
    let rating = document.getElementById('rating');

    // console.log(Name.value + age.value + state.value);

    if (!id .value || !name.value || !desc.value || !price.value || !category.value||!stock_quan.value|| !manu.value || !release_date.value || !rating.value) {
        alert("fill all required Fields");
        return;
    }
    let xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3000/products', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            let form = document.getElementById('userForm')
            let table = document.getElementById('table');
            form.style.display = "none";
            table.innerHTML = "";
            fetchData();
            id.value = "";
            name.value = "";
            desc.value = "";
            price.value = "";
            category.value = "";
            stock_quan.value = "";
            manu.value = "";
            release_date.value = "";
            rating.value = "";


            // patient.value = "";
            // Dob.value = "";
            // History.value = "";
            // Doctor.value = "";
            alert("New Product Added")
            table.style.display = "block";

        }
    }
    xhr.send(JSON.stringify({
        // patient_name: patient.value,
        // Dob: Dob.value,
        // medical_history: History.value,
        // doctor: Doctor.value


        id:id.value,
        prod_name:name.value,
        prod_description:desc.value,
        price: price.value,
        category: category.value,
        stock_quantity:stock_quan.value,
        manufacturer:manu.value,
        release_date:release_date.value,
        rating:rating.value

    }));
}

