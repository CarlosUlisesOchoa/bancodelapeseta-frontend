import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// import 'material-icons/iconfont/material-icons.css'; // FIXME: material-icons no longer exists



@Component({
  selector: 'app-personal-account',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './personal-account.component.html',
  styleUrl: './personal-account.component.css'
})
export class PersonalAccountComponent {

}
