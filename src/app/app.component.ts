import { Component } from '@angular/core';
import { RouterOutlet , RouterModule} from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'seguro-salud-vida-sana';
}
