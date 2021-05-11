import axios from "axios";

const { REACT_APP_BE_URL } = process.env;
export const signup = async (data) => {
	const config = {
		headers: {
			"Content-type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
	};

	try {
		const response = await axios.post(
			`${REACT_APP_BE_URL}/profile/auth/signup`,
			data,
			config
		);

		if (response.status === 200) {
			return response.data;
		} else {
			return response.data;
		}
	} catch (error) {
		console.log("Error in signup fetching", error);
		console.log("error response data", error.response.data);
		return error.response.data;
	}
};

export const signin = async (data) => {
	const config = {
		headers: { "Content-type": "application/json" },
	};
	console.log("REACT_APP: ", REACT_APP_BE_URL);
	const response = await axios.post(
		`${REACT_APP_BE_URL}/profile/auth/login`,
		data,
		config
	);

	return response;
};
