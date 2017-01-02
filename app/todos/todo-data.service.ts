import { Injectable } from '@angular/core';

import { Todo } from './todo.model';
import { TodoStorageService } from './todo-storage.service';

@Injectable()
export class TodoDataService {
	// this.todos is ugly hack; otherwise, if reference to object changed, all related inputs miss the 1st click
	private todos: Todo[];
	
	constructor(private todoStorageService: TodoStorageService) {
		this.todos = todoStorageService.getTodos();
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

	toggleCompletedById(id: number): void {
		let todo = this.todos.filter(t => t.id === id)[0];
		todo.completed = !todo.completed;

		this.todoStorageService.updateTodos(this.todos);
	}

	toggleCompletedForAll(value: boolean): void {
		this.todos.forEach(item => item.completed = value);
		
		this.todoStorageService.updateTodos(this.todos);
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
			editing: false,
		};

		this.todos.push(todoToCreate);
		this.todoStorageService.updateTodos(this.todos);
	}

	updateTitle(todo: Todo): void {
		let todoToUpdate = this.todos.filter(t => t.id === todo.id)[0];
		if (!todoToUpdate) return;

		todoToUpdate.title = todo.title;
		this.todoStorageService.updateTodos(this.todos);
	}

	deleteById(id: number): void {
		let todoToDelete = this.todos.filter(item => item.id === id)[0];

		if (todoToDelete) {
			let index = this.todos.indexOf(todoToDelete);
			this.todos.splice(index, 1)
		}

		this.todoStorageService.updateTodos(this.todos);
	}
	
	deleteCompleted(): void {
		let completedTodos = this.todos.filter(item => item.completed);
		completedTodos.forEach(todo => this.deleteById(todo.id));

		this.todoStorageService.updateTodos(this.todos);
	}
}