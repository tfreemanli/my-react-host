import { useNoteContext } from "../contexts/NoteContext";
import NoteItemCard from "./NoteItemCard";

const NotesList = () => {
	const {allNotes} = useNoteContext();

	if(!allNotes) {
		return (
			<div className="main-section">
				<p>/ Notes / List /</p>
				<h3>经过整理归纳的知识才是自己的。</h3>
				<p>Loading...</p>
			</div>

		);
	}

	return (
			<div className="main-section">
				<p>/ Notes / List /</p>
				<h3>经过整理归纳的知识才是自己的。</h3>
				<div className="note-card-container">
					{allNotes.map((item)=>(
						<NoteItemCard key={item.fields.id} {...item} />
					))}
				</div>
			</div>
	);
};
export default NotesList;