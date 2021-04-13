import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditPopup } from '../redux/actions/actionsList';
import { editTextOfNote } from "../redux/actions/actionsList";
import { url } from "../variables";

const EditPopup = () => {
    
    const isEditPopupOpened = useSelector(({isEditPopupOpened}) => isEditPopupOpened);
    
    const noteToEdit = useSelector(({noteToEdit}) => noteToEdit);

    const dispatch = useDispatch();

    const inputRef = useRef();

    const [noteText, setNoteText] = useState()

    useEffect(() => {
        inputRef.current.value = noteToEdit.noteText;
        setNoteText(noteToEdit.noteText)
        inputRef.current.focus();
    }, [isEditPopupOpened]);

    const closeEditPopup = () => {
        dispatch(toggleEditPopup({
            noteId: null, 
            noteIndex: null,
            noteText: ''
        }));
    }

    const editNoteText = async () => {
        const res = await axios.patch(`${url}/notes/${noteToEdit.noteId}.json`, { text: noteText });
        const modifiedNote = {
            noteId: noteToEdit.noteId,
            noteIndex: noteToEdit.noteIndex,
            modifiedText: noteText
        }
        dispatch(editTextOfNote(modifiedNote));
        dispatch(toggleEditPopup({
            noteId: null, 
            noteIndex: null,
            noteText: ''
        }));
    }

    return (
            <div className="popup" style={{display: isEditPopupOpened ? 'block' : 'none'}}>
                <div className="popup__body">
                    <div className="popup__content">
                        <div className="popup__close" onClick={closeEditPopup}><img src="https://img.icons8.com/metro/52/26e07f/delete-sign.png"/></div>
                        <div className="popup__input">
                            <input type="text" className="input_in_popup" ref={inputRef} onChange={(e) => setNoteText(e.target.value.trim())}/>
                        </div>
                        <button className="add_edit_tag" onClick={() => editNoteText()}>Сохранить изменения</button>
                    </div>
                </div>
            </div>
    )
}

export default EditPopup
