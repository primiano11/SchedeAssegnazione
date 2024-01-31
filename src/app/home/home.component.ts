import { Component, ViewEncapsulation } from '@angular/core'
import { AuthService } from '../utils/authservice';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {


  constructor(private authService: AuthService){}

  logout(){
    this.authService.logout();
  }

}
