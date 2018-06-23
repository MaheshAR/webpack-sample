export class Helper{
	static saveLoggedInUser(userInfo){
		sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
	}

	static getLoggedInUser(){
		return JSON.parse(sessionStorage.getItem('userInfo'));
	}

	static isUserLoggedIn(){
		return (this.getLoggedInUser() !== null);
	}
}