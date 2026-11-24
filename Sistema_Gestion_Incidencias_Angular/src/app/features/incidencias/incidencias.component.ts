import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Incidencia, Prioridad, EstadoIncidencia } from '../../core/models/incidencia.model';
import { IncidenciaService } from '../../core/services/incidencia.service';

@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incidencias.component.html',
  styleUrl: './incidencias.component.css'
})
export class IncidenciasComponent implements OnInit {
  get totalPrioridadAlta(): number {
    return this.incidencias.filter(incidencia => incidencia.prioridad === 'Alta').length;
  }

  get totalResueltas(): number {
    return this.incidencias.filter(incidencia => incidencia.estado === 'Resuelta').length;
  }

  incidencias: Incidencia[] = [];
  busqueda = '';
  filtroPrioridad = '';
  filtroEstado = '';
  modalAbierto = false;
  detalleAbierto = false;
  editandoId: number | undefined;
  seleccionada: Incidencia | null = null;
  mensaje = '';

  formulario = this.formularioVacio();

  readonly prioridades: Prioridad[] = ['Alta', 'Media', 'Baja'];
  readonly estados: EstadoIncidencia[] = ['Pendiente', 'En proceso', 'Resuelta'];

  constructor(private readonly service: IncidenciaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  get incidenciasFiltradas(): Incidencia[] {
    const term = this.busqueda.trim().toLowerCase();
    return this.incidencias.filter(item => {
      const coincideTexto = !term ||
        item.titulo.toLowerCase().includes(term) ||
        item.codigo.toLowerCase().includes(term);
      const coincidePrioridad = !this.filtroPrioridad || item.prioridad === this.filtroPrioridad;
      const coincideEstado = !this.filtroEstado || item.estado === this.filtroEstado;
      return coincideTexto && coincidePrioridad && coincideEstado;
    });
  }

  cargar(): void {
    this.incidencias = this.service.getAll();
  }

  abrirNuevo(): void {
    this.editandoId = undefined;
    this.formulario = this.formularioVacio();
    this.modalAbierto = true;
  }

  editar(item: Incidencia): void {
    this.editandoId = item.id;
    this.formulario = {
      titulo: item.titulo,
      descripcion: item.descripcion,
      prioridad: item.prioridad,
      estado: item.estado,
      responsable: item.responsable,
      fecha: item.fecha
    };
    this.modalAbierto = true;
  }

  guardar(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.service.save(this.formulario, this.editandoId);
    this.cargar();
    this.modalAbierto = false;
    this.mensaje = this.editandoId ? 'Incidencia actualizada correctamente.' : 'Incidencia registrada correctamente.';
    this.editandoId = undefined;
    setTimeout(() => this.mensaje = '', 3000);
  }

  verDetalle(item: Incidencia): void {
    this.seleccionada = item;
    this.detalleAbierto = true;
  }

  eliminar(item: Incidencia): void {
    const confirmado = confirm(`¿Está seguro de eliminar ${item.codigo}?`);
    if (!confirmado) return;
    this.service.delete(item.id);
    this.cargar();
    this.mensaje = 'Incidencia eliminada correctamente.';
    setTimeout(() => this.mensaje = '', 3000);
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.detalleAbierto = false;
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.filtroPrioridad = '';
    this.filtroEstado = '';
  }

  private formularioVacio() {
    return {
      titulo: '',
      descripcion: '',
      prioridad: 'Media' as Prioridad,
      estado: 'Pendiente' as EstadoIncidencia,
      responsable: '',
      fecha: new Date().toISOString().slice(0, 10)
    };
  }
}
