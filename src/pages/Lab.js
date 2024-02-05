import { useState } from "react";
import dataClient from "../helpers/dataClient";

const Lab = () => {
	//const notes = test()
	//	.then((rs)=>{return rs;});
	//const notes = [{fields:{title:"t1", intro:"i1"}},{fields:{title:"t2", intro:"i22"}}];

	//console.log(notes);
	const [page, setPage] = useState();

	dataClient.getEntries({ content_type: 'note' })
	.then((response) => {
		//console.log(response.items);
		setPage(response.items);
	});

	if (!page) {
	  return (
		  <header className="row flex-v-middle">
			  <p>Loading...</p>
		  </header>
	  );
	}

	return (
		<div className="">
			{page.map((item)=>( 
				<div key={item.fields.id}>
					<h3>{item.fields.title}</h3>
					<p>{item.fields.intro}</p><hr/>
				</div>
				
			))}
			
		</div>
	);
};
  
export default Lab;