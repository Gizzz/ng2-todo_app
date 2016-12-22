import { Injectable } from '@angular/core';

import { Todo } from './todo.model';

@Injectable()
export class TodoDataService {
	private todos: Todo[];
	
	constructor() {
		this.initializeItemsFromStorage();
	}

	getTodos(filter?: string): Todo[] {
		if (!filter) {
			return this.todos;
		} else if (filter === "active") {
			return this.todos.filter(t => t.completed === false);
		} else if (filter === "completed") {
			return this.todos.filter(t => t.completed === true);
		} else {
			throw new Error("unexpected argument value");
		}
	}

	getTodosCount(filter: string = "") {
		if (!filter) return this.todos.length;

		let filteredTodos: Todo[];

		if (filter === "active") {
			filteredTodos = this.todos.filter(t => t.completed === false);
		} else if (filter === "completed") {
			filteredTodos = this.todos.filter(t => t.completed === true);
		} else {
			throw new Error("unexpected filter value");
		}

		return filteredTodos.length;
	}

	toggleCompletedForAll(value: boolean): void {
		this.todos.forEach(item => item.completed = value);
		
		this.updateStorageItems(this.todos);
	}

	create(title: string): void {
		title = title.trim();
		if (!title) return;

		let maxId = 0;

		for (let i = 0; i < this.todos.length; i++) {
			if (this.todos[i].id > maxId) {
				maxId = this.todos[i].id;
			}
		}

		let newId = maxId + 1;

		let todoToCreate = {
			id: newId,
			title,
			completed: false,
		};

		this.todos.push(todoToCreate);
		this.updateStorageItems(this.todos);
	}

	deleteById(id: number): void {
		let todoToDelete = this.todos.filter(item => item.id === id)[0];

		if (todoToDelete) {
			let index = this.todos.indexOf(todoToDelete);
			this.todos.splice(index, 1)
		}

		this.updateStorageItems(this.todos);
	}
	
	deleteCompleted(): void {
		let completedTodos = this.todos.filter(item => item.completed);
		completedTodos.forEach(todo => this.deleteById(todo.id));

		this.updateStorageItems(this.todos);
	}

	// storage functions

	private initializeItemsFromStorage(): void {
		const storageName = "todos-angular2";

		if (!localStorage[storageName]) {
			localStorage[storageName] = JSON.stringify([]);
		} 

		this.todos = JSON.parse(localStorage[storageName]);
	}

	private updateStorageItems(items: Todo[]): void {
		localStorage["todos-angular2"] = JSON.stringify(items);
	}
}