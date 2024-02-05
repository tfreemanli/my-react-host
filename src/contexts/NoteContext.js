import { createContext, useContext, useEffect, useReducer } from "react";
import NotesReducer from "../reducers/NotesReducer";
import dataClient from "../helpers/dataClient";

/*
Global context for note, this will inc a NoteContextProvider and a useNoteContext()
The NoteContext.Provider supply the JSX tag with children tag, and all the Notes fetch from Contentful.com
The useNoteContext cosumer return the value saved in the useReducer hook.
*/
const NoteContext = createContext();

const initialState = {
	isError: false,
	isLoading: false,
	allNotes: [],
	ftrNotes: [],
	isItemLoading: false,
	noteItem: {},
};

const NoteContextProvider = ({children})=>{

	const [ state, dispatch ] = useReducer(NotesReducer, initialState);
	//const arrNotes = useFetchNotes(query);
	useEffect(()=>{
		dataClient.getEntries({ content_type: 'note' })
			.then((response) => {
				//console.log(response.items);
				dispatch({type:'DOWNLOAD_ALL_NOTES', data:response.items});
			});
	},[]);

	return (
		<NoteContext.Provider value={ {...state, dispatch} }>
			{children}
		</NoteContext.Provider>
	);
}; 

const useNoteContext = ()=>{
	return useContext(NoteContext);
};
export {NoteContextProvider, useNoteContext};