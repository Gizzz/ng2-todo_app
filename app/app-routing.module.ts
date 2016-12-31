import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosComponent }  from './todos/todos.component';

const routes: Routes = [
	{ path: '',  component: TodosComponent },
	{ path: 'active', component: TodosComponent },
	{ path: 'completed', component: TodosComponent },
	// minor bug: when redirecting to root - "All" filter link doesn't get highlighted
	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }