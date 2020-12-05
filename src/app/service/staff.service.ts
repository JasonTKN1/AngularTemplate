import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptions2 = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text' as 'json'
};

const httpOptions1 = {
	headers: new HttpHeaders ({
	 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
	 'Accept': 'application/json',
	 'Authorization':  'xxxxx' 
	}),
	'withCredentials': true
};

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  baseUrl: string = "http://localhost:8888"

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any> {
		let credentials = {
			"username": email,
			"password": password
		};
		return this.httpClient.post<any>(this.baseUrl + "/login?", credentials, httpOptions2).pipe
			(
				catchError(this.handleError)
			);
	}


  private handleError(error: HttpErrorResponse) {
		let errorMessage: string = "";

		if (error.error instanceof ErrorEvent) {
			errorMessage = "An unknown error has occurred: " + error.error.message;
		}
		else {
			errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`;
		}

		console.error(errorMessage);

		return throwError(errorMessage);
	}
}
