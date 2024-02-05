import NotesSubNav from "../components/NotesSubNav";
import NotesList from "../components/NotesList";

const Notes = () => {
	return (
			<div className="row">
				<NotesSubNav />
				<NotesList />
			</div>
	);
}

export default Notes;