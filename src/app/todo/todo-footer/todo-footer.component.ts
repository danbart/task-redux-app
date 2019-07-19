import { Component, OnInit } from '@angular/core';

import * as fromFiltro from '../../filter/filter.action';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';
import { BorrarAllTodoAction } from '../todo.actions';


@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtroValidos: fromFiltro.filtroValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtroValidos;

  pendientes: number;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.contarPendientes(state.todos);
      this.filtroActual = state.filtro;
    });
  }

  cambiarFiltro( nuevoFiltro: fromFiltro.filtroValidos ) {

  const accion = new fromFiltro.SetFiltroAction(nuevoFiltro);
  this.store.dispatch( accion );

  }

  contarPendientes( todos: Todo[] ) {
    this.pendientes = todos.filter(todo => !todo.completado ).length;
  }

  borrarCompletado() {
    const accion = new BorrarAllTodoAction();
    this.store.dispatch( accion );
  }

}
