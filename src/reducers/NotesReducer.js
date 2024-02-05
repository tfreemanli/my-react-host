const NotesReducer = (state, action)=>{
	switch (action.type) {
		case "DOWNLOAD_ALL_NOTES":
			//
			return {
				...state, 
				allNotes: [...action.data]
			};
		default:
			//
			return (state);
	}

};

export default NotesReducer;