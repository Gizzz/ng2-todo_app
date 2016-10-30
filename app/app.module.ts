import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';

import { AppComponent }  from './app.component';
import { TodosComponent }  from './todos/todos.component';
import { TodoDataService } from './todos/todo-data.service';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    RouterModule.forRoot([
      { path: '',  component: TodosComponent },
      { path: 'active', component: TodosComponent },
      { path: 'completed', component: TodosComponent },
      // { path: '**', redirectTo: 'all' },
    ]),
  ], 
  declarations: [ 
    AppComponent, 
    TodosComponent 
  ],
  providers: [TodoDataService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
