import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';

import * as fromTodo from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styles: []
})
export class TodoAddComponent implements OnInit {
  txtaInput: FormControl;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.txtaInput = new FormControl('', Validators.required );
  }

  agregarTodo() {
    if (this.txtaInput.invalid) {
      return;
    }

    const accion = new fromTodo.AgregarTodoAction(this.txtaInput.value );
    this.store.dispatch(accion);
    this.txtaInput.setValue('');
  }

}
