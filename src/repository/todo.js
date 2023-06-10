import api from "../services/api.js";

const TodoRepository = {
    async create (description) {
        return api('/todo', {
            method: 'POST',
            body: JSON.stringify(description)
        });
    },

    async update (id, status) {
        return api('/todo/' + id, {
            method: 'PUT',
            body: JSON.stringify(status),
        });
    },

    async delete (id) {
        return api('/todo/' + id, {
            method: 'DELETE',
        });
    },

    async get(id) {
        return api('/todo/' + id);
    },

    async getAll() {
        return api('/todo');
    },
}

export default TodoRepository
