import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar al Mundo');
const todo3 = new Todo('Pedir prestado el traje de Ironman');
todo2.completado = true;

const estadoInicial: Todo[] = [todo1, todo2, todo3];

export function todoReducer( state = estadoInicial, action: fromTodo.Acciones): Todo[] {


    switch ( action.type ) {
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo( action.texto );
            return [ ...state, todo ];

        case fromTodo.TOGGLE_ALL_TODO:
            return state.map( todEdit => {
                return {
                    ...todEdit,
                    completado: action.completado
                };
            });

        case fromTodo.TOGGLE_TODO:
            // el map envia un nuevo arreglo
            return state.map( todoEdit => {
                // buscamos por id el todo para cambiarle el completado
                if ( todoEdit.id === action.id ) {
                    // retornamos el todo con el cambio del estado
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    // si no encontro envia el todo como estaba
                    return todoEdit;
                }
            });

            case fromTodo.EDITAR_TODO:
                    // el map envia un nuevo arreglo
                    return state.map( todoEdit => {
                        // buscamos por id el todo para cambiarle el completado
                        if ( todoEdit.id === action.id ) {
                            // retornamos el todo con el cambio del estado
                            return {
                                ...todoEdit,
                                texto: action.texto
                            };
                        } else {
                            // si no encontro envia el todo como estaba
                            return todoEdit;
                        }
                    });

            case fromTodo.BORRAR_TODO:
            return state.filter( todoEdit => todoEdit.id !== action.id );

            case fromTodo.BORRAR_ALL_TODO:
                    return state.filter( todEdit => {
                        if ( !todEdit.completado ) {
                            return todEdit;
                        }
                    });

        default:
            return state;
    }
}
