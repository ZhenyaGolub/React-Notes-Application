import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../variables';
import { deleteNote, deleteTag, toggleEditPopup, togglePopup } from "../redux/actions/actionsList";
import { TransitionGroup, CSSTransition } from "react-transition-group";


const NotesList = () => {
  const notes = useSelector(({notes}) => notes);
  const filteredNotes = useSelector(({filteredNotes}) => filteredNotes);
  const mode = useSelector(({mode}) => mode);

  const dispatch = useDispatch();
  const removeNote = async (id) => {
    await axios.delete(`${url}/notes/${id}.json`);
    dispatch(deleteNote(id));
  }

  const removeTag = async (id, tagId, uniqueTagID) => {
    if(uniqueTagID === undefined){
      await axios.delete(`${url}/notes/${id}/tags/${tagId}.json`);
    } else {
      await axios.delete(`${url}/notes/${id}/tags/${uniqueTagID}.json`);
    }
    dispatch(deleteTag(tagId, id));
  }

  const openPopup = (noteIndex, noteId, lastTagId) => {
    dispatch(togglePopup(noteIndex, noteId, lastTagId));
  }

  const openEditPopup = (noteIndex, noteId, noteText) => {
    dispatch(toggleEditPopup({noteIndex, noteId, noteText}));
  }

    return (
        //<div className="notes__list">
          <TransitionGroup className="notes__list">
          {
          mode === 'CREATE_MODE' ? notes.map((item, index) => {
            return(
              <CSSTransition
                key={index}
                classNames={'note'}
                timeout={400}
                appear={true}
                unmountOnExit
              >
                <div className="notes__list-item" key={index}>
                <button className="delete__button" onClick={() => removeNote(item.id)}>✖</button>
                <button className="edit__button" onClick={() => openEditPopup(index, item.id, item.text)}>✎</button>
                <button className="add-tag__button" onClick={() => openPopup(index, item.id, item.tags.length !== 0 ? item.tags[item.tags.length - 1].tagId : -1)}>+</button>
                <div className="notes__list-item-content">
                <div className="notes__list-item-text">{item.text}</div>
                <div className="notes__list-item-date">{item.date}</div>
                </div>
                <div className="notes__list-item-tags">
                  {
                    item.tags.map((item, index) => {
                    if(item){
                      return <span key={index} className="tag">{item.title}<img onClick={() => removeTag(item.id, item.tagId, item.uniqueTagID)} className="delete__tag" src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-sign.png" alt="Удалить"/></span>;
                    }
                    })
                  }    
                </div>
              </div>
              </CSSTransition>
            )
          }) : filteredNotes.map((item, index) => {
            return(
              <CSSTransition
                key={index}
                classNames={'note'}
                timeout={400}
                appear={true}
                unmountOnExit
              >
                <div className="notes__list-item" key={index}>
                <button className="delete__button" onClick={() => removeNote(item.id)}>✖</button>
                <button className="edit__button" onClick={() => openEditPopup(index, item.id, item.text)}>✎</button>
                <button className="add-tag__button" onClick={() => openPopup(index, item.id, item.tags.length !== 0 ? item.tags[item.tags.length - 1].tagId : -1)}>+</button>
                <div className="notes__list-item-content">
                <div className="notes__list-item-text">{item.text}</div>
                <div className="notes__list-item-date">{item.date}</div>
                </div>
                <div className="notes__list-item-tags">
                  {
                    item.tags.map((item, index) => {
                    if(item){
                      return <span key={index} className="tag">{item.title}<img onClick={() => removeTag(item.id, item.tagId, item.uniqueTagID)} className="delete__tag" src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-sign.png" alt="Удалить"/></span>;
                    }
                    })
                  }    
                </div>
              </div>
              </CSSTransition>
            )
          })
            
          }
          </TransitionGroup>
      //</div>
    )
}

export default NotesList;
