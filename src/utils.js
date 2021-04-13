import EditPopup from "./components/EditPopup";
import EmptyList from "./components/EmptyList";
import Header from "./components/Header";
import Loader from "./components/Loader";
import NotesCreator from "./components/NotesCreator";
import NotesList from "./components/NotesList";
import Popup from "./components/Popup";

const appModel = (Component, isOpened) => {
    document.body.style.overflow = isOpened.isPopupOpened || isOpened.isEditPopupOpened ? 'hidden' : '';
    
    return (
        <div>
        <Header/>
        <div className="container">
          <div className="notes">
            <NotesCreator/>
            {
                Component
            }
          </div>    
        </div>
        <Popup/>
        <EditPopup/>
      </div>
    )
}


export const drawApp = (notes, isLoaded, isPopupsOpened) => {
    let el;
    if(isLoaded && notes.length !== 0){
         el = <NotesList/> 
    } else if(isLoaded && notes.length === 0){
         el = <EmptyList/>
    } else if(!isLoaded){
         el = <Loader/>
    }
    return appModel(el, isPopupsOpened);
}