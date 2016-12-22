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

	get overallTodosCount(): number {
		return this.todoDataService.getTodosCount();
	}

	deleteTodo(id: number): void {
		this.todoDataService.deleteById(id); 
		this.todos = this.todoDataService.getTodos(this.filter);
	}

	createTodo(title: string): void {
		this.todoDataService.create(title); 
		this.todos = this.todoDataService.getTodos(this.filter);
	}

	toggle_SingleTodo_CompletedState(id: number): void {
		this.todoDataService.toggleCompletedById(id);
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


	refreshTodos(): void {
		this.todos = this.todoDataService.getTodos(this.filter);
	}
}