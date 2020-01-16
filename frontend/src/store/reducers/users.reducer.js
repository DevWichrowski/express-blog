import produce from 'immer';
import * as UsersActions from "../actions/users.actions";


const initialState = {
    pending: false,
    user: null,
    users: [],
};

export const usersReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case UsersActions.GET_MY_PROFILE_PENDING: {
                draft.pending = true;
                break;
            }
            case UsersActions.GET_MY_PROFILE_SUCCESS: {
                draft.pending = false;
                draft.user = action.payload;
                break;
            }
            case UsersActions.GET_MY_PROFILE_FAILURE: {
                draft.pending = false;
                break;
            }
            case UsersActions.GET_USERS_PENDING: {
                draft.pending = true;
                break;
            }
            case UsersActions.GET_USERS_SUCCESS: {
                draft.users = [...action.payload];
                draft.pending = true;
                break;
            }
            case UsersActions.GET_USERS_FAILURE: {
                draft.pending = false;
                break;
            }
            case UsersActions.CLEAR_USER: {
                draft.user = null;
                break;
            }
            default:
                return state;
        }
    });