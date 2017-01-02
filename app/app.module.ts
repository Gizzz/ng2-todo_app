import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
import { TodosComponent }  from './todos/todos.component';
import { TodosItemComponent }  from './todos/todos-item/todos-item.component';
import { TodosFooterComponent }  from './todos/todos-footer/todos-footer.component';
import { TodoDataService } from './todos/todo-data.service';
import { TodoStorageService } from './todos/todo-storage.service';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    AppRoutingModule,
  ], 
  declarations: [ 
    AppComponent, 
    TodosComponent,
    TodosItemComponent,
    TodosFooterComponent,
  ],
  providers: [ TodoDataService, TodoStorageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
