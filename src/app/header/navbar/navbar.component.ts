import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from "@angular/router";
import { PATH } from "../../core/enum/path.enum";
@Component({
  selector: 'app-navbar',
  imports: [CommonModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}
  
  navigateToLogin(): void {
    this.router.navigate([PATH.HOME, PATH.LOGIN]);

    
}
  navigateToProducts(): void {
    this.router.navigate([PATH.HOME, PATH.PRODUCTOS]);

}
}
