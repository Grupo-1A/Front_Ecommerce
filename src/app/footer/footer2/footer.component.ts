import { Component } from '@angular/core';

@Component({
  selector: 'app-footer2',
  imports: [],
  template: `
    <footer class="custom-footer">
      <p>Copyright © 2025 JDC-Commerce Colombia LTDA.</p>
    </footer>
  `,
  styles: `
    .custom-footer {
  background-color: #A6E2DD;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  position: relative;
  bottom: 0;
  width: 100%;
}
  
  `
})
export class Footer2Component {

}
