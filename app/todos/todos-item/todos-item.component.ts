import { Component, EventEmitter, Input, Output, OnInit  } from '@angular/core';

import { Todo } from './../todo.model';
import { TodoDataService } from './../todo-data.service';

@Component({
	moduleId: module.id,
	selector: 'my-todos-item',
	templateUrl: 'todos-item.component.html'
})
export class TodosItemComponent implements OnInit {
	@Input() todo: Todo;
	@Output() itemStateChange = new EventEmitter(); 
	@Output() deleteItem = new EventEmitter(); 

	constructor(private todoDataService: TodoDataService) { }
	ngOnInit() { }

	toggle_SingleTodo_CompletedState(id: number): void {
		this.todoDataService.toggleCompletedById(id);
		this.itemStateChange.emit();
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
			this.deleteItem.emit();
		}
	}

	discardEditingChanges(todo: any): void {
		todo.editing = false;

		let inputElement: HTMLInputElement = <HTMLInputElement>document.querySelector(`.input-${ todo.id }`);
		inputElement.value = todo.title;
	}

	deleteTodo(id: number): void {
		this.todoDataService.deleteById(id); 
		this.deleteItem.emit();
	}
}