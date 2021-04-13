export const initialState = {
    mode: 'CREATE_MODE',
    notes: [],
    filteredNotes: [],
    isLoaded: false,
    isPopupOpened: false,
    isEditPopupOpened: false,
    isFilterPopupOpened: false,
    tagToAdd: {
        noteIndex: null,
        noteId: null
    },
    noteToEdit: {
        noteId: null,
        noteIndex: null,
        noteText: ''
    }
};
