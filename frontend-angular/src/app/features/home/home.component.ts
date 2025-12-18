import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Importe se for usar botões de navegação

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink], 
  // Atenção aqui: o nome deve bater com o seu arquivo HTML
  templateUrl: './home.html', 
  styleUrl: './home.css'      
})
export class Home {
  // Lógica da home vai aqui
}