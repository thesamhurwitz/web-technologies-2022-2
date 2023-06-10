import Todo from "../services/todo.js";

class TodoList {
  el = null;
  todos = [];

  constructor(el) {
    this.el = el;
  }

  async init() {
    this.todos = await Todo.getAll().then(res => res.data);
    
    this.render()
  }

  render() {
    this.el.innerHTML = '<h2>Список задач:</h2>';

    this.todos.forEach(todo => {
      const todoEl = document.createElement('div');
      todoEl.className = 'todo-item';
      todoEl.innerHTML = `
        <div class="text-field">
          <input
            type="text"
            class="text-field__input"
            name="description"
            disabled
          >
          <input class="todo-status-checkbox" type="checkbox">
        </div>
        <button class="button todo-delete-btn">Удалить</button>`;

      todoEl.querySelector('input[name="description"]').value = todo.description;

      todoEl.querySelector('.todo-delete-btn').addEventListener('click', async () => {
        console.log(todo)
        await Todo.delete(todo.id);
        this.todos = this.todos.filter(item => item.description !== todo.description);
        todoEl.remove();
      })

      const checkbox = todoEl.querySelector('.todo-status-checkbox');
      checkbox.checked = todo.completed;
      checkbox.addEventListener('click', async (e) => {
        e.preventDefault()
        if (await Todo.updateStatus(todo.id, e.target.checked)) {
          e.target.checked = !e.target.checked;
        }
      })

      this.el.append(todoEl);
    })
  }
}

export default TodoList
