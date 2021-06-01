export let getToken = (data = {}) => {
	let baseUrl = "https://www.toysbear.com"
	if(process.env.NODE_ENV === 'development'){
	  baseUrl = "http://139.9.71.135:8080"
	  // baseUrl = "https://www.toysbear.com"
	}else{
	  baseUrl = "https://www.toysbear.com"
	}
	let httpDefaultOpts = {
		url: baseUrl + '/api/GetToken',
		data: JSON.stringify({
			companyNum: 'LittleBearWeb',
			platForm: 'PC'
		}),
		method: 'post',
		header: {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json; charset=utf-8'
		},
		dataType: 'json',
	}
	return uni.request(httpDefaultOpts);
};