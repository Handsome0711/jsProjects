var addButton = document.getElementById('addButton');
var inputTask = document.getElementById('new-task');
// var deleteBtn = document.getElementById('deleteButton');
var tasks = document.getElementById('tasks');

function createNewElement(task) {
    var listItem = document.createElement('li');
    var delButton = document.createElement('button');
    var label = document.createElement('label');
    //var checkBox = document.createElement('input');
    label.innerText = task;

    //checkBox.type = "checkbox";

    delButton.innerText="Delete";
    delButton.className="delete";
    label.className="uncheck";
   // listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(delButton);

    return listItem;
}

function addTask() {
        var listItem=createNewElement(inputTask.value);
        tasks.appendChild(listItem);
        bindTaskEvents(listItem, finishTask);
        inputTask.value="";
        save();
}
addButton.onclick = addTask;

function finishTask() {
    var listItem=this.parentNode;
    var label = listItem.querySelector('label');
    label.className="check";
    bindTaskEvents(listItem,unfinishTask);
    save(label);
}
function unfinishTask(){
    var listItem=this.parentNode;
    var label = listItem.querySelector('label')
    label.className = "uncheck";
    bindTaskEvents(listItem,finishTask);
    save(label);
}

function bindTaskEvents(listItem, checkBoxEvent) {
    //var checkBox = listItem.querySelector("input[type=checkbox]");
    var delButton = listItem.querySelector("button.delete");
    var label = listItem.querySelector('label');
    delButton.onclick = deleteItem;
   // checkBox.onchange = checkBoxEvent;
   label.onclick = checkBoxEvent;
}
function deleteItem() {
    var listItem = this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);
    save();
}

function save(label){
    var taskArray=[];
    var statusArray=[];
    for (var i = 0; i < tasks.children.length; i++) {
        taskArray.push(tasks.children[i].getElementsByTagName("label")[0].innerText);
        statusArray.push(tasks.children[i].getElementsByTagName("label")[0].className);
    }
    localStorage.removeItem('todo');
    localStorage.setItem("todo", JSON.stringify({tasks: taskArray}));
    localStorage.setItem("lab", JSON.stringify({tasks: statusArray}))
}

function load(){
    return JSON.parse(localStorage.getItem('todo'));
}
var label_data = JSON.parse(localStorage.getItem("lab"));
var data=load();
//console.log(label_data.tasks[1]);
for(var i=0; i<data.tasks.length;i++){
    var listItem = createNewElement(data.tasks[i]);
    tasks.appendChild(listItem);
    var label = listItem.querySelector('label');
    if(label_data.tasks[i]=="check"){
        label.className="check";
    }
    else{
        label.className="uncheck";
    }
    bindTaskEvents(listItem,finishTask);
}
