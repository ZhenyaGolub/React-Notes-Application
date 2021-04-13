import { initialState } from "../initialState/initialState";
import { ADD_NOTE, FETCH_NOTES, DELETE_NOTE, DELETE_TAG, TOGGLE_POPUP, ADD_TAG, TOGGLE_EDIT_POPUP, EDIT_NOTE_TEXT, CHANGE_MODE, FILTER_NOTES } from "../types";

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NOTES:
                const notesList = Object.keys(action.payload).map(item => {
                    const noteId = item;
                    return {
                        id: noteId,
                        text: action.payload[item].text,
                        date: action.payload[item].date,
                        tags: action.payload[item].tags ? Object.entries(action.payload[item].tags).map(tag => {
                            return {
                                uniqueTagID: tag[0],
                                title: tag[1].title,
                                tagId: tag[1].tagId,
                                id: noteId
                            }
                        }) : []
                    }
                });
                return {...state, notes:[...state.notes, ...notesList], filteredNotes: [...notesList], isLoaded: true}
        case CHANGE_MODE:
            return {...state, mode: action.payload === 'CREATE_MODE' ? 'CREATE_MODE' : 'FILTER_MODE'}
        case ADD_NOTE:
            const newNote = action.payload;
            return {...state, notes:[...state.notes, newNote], filteredNotes: [...state.filteredNotes, newNote]}
        case DELETE_NOTE:
            const id = action.payload;
            return {...state, notes:[...state.notes.filter(item => item.id !== id)], filteredNotes:[...state.filteredNotes.filter(item => item.id !== id)]}
        case EDIT_NOTE_TEXT:
            const modifiedNotes = state.notes.map((note, index) => {
                if(note.id === action.payload.noteId && index === action.payload.noteIndex){
                    return {
                        ...note,
                        text: action.payload.modifiedText
                    }
                } else {
                        return note;
                }
            });
            return {...state, notes: [...modifiedNotes], filteredNotes: [...modifiedNotes]}
        case DELETE_TAG:
            const { id: tagId, noteId: noteId } = action.payload;
            const newNotes = state.notes.map((item) => {
                if(item.id === noteId){
                    return {
                        ...item,
                        tags:item.tags.filter((tag) => {
                            if(tag !== null && tag !== undefined){
                                return tag.tagId !== tagId;
                            }
                        })
                    }
                } else{
                    return item;
                }
            });
            return {...state, notes:[...newNotes], filteredNotes: [...newNotes]}
        case TOGGLE_POPUP:
            const { noteIndex, idOfNote, lastTagId } = action.payload;
            return {...state, isPopupOpened: !state.isPopupOpened, tagToAdd: { noteIndex, idOfNote, lastTagId }}
        case TOGGLE_EDIT_POPUP:
            const {noteId: nId, noteIndex: nIndex, noteText} = action.payload;
            return {...state, 
                isEditPopupOpened: !state.isEditPopupOpened, 
                noteToEdit: {
                    noteId: nId,
                    noteIndex: nIndex,
                    noteText: noteText
                }
            }
        case ADD_TAG:
            const { idOfNote: IDOfNote, noteIndex: indexOfNote, tagText, uniqueTagID} = action.payload;
            const lastTagIndex = state.notes[indexOfNote].tags.length !== 0 ? state.notes[indexOfNote].tags[state.notes[indexOfNote].tags.length - 1].tagId : -1;
            const newTag = {
                title: tagText,
                tagId: lastTagIndex + 1,
                id: IDOfNote,
                uniqueTagID
            }
            const notesWithNewTag = state.notes.map((note, index) => {
                if(indexOfNote === index && note.id === IDOfNote){
                    return {
                        ...note,
                        tags: [...note.tags, newTag]
                    } 
                } else {
                    return note;
                }
            })
            return {...state, notes: notesWithNewTag, filteredNotes: notesWithNewTag}
        case FILTER_NOTES:
            const string = action.payload;
            const filteredNotes = state.notes.filter(note => {
                let filteredTags;

                if(note.tags.length === 0){
                    return [false] ;
                }
                filteredTags = note.tags.map(tag => {
                    return tag.title.toLowerCase().includes(string.toLowerCase()) || tag.title.toUpperCase().includes(string.toUpperCase());
                });
                return filteredTags.includes(true);
            });
            return {...state, filteredNotes: [...filteredNotes]}
        default:
            return state;
    }
}