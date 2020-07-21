export function getFormBody(params) {
	let formBody = [];
	for (let property in params) {
		let encodedKey = encodeURIComponent(property);
		let encodedValue = encodeURIComponent(params[property]);
		formBody.push(encodedKey + "=" + encodedValue);
	}
	return formBody.join("&");
}
export function getAuthTokenFromStorage() {
	return localStorage.getItem("token");
}
