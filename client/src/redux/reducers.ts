import Actions from './actions.config'; 

const initialState = {
    currentUser: {}
  }
  
  export default function root(state = initialState, action: any) {
    switch (action.type) {
      case Actions.REGISTER:
          return {...state, currentUser: action.payload};
   
   
        default:
          return state;
      }
    }