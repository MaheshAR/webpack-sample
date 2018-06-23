export class DataAccess{
	static apicall(method, url, data = null){
		return new Promise((resolve, reject) => {
			const xhttp = new XMLHttpRequest();

			xhttp.open(method, url, true);
			xhttp.setRequestHeader("Content-type", "application/json");	
			xhttp.send(JSON.stringify(data));

			xhttp.onreadystatechange = function() {
			  	if (this.readyState === 4 && this.status === 200) {
			    	resolve(JSON.parse(this.responseText));
			  	}
			  	else if(this.status === 500){
			  		reject(JSON.parse(this.responseText));
			  	}
			};

		});
	}
}