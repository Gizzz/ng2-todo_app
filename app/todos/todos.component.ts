import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Todo } from './todo.model';
import { TodoDataService } from './todo-data.service';

@Component({
	moduleId: module.id,
	selector: 'my-todos',
	templateUrl: 'todos.component.html',	
})
export class TodosComponent implements OnInit {
	todos: Todo[];

	constructor(
		private todoDataService: TodoDataService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		let filter: string = "";

		if (this.route.snapshot.url.length) {
			filter = this.route.snapshot.url[0].path;
		}

		this.todos = this.todoDataService.getTodos(filter);
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
		let activeTodosCount = this.todoDataService.getActiveTodosCount();
		let supportText = activeTodosCount === 1 ? "item" : "items";
		return `${activeTodosCount} ${supportText} left`;
	}

	get completedTodosCount(): number {
		return this.todoDataService.getCompletedTodosCount();
	}

	deleteCompletedTodos(): void {
		this.todoDataService.deleteCompleted(); 
	}
}