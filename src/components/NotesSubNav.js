import { Link } from 'react-router-dom';
import { useNoteContext } from '../contexts/NoteContext';

const NotesSubNav = ()=>{
	const {allNotes} = useNoteContext();

	if(!allNotes) {
		return (
			<div className="side-section">
				<p>Loading</p>
			</div>
		);
	}

	return (
		<div className="side-section">
			<div className="fakeimg"><b>我的笔记</b></div>
			{allNotes.map((item)=>(
				//
				<p key={item.fields.id}><Link to={`../noteitem/${item.fields.id}`}>{item.fields.title}</Link></p>
			))}

			<div className="fakeimg"><b>更多笔记</b></div>
		</div>
	);
};

export default NotesSubNav;