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

	// header

	get toggleAll_controlState(): boolean {
		let isAllTodosCompleted: boolean = 
			this.todos.filter(item => item.completed).length === this.todos.length;

		return isAllTodosCompleted;
	}

	toggleAllTodosCompletedState(value: boolean) {
		this.todoDataService.toggleCompletedForAll(value);
	}

	// main

	deleteTodo(id: number): void {
		this.todoDataService.deleteById(id); 
	}

	createTodo(title: string): void {
		this.todoDataService.create(title); 
	}

	// footer

	get todosLeft_countText(): string {
		let activeTodos = this.todos.filter(t => !t.completed);
		let supportText = activeTodos.length === 1 ? "item" : "items";

		return `${activeTodos.length} ${supportText} left`;
	}

	get completedTodosCount(): number {
		return this.todos.filter(item => item.completed).length;
	}

	deleteCompletedTodos(): void {
		this.todoDataService.deleteCompleted(); 
	}
}