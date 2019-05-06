var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todo: [],
        visibility: 'all',
        cacheTodo: [],
        cacheTitle: ''
    },
    methods: {
        addTodo: function () {
            let value = this.newTodo.trim();
            let timestamp = Math.floor(Date.now());
            if (!value) {
                return;
            }
            this.todo.push({
                title: value,
                id: timestamp,
                computed: false,
            })
            this.newTodo = '';
        },
        removeTodo: function (todo) {
            let vm = this;
            let delIndex = vm.todo.findIndex(function (item, key) {
                return todo.id === item.id;
            })
            this.todo.splice(delIndex, 1);
        },
        editTodo: function (item) {
            this.cacheTodo = item;
            this.cacheTitle = item.title;
        },
        cancelEdit: function () {
            this.cacheTodo = {};
        },
        doneTodo: function (item) {
            item.title = this.cacheTitle;
            this.cacheTitle = '';
            this.cacheTodo = {};
        }
    },
    computed: {
        filterTodo: function () {
            let newTodos = [];
            if (this.visibility == 'all') {
                return this.todo;
            } else if (this.visibility == 'active') {
                this.todo.forEach(function (item) {
                    if (!item.computed) {
                        newTodos.push(item);
                    }
                })
                return newTodos;
            } else if (this.visibility == 'completed') {
                this.todo.forEach(function (item) {
                    if (item.computed) {
                        newTodos.push(item);
                    }
                })
                return newTodos;
            }
        }
    }
}) 