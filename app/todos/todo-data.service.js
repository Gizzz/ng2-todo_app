"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var todo_storage_service_1 = require("./todo-storage.service");
var TodoDataService = (function () {
    function TodoDataService(todoStorageService) {
        this.todoStorageService = todoStorageService;
        this.todos = todoStorageService.getTodos();
    }
    TodoDataService.prototype.getTodos = function (filter) {
        if (!filter) {
            return this.todos;
        }
        else if (filter === "active") {
            return this.todos.filter(function (t) { return t.completed === false; });
        }
        else if (filter === "completed") {
            return this.todos.filter(function (t) { return t.completed === true; });
        }
        else {
            throw new Error("unexpected argument value");
        }
    };
    TodoDataService.prototype.getTodosCount = function (filter) {
        if (filter === void 0) { filter = ""; }
        if (!filter)
            return this.todos.length;
        var filteredTodos;
        if (filter === "active") {
            filteredTodos = this.todos.filter(function (t) { return t.completed === false; });
        }
        else if (filter === "completed") {
            filteredTodos = this.todos.filter(function (t) { return t.completed === true; });
        }
        else {
            throw new Error("unexpected filter value");
        }
        return filteredTodos.length;
    };
    TodoDataService.prototype.toggleCompletedById = function (id) {
        var todo = this.todos.filter(function (t) { return t.id === id; })[0];
        todo.completed = !todo.completed;
        this.todoStorageService.updateTodos(this.todos);
    };
    TodoDataService.prototype.toggleCompletedForAll = function (value) {
        this.todos.forEach(function (item) { return item.completed = value; });
        this.todoStorageService.updateTodos(this.todos);
    };
    TodoDataService.prototype.create = function (title) {
        title = title.trim();
        if (!title)
            return;
        var maxId = 0;
        for (var i = 0; i < this.todos.length; i++) {
            if (this.todos[i].id > maxId) {
                maxId = this.todos[i].id;
            }
        }
        var newId = maxId + 1;
        var todoToCreate = {
            id: newId,
            title: title,
            completed: false,
            editing: false,
        };
        this.todos.push(todoToCreate);
        this.todoStorageService.updateTodos(this.todos);
    };
    TodoDataService.prototype.updateTitle = function (todo) {
        var todoToUpdate = this.todos.filter(function (t) { return t.id === todo.id; })[0];
        if (!todoToUpdate)
            return;
        todoToUpdate.title = todo.title;
        this.todoStorageService.updateTodos(this.todos);
    };
    TodoDataService.prototype.deleteById = function (id) {
        var todoToDelete = this.todos.filter(function (item) { return item.id === id; })[0];
        if (todoToDelete) {
            var index = this.todos.indexOf(todoToDelete);
            this.todos.splice(index, 1);
        }
        this.todoStorageService.updateTodos(this.todos);
    };
    TodoDataService.prototype.deleteCompleted = function () {
        var _this = this;
        var completedTodos = this.todos.filter(function (item) { return item.completed; });
        completedTodos.forEach(function (todo) { return _this.deleteById(todo.id); });
        this.todoStorageService.updateTodos(this.todos);
    };
    return TodoDataService;
}());
TodoDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [todo_storage_service_1.TodoStorageService])
], TodoDataService);
exports.TodoDataService = TodoDataService;
//# sourceMappingURL=todo-data.service.js.map