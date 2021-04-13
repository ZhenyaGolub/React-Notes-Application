import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNote, changeMode, filterNotes } from '../redux/actions/actionsList';
import { url } from "../variables";
import TagsToAdd from './TagsToAdd';

const NotesCreator = () => {
  const dispatch = useDispatch();
  const [noteText, setNote] = useState('');
  const [tags, setTags] = useState([]);
  const notesCreator = useRef();
  const mode = useSelector(({mode}) => mode);

  useEffect(() => {
    notesCreator.current.focus();
  }, [mode]);

  const parser = (string) => {
    const tags = string.split(' ').filter(item => {
      if(item.includes('#')){
        return item;
      }
    }).map((tag) => {
      if(tag.includes('#')){
        const allTags = tag.split('#').splice(1);
        if(allTags.includes('')){
          return allTags.filter(tag => tag !== '');
        } else {
          return allTags;
        } 
      }
    }).join(',').split(',').filter(tag => tag !== '');
    return setTags(tags);
  }
  
  const setNoteToDB = async () => {

    const noteModel = {
      text: noteText,
      date: new Date().toLocaleDateString(),
      tags: tags.map((tag, index) => {
        return {
          title: tag,
          tagId: index
        }
      })
    }

    const res = await axios.post(`${url}/notes.json`, noteModel);

    const note = {
      ...noteModel,
      tags: tags.map((tag, index) => {
        return {
          title: tag,
          tagId: index,
          id: res.data.name
        }
      }),
      id:res.data.name
    }

    dispatch(addNote(note));
    setNote('');
    notesCreator.current.value = '';
    setTags([]);
  }

    return (
      <div>
        <div className="notes__creator animate__animated animate__tada animate__delay-2s">
        <input type="text" className="notes__creator-input" onChange={(e) =>{
          if(mode === 'CREATE_MODE'){
            parser(e.target.value.trim());
            setNote(e.target.value.trim());
          } else {
            parser(e.target.value.trim());
            setNote(e.target.value.trim());
            dispatch(filterNotes(e.target.value.trim()));
          }
        }}
         ref={notesCreator}/>
        <button className={`notes__creator-add ${mode === "CREATE_MODE" ? 'active' : ''}`} onClick={() => {
          if(mode === 'FILTER_MODE'){
            dispatch(changeMode('CREATE_MODE'))
          } else {
            setNoteToDB()
          }
        }} disabled={mode === 'CREATE_MODE' && noteText.trim() === '' ? true : false}>+</button>
        <button className={`notes__creator-search ${mode === "FILTER_MODE" ? 'active' : ''}`} onClick={() => dispatch(changeMode('FILTER_MODE'))}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="50" height="50"
        viewBox="0 0 172 172"
        style={{fill: '#26e07f'}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none"></path><g fill={mode === "FILTER_MODE" ? '#FFFFFF' : '#17b978'}><path d="M72.24,10.32c-32.33062,0 -58.48,26.14938 -58.48,58.48c0,32.33063 26.14938,58.48 58.48,58.48c11.54281,0 22.22563,-3.38625 31.2825,-9.1375l42.2475,42.2475l14.62,-14.62l-41.71,-41.6025c7.49813,-9.83625 12.04,-22.02406 12.04,-35.3675c0,-32.33062 -26.14937,-58.48 -58.48,-58.48zM72.24,24.08c24.76531,0 44.72,19.95469 44.72,44.72c0,24.76531 -19.95469,44.72 -44.72,44.72c-24.76531,0 -44.72,-19.95469 -44.72,-44.72c0,-24.76531 19.95469,-44.72 44.72,-44.72z"></path></g></g></svg>
        </button>
      </div>
      <TagsToAdd tags={tags}/>
      </div>
        
    )
}

export default NotesCreator;
