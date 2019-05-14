import { NEW_EMPLOYEE_ENTRY, EMPLOYEE_LIST, UPDATE_EMPLOYEE_ENTRY, DELETE_EMPLOYEE_ENTRY, EMPLOYEE_LIST_BY_ID } from '../actions/index';

/* 
  The reducer is a pure function that takes the previous state and an action, 
  and returns the next state. 
*/
export default function( state = [], action ) {
    switch(action.type){
      case NEW_EMPLOYEE_ENTRY:
        return { ...state, employee: action.payload };
      case EMPLOYEE_LIST:
        return { ...state, employee: action.payload };
      case EMPLOYEE_LIST_BY_ID:
        return { ...state, employee: action.payload };
      case UPDATE_EMPLOYEE_ENTRY:
        return { ...state, employee: action.payload };
      case DELETE_EMPLOYEE_ENTRY:
        return { ...state, employee: action.payload };
      default:
        return state;
    }
}