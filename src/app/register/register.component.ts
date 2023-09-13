import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';


interface ResponseData {
  error_msg: string;
  tag: string;
  status: boolean;
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  private readonly REGISTER_URL = 'http://localhost:8080/api/users/register';

  hide = true;

  username: string;
  email: string;
  password: string;

  constructor( private http: HttpClient, private router: Router) {
    this.username = '';
    this.email = '';
    this.password = '';
  }

  register(){
    const params = new HttpParams()
    .set('username', this.username)
    .set('email', this.email)
    .set('password', this.password);

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: params,
  };

    this.http.post<ResponseData>(this.REGISTER_URL, null, httpOptions).subscribe(
      (response) => {
        // Gestisci la risposta del server qui, se necessario.

        window.alert(response.error_msg);



        if(response.status == true){
          window.alert("Ora esegui il login");
          this.router.navigate(['/login']);
        }
        console.log('Risposta POST:', response.error_msg);
      },
      (error) => {
        // Gestisci eventuali errori qui.
        console.error('Errore POST:', error);
      }
    );
  }

}
