import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private backendService: BackendService) {
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
//        this.backendService.getRecipes();
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    console.log('login attempt for user: ' + this.email);
    this.authService.login(this.email, this.password)
      .then(res => {
        // this.flashMessage.show('you are now logged in', {
        //   cssClass: 'alert-success', timeout: 4000
        // });
        this.backendService.getRecipes();
        this.router.navigate(['/recipes']);
      }).catch(
      err => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
  }
}
