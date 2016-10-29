import { Component } from '@angular/core';

import { Todo } from './todo.model';
import { TodoDataService } from './todo-data.service';

@Component({
	moduleId: module.id,
	selector: 'my-todos',
	templateUrl: 'todos.component.html',
	providers: [TodoDataService],
})
export class TodosComponent {
	todos: Todo[];

	constructor(private todoDataService: TodoDataService) {
		this.todos = todoDataService.getTodos();
	}

	deleteTodo(id: number): void {
		this.todoDataService.delete(id); 
	}

	createTodo(title: string): void {
		this.todoDataService.create(title); 
	}
}