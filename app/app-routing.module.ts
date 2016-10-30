import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosComponent }  from './todos/todos.component';

const routes: Routes = [
	{ path: '',  component: TodosComponent },
	{ path: 'active', component: TodosComponent },
	{ path: 'completed', component: TodosComponent },
	// { path: '**', redirectTo: 'all' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }