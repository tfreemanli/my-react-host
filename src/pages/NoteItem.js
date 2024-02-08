import NotesSubNav from "../components/NotesSubNav";
import { useParams } from "react-router-dom";
import { useNoteContext } from "../contexts/NoteContext";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


const RichText = (richText) =>{
	const renderOptions = {
		renderNode: {
			'embedded-asset-block': (node) => {
			const alt = node.data.target.fields.title
			const url = node.data.target.fields.file.url
			return (
					<img className="artical-image-container" alt={alt} src={url} />
			)
			},
		},
	};

	console.log(richText);

	return (
    <div className="artical-container" >
      {documentToReactComponents(richText, renderOptions)}
    </div>
  )
}

const NoteItem = ()=>{
	const {id} = useParams()
	const {allNotes} = useNoteContext();
	//console.log(id);
	const theitem = allNotes.find((item)=>{
		//console.log(item.fields.id);
		return (item.fields.id.toString() === id);
	});
	
	if(!theitem ) {
		return (
			<div>loading...</div>
		);
	}
	//console.log(theitem.fields.note);
	const {title, note, author, dtUpdate} = theitem.fields;
	//const {title, note} = {title:"",note:""};
	return (
		<div className="row">
			<NotesSubNav />
			<div className="main-section">
					<div>
						<h3>{title}</h3>
						<p className="minor-text">Auth:{author} Pub date:{dtUpdate}</p>
						<hr/>
						<RichText {...note}/>
					</div>
			</div>
		</div> 
	);
};
export default NoteItem;