import {createSelector} from 'reselect';

export const selectUsers = state => state.users;

export const getUsersSelector = createSelector(
    selectUsers,
    state => state.users
);

export const getUserSelector = createSelector(
    selectUsers,
    state => state.user
);