import produce from "immer";
import * as ModalsActions from "../actions/modals.actions";

const initialState = {
    addUser: false,
};

export const modalsReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case ModalsActions.SHOW_ADD_USER_MODAL: {
                draft.addUser = true;
                break;
            }
            case ModalsActions.CLOSE_ADD_USER_MODAL: {
                draft.addUser = false;
                break;
            }
            default:
                return state;
        }
    });