document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById("my-form");
  var handleForm = function (event) {
    event.preventDefault();
    addTodo();
  };
  form.addEventListener('submit', handleForm);

  var TodoItem = function ({
    todo,
    elementId,
    status = 'open'
  }) {
    this.todo = todo;
    this.elementId = elementId;
    this.status = status;
  };

  TodoItem.prototype.getTodo = function () {
    return this.todo;
  };

  TodoItem.prototype.deleteTodo = function () {
    var index = todoList.indexOf(this);

    if (index !== -1) {
      todoList.splice(index, 1);
      var currentElement = document.getElementById(this.elementId);
      currentElement.remove();
    }

    localStorage.setItem('todoList', JSON.stringify(todoList));
  };

  TodoItem.prototype.markAsCompleted = function () {
    this.status = 'closed';
  };

  TodoItem.prototype.getTodoElement = function () {
    var _this = this;

    var todoElementWrapper = document.createElement('div');
    todoElementWrapper.className = 'todo-item-wrapper';
    todoElementWrapper.id = _this.elementId;

    var todoElement = document.createElement('div');
    todoElement.className = 'todo-item';
    todoElement.innerText = _this.getTodo();

    var deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'todo-delete';
    deleteBtn.addEventListener('click', function () {
      _this.deleteTodo();
    }, false);

    todoElementWrapper.appendChild(deleteBtn);
    todoElementWrapper.appendChild(todoElement);
    return todoElementWrapper;
  }

  // list related actions

  var todoList = [];
  var previousTodos = JSON.parse(localStorage.getItem('todoList')) || [];
  previousTodos.forEach(function (prevTodo) {
    addTodo(prevTodo);
  });

  function addTodo(inputItem) {
    if (!inputItem) {
      var inputText = document.getElementById('input-field');

      if (inputText.value.trim()) {
        inputItem = {
          todo: inputText.value,
          elementId: (new Date()).getTime(),
          status: 'open'
        }
      }
      inputText.value = '';
    }

    if (inputItem) {
      var todoObj = new TodoItem(inputItem);
      todoList.push(todoObj);

      var listContainer = document.getElementById('todo-list');
      var todoElement = todoObj.getTodoElement();
      listContainer.appendChild(todoElement);
    }
    localStorage.setItem('todoList', JSON.stringify(todoList));
  };
});