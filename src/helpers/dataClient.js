var contentful = require("contentful");

const dataClient = contentful.createClient({
	space: 'ut5kkjbz9h3a',
	//environment: '<environment_id>', // defaults to 'master' if not set
	//accessToken: 'DWCMBdc9GDrVtjQamk5qLlxvbWGGHHNgtc_2PBeQWbU' //Preview API key
	accessToken: '896XWFIUDmfvueftAFHLulaNNDlNGwjt7XwigcgSKkU' //Public API key
});

export default dataClient;