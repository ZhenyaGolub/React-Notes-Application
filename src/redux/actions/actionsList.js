import { ADD_NOTE, ADD_TAG, CHANGE_MODE, DELETE_NOTE, DELETE_TAG, EDIT_NOTE_TEXT, FETCH_NOTES, FILTER_NOTES, TOGGLE_EDIT_POPUP, TOGGLE_POPUP } from '../types';

export const fetchAllNotes = (notes) => ({
    type: FETCH_NOTES,
    payload: notes
});

export const changeMode = (mode) => ({
    type: CHANGE_MODE,
    payload: mode
});

export const addNote = (note) => ({
    type: ADD_NOTE,
    payload: note
});

export const editTextOfNote = (note) => ({
    type: EDIT_NOTE_TEXT,
    payload: note
});

export const deleteNote = (id) => ({
    type: DELETE_NOTE,
    payload: id
});

export const deleteTag = (id, noteId) => ({
    type: DELETE_TAG,
    payload: {id, noteId}
});

export const togglePopup = (noteIndex, idOfNote, lastTagId) => ({
    type: TOGGLE_POPUP,
    payload: {noteIndex, idOfNote, lastTagId}
});

export const toggleEditPopup = (data) => ({
    type: TOGGLE_EDIT_POPUP,
    payload: data
});

export const addTag = (tagToAdd, tagText, uniqueTagID) => ({
    type: ADD_TAG,
    payload: {
        ...tagToAdd,
        tagText,
        uniqueTagID
    }
});

export const filterNotes = (string) => ({
    type: FILTER_NOTES,
    payload: string
});