import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
import { TodosComponent }  from './todos/todos.component';
import { TodosFooterComponent }  from './todos/todos-footer/todos-footer.component';
import { TodoDataService } from './todos/todo-data.service';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    AppRoutingModule,
  ], 
  declarations: [ 
    AppComponent, 
    TodosComponent,
    TodosFooterComponent,
  ],
  providers: [TodoDataService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
