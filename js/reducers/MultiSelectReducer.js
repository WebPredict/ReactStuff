import * as ActionTypes from '../constants/ActionTypes';

let defaultState = {
  otherOptions: [
   {
        label: 'test',
        value: 'value',
        checked: false
    },
    {  
        label: 'test1',
        value: 'value1',
        checked: false
    }
  ],
  pickedOptions: [],
  leftSearch: '',
  rightSearch: '',
  availableOptionsSelected: [],
  pickedOptionsSelected: [] 
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.L_SEARCH_CHANGED:
      return {...state, leftSearch: action.text};

    case ActionTypes.R_SEARCH_CHANGED:
      return {...state, rightSearch: action.text};

    case ActionTypes.L_SELECTION_CHANGED:
      return {...state, availableOptionsSelected: action.selected};

    case ActionTypes.R_SELECTION_CHANGED:
      return {...state, pickedOptionsSelected: action.selected};

    case ActionTypes.ASSIGN:
      return {...state, availableOptions: action.available, pickedOptions: action.picked};

    case ActionTypes.UNASSIGN:
      return {...state, availableOptions: action.available, pickedOptions: action.picked};

    default:
      return state;
  }
}
