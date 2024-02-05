import { useState, useEffect } from "react";

const graphql = `
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

const useFetchNotes = () => {
	const [page, setPage] = useState(null);

	useEffect(() => {
		window
			.fetch(`https://graphql.contentful.com/content/v1/spaces/ut5kkjbz9h3a/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer 896XWFIUDmfvueftAFHLulaNNDlNGwjt7XwigcgSKkU",
				},
				body: JSON.stringify({ graphql }),
			})
			.then((response) => response.json())
			.then(({ data, errors }) => {
				if (errors) {
					console.error(errors);
				}

				setPage(data.pageTestCollection);
			});
	}, []);

	return page;

};

export default useFetchNotes;