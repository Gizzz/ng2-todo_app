import { Component } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'my-app',
	templateUrl: 'app.component.html'
})
export class AppComponent { 
	todos = [
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

	deleteTodo(id: number) {
		let todoToDelete = this.todos.filter(item => item.id === id)[0];

		if (todoToDelete) {
			let index = this.todos.indexOf(todoToDelete);
			this.todos.splice(index, 1)
		}
	}

	createTodo(title: string) {
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