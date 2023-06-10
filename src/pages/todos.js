import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";
import Form from "../components/form.js";
import Todo from "../services/todo.js";
import TodoList from "../components/list.js";

const init = async () => {
    const { ok: isLogged } = await Auth.me()

    if (!isLogged) {
        return location.login()
    } else {
        loading.stop()
    }

    const todoListEl = document.getElementById('todo-list');
    const todoList = new TodoList(todoListEl);
    await todoList.init()

    const formEl = document.getElementById('todo-add-form');
    new Form(formEl, {
        description: (value) => {
            if (value.length < 1) {
                return 'Описание не должно быть пустым';
            }

            return false;
        },
    }, (values) => {
        Todo.create(values['description']).then((res) => {
            if(res) {
                todoList.todos.push(res.data);
                todoList.render();
            }
        });
    })
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}
