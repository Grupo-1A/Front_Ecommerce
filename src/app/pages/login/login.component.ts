import { Component } from '@angular/core';
import { Navbar2Component } from '../../header/navbar2/navbar2.component';
import { Footer2Component } from '../../footer/footer2/footer.component';

@Component({
  selector: 'app-login',
  imports: [Navbar2Component,Footer2Component],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
