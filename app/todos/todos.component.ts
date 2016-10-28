import { Component } from '@angular/core';

import { Todo } from './todo.model';

@Component({
	moduleId: module.id,
	selector: 'my-todos',
	templateUrl: 'todos.component.html'
})
export class TodosComponent {
	todos: Todo[] = [
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

	deleteTodo(id: number): void {
		let todoToDelete = this.todos.filter(item => item.id === id)[0];

		if (todoToDelete) {
			let index = this.todos.indexOf(todoToDelete);
			this.todos.splice(index, 1)
		}
	}

	createTodo(title: string): void {
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
}