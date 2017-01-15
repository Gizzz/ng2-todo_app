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
var todo_model_1 = require("./../todo.model");
var todo_data_service_1 = require("./../todo-data.service");
var TodosItemComponent = (function () {
    function TodosItemComponent(todoDataService) {
        this.todoDataService = todoDataService;
        this.itemStateChange = new core_1.EventEmitter();
        this.deleteItem = new core_1.EventEmitter();
    }
    TodosItemComponent.prototype.ngOnInit = function () { };
    TodosItemComponent.prototype.toggle_SingleTodo_CompletedState = function (id) {
        this.todoDataService.toggleCompletedById(id);
        this.itemStateChange.emit();
    };
    TodosItemComponent.prototype.startTodoEditing = function (todo) {
        todo.editing = true;
        var inputElement = document.querySelector(".input-" + todo.id);
        setTimeout(function () { inputElement.focus(); });
    };
    TodosItemComponent.prototype.saveEditingChanges = function (todo) {
        todo.editing = false;
        var inputElement = document.querySelector(".input-" + todo.id);
        var newValue = inputElement.value.trim();
        if (newValue) {
            todo.title = newValue;
            inputElement.value = todo.title;
            this.todoDataService.updateTitle(todo);
        }
        else {
            this.todoDataService.deleteById(todo.id);
            this.deleteItem.emit();
        }
    };
    TodosItemComponent.prototype.discardEditingChanges = function (todo) {
        todo.editing = false;
        var inputElement = document.querySelector(".input-" + todo.id);
        inputElement.value = todo.title;
    };
    TodosItemComponent.prototype.deleteTodo = function (id) {
        this.todoDataService.deleteById(id);
        this.deleteItem.emit();
    };
    return TodosItemComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", todo_model_1.Todo)
], TodosItemComponent.prototype, "todo", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TodosItemComponent.prototype, "itemStateChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TodosItemComponent.prototype, "deleteItem", void 0);
TodosItemComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-todos-item',
        templateUrl: 'todos-item.component.html'
    }),
    __metadata("design:paramtypes", [todo_data_service_1.TodoDataService])
], TodosItemComponent);
exports.TodosItemComponent = TodosItemComponent;
//# sourceMappingURL=todos-item.component.js.map