import {createSelector} from 'reselect';

export const selectModals = state => state.modals;

export const seletAddUserModal = createSelector(
    selectModals,
    state => state.addUser,
);
