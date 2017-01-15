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
var todo_data_service_1 = require("./../todo-data.service");
var TodosFooterComponent = (function () {
    function TodosFooterComponent(todoDataService) {
        this.todoDataService = todoDataService;
        this.destroyCompletedTodos = new core_1.EventEmitter();
    }
    TodosFooterComponent.prototype.ngOnInit = function () { };
    Object.defineProperty(TodosFooterComponent.prototype, "completedTodosCount", {
        get: function () {
            return this.todoDataService.getTodosCount("completed");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TodosFooterComponent.prototype, "todosLeft_countText", {
        get: function () {
            var activeTodosCount = this.todoDataService.getTodosCount("active");
            var supportText = activeTodosCount === 1 ? "item" : "items";
            return activeTodosCount + " " + supportText + " left";
        },
        enumerable: true,
        configurable: true
    });
    TodosFooterComponent.prototype.deleteCompletedTodos = function () {
        this.todoDataService.deleteCompleted();
        this.destroyCompletedTodos.emit();
    };
    return TodosFooterComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TodosFooterComponent.prototype, "destroyCompletedTodos", void 0);
TodosFooterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-todos-footer',
        templateUrl: 'todos-footer.component.html'
    }),
    __metadata("design:paramtypes", [todo_data_service_1.TodoDataService])
], TodosFooterComponent);
exports.TodosFooterComponent = TodosFooterComponent;
//# sourceMappingURL=todos-footer.component.js.map