import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../utils/authservice';

interface ResponseLoginData {
  tag: string;
  message: string;
  status: boolean;
  id: number;
  username: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private readonly LOGIN_URL = 'http://localhost:8080/api/users/login';

  hide = true;

  email: string;
  password: string;

  constructor( private http: HttpClient, private router: Router, private authService: AuthService) {
    this.email = '';
    this.password = '';
  }

  login(){

    const params = new HttpParams()
    .set('email', this.email)
    .set('password', this.password);

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: params,
  };

    this.http.get<ResponseLoginData>(this.LOGIN_URL, httpOptions).subscribe(
      (response) => {
        // Gestisci la risposta del server qui, se necessario.


        if(response.status == true){
          window.alert(response.message + ' - ' + 'Bentornato ' + response.username);
          this.authService.login();
          this.router.navigate(['/home/welcome']);
        } else if(response.status == false){
          window.alert(response.message);
        }
        console.log('Risposta POST:', response.message);
      },
      (error) => {
        // Gestisci eventuali errori qui.
        console.error('Errore POST:', error);
      }
    );

  }
}
