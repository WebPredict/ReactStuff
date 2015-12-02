import {L_SELECTION_CHANGED, R_SELECTION_CHANGED, L_SEARCH_CHANGED, R_SEARCH_CHANGED, ASSIGN, UNASSIGN} from '../constants/ActionTypes';

export function leftSelectionChanged(obj) {
  return {
    type: L_SELECTION_CHANGED,
    selected: obj
  }
}

export function rightSelectionChanged(obj) {
  return {
    type: R_SELECTION_CHANGED,
    selected: obj
  }
}

export function leftSearchChanged(text) {
  return {
    type: L_SEARCH_CHANGED,
    text
  }
}

export function rightSearchChanged(text) {
  return {
    type: R_SEARCH_CHANGED,
    text
  }
}

export function assign(available, picked) {
  return {
    type: ASSIGN,
    available: available,
    picked: picked
  }
}

export function unassign(available, picked) {
  return {
    type: UNASSIGN,
    available: available,
    picked: picked
  }
}

