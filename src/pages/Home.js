import { createContext, useContext } from "react";

function Component5(contxt) {

	const user = useContext(contxt);
	//const user = useContext();

	return (
	  <>
		<h1>Component Home</h1>
		<h2>{`Hello ${user} again!`}</h2>
	  </>
	);
  }

export {Component5};