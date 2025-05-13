import { Component } from '@angular/core';
import { Navbar2Component } from '../../header/navbar2/navbar2.component';
import { Footer2Component } from '../../footer/footer2/footer.component';

@Component({
  selector: 'app-register',
  imports: [  Navbar2Component,Footer2Component],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
