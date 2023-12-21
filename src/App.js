import { useState, useEffect } from "react";
import "./App.css";


//https://graphql.contentful.com/content/v1/spaces/ut5kkjbz9h3a/explore?access_token=DWCMBdc9GDrVtjQamk5qLlxvbWGGHHNgtc_2PBeQWbU
const query = `
{
	pageBlogPost(id:"4YpnxRJ6o0uhD0pxY7hHRF"){
	  title
	}
  }
`;

function App() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/ut5kkjbz9h3a/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer DWCMBdc9GDrVtjQamk5qLlxvbWGGHHNgtc_2PBeQWbU",
        },
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        setPage(data.pageBlogPost);
      });
  }, []);

  if (!page) {
    return "Loading...";
  }

  // render the fetched Contentful data
  return (
    <div className="App">
      <header className="App-header">
	  <p>{page.title}</p>
      </header>
    </div>
  );
}

export default App;