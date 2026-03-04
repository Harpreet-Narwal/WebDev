let todoIndex = 1;

function addTodo(){

    let element = document.getElementById("todoInput")
    const todo = element.value;
    if(todo === ""){
        return;
    }
    element.value = "";

    const todoDiv = document.createElement("div");
    todoDiv.setAttribute("id", "todo" + todoIndex)

    const todoSpan = document.createElement("span");

    todoSpan.innerHTML = todo;

    todoDiv.appendChild(todoSpan);

    const todoButton = document.createElement("button");
    todoButton.innerHTML = "Delete Todo";
    todoButton.setAttribute("onclick", "deleteTodo(" + todoIndex + ")");


    todoDiv.appendChild(todoButton);

    document.getElementById("todos").appendChild(todoDiv);

    todoIndex++;

}

function deleteTodo(index){
    // alert("delete todo called with " + index);
    const divElement = document.getElementById("todo" + index);
    // divElement.parentElement.removeChild(divElement);
    // Alternatively
    document.getElementById("todos").removeChild(divElement);
}