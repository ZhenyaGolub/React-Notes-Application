import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNotes } from './redux/actions/actionsList';
import { url } from './variables';
import { drawApp } from "./utils";

function App() {

  const dispatch = useDispatch();
  
  const isLoaded = useSelector(({isLoaded}) => isLoaded);

  const isPopupsOpened = useSelector(({isPopupOpened, isEditPopupOpened}) => {
    return { isPopupOpened, isEditPopupOpened };
  });

  const notes = useSelector(({notes}) => notes);

  useEffect(() => {
    axios.get(`${url}/notes.json`)
    .then(res => {
      if(res.data){
        dispatch(fetchAllNotes(res.data));
      } else {
        dispatch(fetchAllNotes([]));
      }
      
    });
  }, []);

  return (
      drawApp(notes, isLoaded, isPopupsOpened)
  )

}

export default App;

