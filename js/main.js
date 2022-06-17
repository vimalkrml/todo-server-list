import "regenerator-runtime/runtime.js";

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoItemsList = document.getElementById('todo-items');
const nameInput = document.getElementById('name-input');
const userInput = document.getElementById('user-input');
const emailInput = document.getElementById('email-input');

window.onsubmit = function (event) {
    event.preventDefault();
}

async function getFromServer() {
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();
    console.log(data)
    createList(data);
    nameInput.value = '';
    userInput.value = '';
    emailInput.value = '';
}

function createList(users) {
    let template = '';
    users.forEach((user, value) => {
        template += `<div class="task flex justify-between border border-black rounded-sm p-1">
        <div class="">${user.name}</div>
        <button data-id="${user.id}" class="delete-btn border text-white bg-zinc-500">Delete</button>
        </div>`
    });
    // console.log(template);
    todoItemsList.innerHTML = template;

    const delbtns = document.querySelectorAll('.delete-btn');
    delbtns.forEach((delbtn, index) => {
        delbtn.onclick = () => {
            const dataDelid = delbtn.dataset.id;
            // console.log(dataDelid);
            var alertData = confirm("Delete?");
            console.log(alertData)
            if (alertData == true) {
                deleteTask(dataDelid);
            }
            else {
                getFromServer();
            }
        }
    })
    // console.log(delbtns);
}

async function deleteTask(id) {
    await fetch('http://localhost:3000/users/' + id, {
        method: "DELETE",
    })
    getFromServer();
    console.log(id);
}

const addbtns = document.querySelectorAll('.add-btn');
// console.log(addbtns);
addbtns.forEach((addbtn, index) => {
    addbtn.onclick = () => {
        addtask();
    }
})

async function addtask() {
    if (nameInput.value.length == 0) {
        alert('Name is empty !');
        var getData = prompt('Enter Your Name', '');
        nameInput.value = getData;
    }
    else if (userInput.value.length == 0) {
        alert('UserName is empty !');
        var getData = prompt('Enter Your UserName', '');
        userInput.value = getData;
    }
    else if (emailInput.value.length == 0) {
        alert('Email is empty!');
        var getData = prompt('Enter Your Email', '');
        emailInput.value = getData;
    }
    else {
        await fetch('http://localhost:3000/users', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: Math.floor(Math.random()),
                name: nameInput.value,
                username: userInput.value,
                email: emailInput.value
            }),
        })
        alert('Confirm to upload !!!');
        getFromServer();
    }
}

getFromServer();