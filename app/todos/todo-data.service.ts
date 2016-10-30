import { Injectable } from '@angular/core';

import { Todo } from './todo.model';

@Injectable()
export class TodoDataService {
	private todos: Todo[];
	
	constructor() {
		this.todos = [
			{
				id: 1,
				title: "first",
				completed: true,
			}, {
				id: 2,
				title: "second",
				completed: false,
			}
		];
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

	// todo: use in component

	// getActiveTodosCount(): number {
	// 	let activeTodos = this.todos.filter(t => t.completed === false);
	// 	return activeTodos.length;
	// }

	toggleCompletedForAll(value: boolean): void {
		this.todos.forEach(item => item.completed = value);
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
	}

	deleteById(id: number): void {
		let todoToDelete = this.todos.filter(item => item.id === id)[0];

		if (todoToDelete) {
			let index = this.todos.indexOf(todoToDelete);
			this.todos.splice(index, 1)
		}
	}
	
	deleteCompleted(): void {
		let completedTodos = this.todos.filter(item => item.completed);
		completedTodos.forEach(todo => this.deleteById(todo.id));
	}
}