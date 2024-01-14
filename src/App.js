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
    return (
		<header className="App-header">
			<p>Loading...</p>
		</header>
	);
  }

  // render the fetched Contentful data
  return (
	<>
	<div  className="note" style={{ color:"yellow",background: "rgba(250,15,10,0.8)", padding:"2px"}}>
		<h4 style={{textAlign: "center" }}>Resize the browser window to see the responsive effect.</h4>
	</div>

	<div className="header">
		<div className="banner">
		<h1>My Website</h1>
		<p>With a <b>flexible</b> layout.</p>
		</div>
		<div className="navbar">
		<a href="/">Link</a>
		<a href="/">Link</a>
		<a href="/">Link</a>
		<a href="/">Link</a>
		</div>
	</div>

	<div className="row">
		<div className="side">
			<h2>About Me</h2>
			<h5>Photo of me:</h5>
			<div className="fakeimg" style={{height:"200px" }}>Image</div>
			<p>Some text about me in culpa qui officia deserunt mollit anim..</p>
			<h3>More Text</h3>
			<p>Lorem ipsum dolor sit ame.</p>
			<div className="fakeimg" style={{height:"60px" }}>Image</div><br/>
			<div className="fakeimg" style={{height:"60px" }}>Image</div><br/>
			<div className="fakeimg" style={{height:"60px" }}>Image</div>
		</div>
		<div className="main">
				<p>{page.total} entries successfully fetched from Contentful CMS</p>

				{page.items.map((item)=>( 

					<div>
						<h2>{item.title}</h2>
						<img src={item.photo.url} className="fakeimg" alt="logo" />
						<p>Some text..</p>
					</div>

				))}
			
			
		</div>
	</div>

	<div className="footer">
	<h2>Footer</h2>
	</div>

	</>
  );
}

export default App;