var todoList = {
  todos: [],
  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      /*the name of the property (even if it is the same name as the parameter) never change. Only the value, which follows in this case is following the parameter*/
      completed: false
    });
  },
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function (position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    /*Here we flip the boolean to his oposite value. if todo.completed is equal false, so changes it to true, and so on. */
  },
  toggleAll: function () {
    // recording the number of todos and completed todos
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    // get the number of completed todos.
    this.todos.forEach(function (todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    this.todos.forEach(function (todo) {
      // Case 1: If everything is true, make everything.
      if (completedTodos === totalTodos) {
        todo.completed = false;
        // Case 2: Otherwise, make everything true.
      } else {
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function () {
    var addTodoTextInput = document.getElementById('add-todo-text-input');
    if (addTodoTextInput.value == '') {
      alert("You don't have anything to add.");
        } else {
          todoList.addTodo(addTodoTextInput.value);
          addTodoTextInput.value = '';
          view.displayTodos();

          var hideToggle = document.getElementById("toggle-all");
          hideToggle.style.display = "block";
    }
  },
  changeTodo: function (position) {
    var changeTodoTextInput = document.getElementsByClassName('edit')[position].value;
    todoList.changeTodo(position, changeTodoTextInput);
    view.displayTodos();
  },
  deleteTodo: function (position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function (position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAllButton: function () {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function () {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    

    todoList.todos.forEach(function (todo, position) {
      var linebreak = document.createElement('br');
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = todo.todoText;
        todoLi.classList.add('item-completed');
      } else {
        todoTextWithCompletion = todo.todoText;
      }

      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoLi.appendChild(this.createToggleButton());
      todoLi.appendChild(this.createEditButton());
      todoLi.appendChild(linebreak);
      todoLi.appendChild(this.createEditInput());
      todoLi.appendChild(this.createSaveButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function () {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = '\u2715';
    deleteButton.className = 'delete-button';
    return deleteButton;
  },
  createToggleButton: function () {
    var toggleButton = document.createElement('button');
    toggleButton.textContent = '\u2713';
    toggleButton.className = 'toggle-button';
    return toggleButton;
  },
  createSaveButton: function () {
    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'save-button';
    return saveButton;
  },
  createEditButton: function () {
    var editButton = document.createElement('button');
    editButton.textContent = '\u270E';
    editButton.className = 'edit-button';
    return editButton;
  },
  createEditInput: function() {
    var editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.placeholder = 'Type Your Changes Here';
    editInput.className = 'edit';
    return editInput;
  },
  
  setUpEventListeners: function () {

    var todosUl = document.querySelector('ul');
    var divsToHide = document.getElementsByClassName("edit");
    var showSave = document.getElementsByClassName("save-button");

    todosUl.addEventListener('click', function (event) {

      // Show & Hid Toggle-All Button.
      var showToggle = document.getElementById("toggle-all");
      // Get the element that was clicked on.
      var elementClicked = event.target;

      // Check if elementClicked is a delete button.
      if (elementClicked.className === 'delete-button') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        
        if (todoList.todos.length < 1) {
          showToggle.style.display = "none";
        };

      }else if (elementClicked.className === 'toggle-button') {
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
      } else if (elementClicked.className === 'save-button') {
        if (divsToHide[parseInt(elementClicked.parentNode.id)].value == "") {
          alert("You haven't done any changes in this item.");
        } else {
          handlers.changeTodo(parseInt(elementClicked.parentNode.id));
        }
      } else if (elementClicked.className === 'edit-button') {
        if (getComputedStyle(divsToHide[parseInt(elementClicked.parentNode.id)], null).display === "none"){
          divsToHide[parseInt(elementClicked.parentNode.id)].style.display = "inline-block";
          showSave[parseInt(elementClicked.parentNode.id)].style.display = "inline-block";
        } else {
          divsToHide[parseInt(elementClicked.parentNode.id)].style.display = "none";
          showSave[parseInt(elementClicked.parentNode.id)].style.display = "none";
        }
      }
    });
    // If the length of the element's string is 0 then display helper message 
   function required(inputtx) 
   {
     if (inputtx.value.length == 0)
      { 
         alert("message");  	
         return false; 
      }  	
      return true; 
    } 
  }
};

view.setUpEventListeners();