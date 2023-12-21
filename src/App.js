import { useState, useEffect } from "react";
import "./App.css";
//import contentful from 'contentful';

const query = `
{
	pageTestCollection {
	  total
	  items {
		title
		photo {
		  url
		}
	  }
	}
  }
`;

const App = ()=>{
	const [page, setPage] = useState(null);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/ut5kkjbz9h3a/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 896XWFIUDmfvueftAFHLulaNNDlNGwjt7XwigcgSKkU",
        },
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        setPage(data.pageTestCollection);
      });
  }, []);

  if (!page) {
    return "Loading...";
  }

  // render the fetched Contentful data
  return (
    <div className="App">
		<p>{page.total} data successfully fetched from Contentful CMS</p>
		{page.items.map((item)=>( 

			<header className="App-header">
				<img src={item.photo.url} className="App-logo" alt="logo" />
				<p>{item.title}</p>
			  </header>

		 ))}
      
    </div>
  );
}

export default App;