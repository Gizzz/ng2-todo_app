import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { TodoDataService } from './../todo-data.service';

@Component({
	moduleId: module.id,
	selector: 'my-todos-footer',
	templateUrl: 'todos-footer.component.html'
})
export class TodosFooterComponent implements OnInit {
	@Output() destroyCompletedTodos = new EventEmitter();

	constructor(private todoDataService: TodoDataService) { }
	ngOnInit() { }

	get completedTodosCount(): number {
		return this.todoDataService.getTodosCount("completed");
	}

	get todosLeft_countText(): string {
		let activeTodosCount = this.todoDataService.getTodosCount("active");
		let supportText = activeTodosCount === 1 ? "item" : "items";
		return `${activeTodosCount} ${supportText} left`;
	}

	deleteCompletedTodos(): void {
		this.todoDataService.deleteCompleted(); 
		this.destroyCompletedTodos.emit();
	}
}