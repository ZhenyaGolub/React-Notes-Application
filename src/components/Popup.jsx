import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { togglePopup } from '../redux/actions/actionsList';
import { addTag } from "../redux/actions/actionsList";
import { url } from '../variables';

const Popup = () => {

    const { isPopupOpened, tagToAdd } = useSelector((state) => state);

    const [tag, setTag] = useState('');

    const dispatch = useDispatch();

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.value = '';
        inputRef.current.focus();
    }, [isPopupOpened]);


    const takeAwayPopup = () => {
        dispatch(togglePopup());
    }
    
    const addTagToNote = async () => {
        const { idOfNote, lastTagId } = tagToAdd;

        const tagModel = {
            tagId: lastTagId + 1,
            title: tag,
        }

        const res = await axios.post(`${url}/notes/${idOfNote}/tags.json`, tagModel);

        dispatch(addTag(tagToAdd, tag, res.data.name));
        dispatch(togglePopup());
        setTag('');
    }

    return (
        <div className="popup" style={{display: isPopupOpened ? 'block' : 'none'}}>
            <div className="popup__body">
                <div className="popup__content">
                    <div className="popup__close" onClick={takeAwayPopup}><img src="https://img.icons8.com/metro/52/26e07f/delete-sign.png"/></div>
                    <div className="popup__input">
                        <input type="text" className="input_in_popup" ref={inputRef} onChange={(e) => setTag(e.target.value.trim())}/>
                    </div>
                    <button className="add_tag" onClick={() => addTagToNote()} disabled={tag === '' ? true : false}>Добавить тег</button>
                </div>
            </div>
        </div>
    )
}

export default Popup
