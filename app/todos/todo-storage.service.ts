import { Injectable } from '@angular/core';

import { Todo } from './todo.model';

@Injectable()
export class TodoStorageService {
	private readonly storageName = "todos-angular2";

	constructor() { 
		if (!localStorage[this.storageName]) {
			localStorage[this.storageName] = JSON.stringify([]);
		} 
	}

	getTodos(): Todo[] {
		return JSON.parse(localStorage[this.storageName]);
	}

	updateTodos(todos: Todo[]): void {
		localStorage[this.storageName] = JSON.stringify(todos);
	}
}