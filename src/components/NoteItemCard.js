import { Link } from "react-router-dom";

const NoteItemCard = (curElem) => {
	const { id, title, intro } = curElem.fields;
	return (
		<div className="noteitemcard">
		<Link to={`../noteitem/${id}`}>
			<div className="card-title">
				{title}
			</div>
			<div className="card-data">
				<p>{intro}</p>
			</div>
		</Link>
		</div>
	);
};
export default NoteItemCard;