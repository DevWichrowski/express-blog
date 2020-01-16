import produce from 'immer';
import * as AuthActions from "../actions/auth.actions";


const initialState = {
    pending: false,
};

export const authReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case AuthActions.LOGIN_PENDING: {
                draft.pending = true;
                break;
            }
            case AuthActions.LOGIN_SUCCESS: {
                draft.pending = false;
                localStorage.setItem("token", action.payload.token)
                break;
            }
            case AuthActions.LOGIN_FAILURE: {
                draft.pending = false;
                break;
            }
            case AuthActions.LOGOUT_ALL_PENDING: {
                draft.pending = true;
                break;
            }
            case AuthActions.LOGOUT_ALL_SUCCESS: {
                draft.pending = false;
                localStorage.removeItem("token");
                break;
            }
            case AuthActions.LOGOUT_ALl_FAILURE: {
                draft.pending = false;
                break;
            }
            default:
                return state;
        }
    });