import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Bitacora } from '../../core/models/bitacora';
import { BitacoraService } from '../../core/services/bitacora.service';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-bitacora',
  standalone: true,
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css'],
  imports: [CommonModule, TableModule, FormsModule, ButtonModule, ToastModule],
  providers: [MessageService]
})
export default class BitacoraComponent {
  bitacoras: Bitacora[] = [];
  selectedRange: { start: Date; end: Date } = { start: new Date(), end: new Date() };

  constructor(
    private bitacoraService: BitacoraService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllBitacoras();
  }

  getAllBitacoras() {
    this.bitacoraService.getBitacoras().subscribe((data) => {
      this.bitacoras = data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)); // Ordenar por ID descendente
    });
  }
  
  filterByDateRange() {
    const startDate = new Date(this.selectedRange.start);
    const endDate = new Date(this.selectedRange.end);
  
    this.bitacoraService.getBitacorasByDateRange(startDate, endDate).subscribe((data) => {
      this.bitacoras = data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)); // Ordenar por ID descendente
    });
  }
  
}
