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
	private filter: string; 

	constructor(
		private todoDataService: TodoDataService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		this.filter = "";

		if (this.route.snapshot.url.length) {
			this.filter = this.route.snapshot.url[0].path;
		}

		this.todos = this.todoDataService.getTodos(this.filter);
	}

	// header

	get toggleAll_controlState(): boolean {
		let isAllTodosCompleted: boolean = 
			this.todoDataService.getTodosCount("completed") === this.todoDataService.getTodosCount();

		return isAllTodosCompleted;
	}

	toggleAllTodosCompletedState(value: boolean) {
		this.todoDataService.toggleCompletedForAll(value);
		this.todos = this.todoDataService.getTodos(this.filter);
	}

	// main

	deleteTodo(id: number): void {
		this.todoDataService.deleteById(id); 
		this.todos = this.todoDataService.getTodos(this.filter);
	}

	createTodo(title: string): void {
		this.todoDataService.create(title); 
		this.todos = this.todoDataService.getTodos(this.filter);
	}

	onTodoStateToggle(): void {
		this.todos = this.todoDataService.getTodos(this.filter);
	}

	startTodoEditing(todo: any): void {
		todo.editing = true;

		let inputElement: HTMLInputElement = <HTMLInputElement>document.querySelector(`.input-${ todo.id }`);
		setTimeout(() => { inputElement.focus(); })
	}

	saveEditingChanges(todo: any): void {
		todo.editing = false;

		let inputElement: HTMLInputElement = <HTMLInputElement>document.querySelector(`.input-${ todo.id }`);
		let newValue: string = inputElement.value.trim()

		if (newValue) {
			todo.title = newValue;
			inputElement.value = todo.title;
		} else {
			this.todoDataService.deleteById(todo.id);
		}
	}

	discardEditingChanges(todo: any): void {
		todo.editing = false;

		let inputElement: HTMLInputElement = <HTMLInputElement>document.querySelector(`.input-${ todo.id }`);
		inputElement.value = todo.title;
	}

	// footer

	get todosLeft_countText(): string {
		let activeTodosCount = this.todoDataService.getTodosCount("active");
		let supportText = activeTodosCount === 1 ? "item" : "items";
		return `${activeTodosCount} ${supportText} left`;
	}

	get completedTodosCount(): number {
		return this.todoDataService.getTodosCount("completed");
	}

	get overallTodosCount(): number {
		return this.todoDataService.getTodosCount();
	}

	deleteCompletedTodos(): void {
		this.todoDataService.deleteCompleted(); 
		this.todos = this.todoDataService.getTodos(this.filter);
	}
}