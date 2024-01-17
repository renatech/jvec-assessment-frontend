import { getCookie } from "./cookieHelper"

export const address = "127.0.0.1:8000"
export const protocol = "http"//"https" 


const get_url = (path, urlParams) => {
	let url = `${protocol}://${address}/${path}`
	
	if (urlParams !== undefined) {
		for (let q in urlParams) {
			if (url.includes("?")) {
				url += `&${q}=${urlParams[q]}`
			} else {
				url += `?${q}=${urlParams[q]}`
			}
		}
	}
	////consolee.log(url)
	return url
}

const prepareFetchObject = (method, useHeader, data) => {
	return new Promise((resolve, reject) => {
		const fetchObject = {
			method: method,
		}
		if (method !== "GET") {
			fetchObject["body"] = data
		}
		if (useHeader) {
			if(getCookie("token").length === 0){
				
				//resolve({})
			}else{
				fetchObject["headers"] = {
					Authorization: `Token ${getCookie("token")}`,
				}
				
				resolve(fetchObject)
			}
			
		} else {
			resolve(fetchObject)
		}
	})
}

export const manageServerCall = (
	method,
	path,
	data = {},
	useHeader = true,
	urlParams
) => {

	return new Promise((resolve, reject) => {
		prepareFetchObject(method, useHeader, data).then(
			(returnedFetchObjectData) => {

				fetch(get_url(path, urlParams), returnedFetchObjectData)
					.then((res) => {
						if(res.status === 204){
							resolve(true)
						}else{
							res.json().then((data) => {
								if(res.status === 400){
									reject(data)
								}
								if (data.detail === undefined) {
									resolve(data)
								} else {
									reject(data.detail)
								}
							})
						}

						
					})
					.catch((err) => {
						reject(err)
					})
			}
		)
	})
}
