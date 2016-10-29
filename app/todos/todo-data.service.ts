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

	getTodos(): Todo[] {
		return this.todos;
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

	delete(id: number): void {
		let todoToDelete = this.todos.filter(item => item.id === id)[0];

		if (todoToDelete) {
			let index = this.todos.indexOf(todoToDelete);
			this.todos.splice(index, 1)
		}
	}
}