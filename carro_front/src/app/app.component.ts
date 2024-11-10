import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ListaVeiculosComponent} from "./components/lista-veiculos/lista-veiculos.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ListaVeiculosComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
