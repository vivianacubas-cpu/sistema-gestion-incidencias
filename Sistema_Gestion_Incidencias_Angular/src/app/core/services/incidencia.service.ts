import { Injectable } from '@angular/core';
import { Incidencia } from '../models/incidencia.model';

const STORAGE_KEY = 'sistema-incidencias-data';

@Injectable({ providedIn: 'root' })
export class IncidenciaService {
  private readonly initialData: Incidencia[] = [
    {
      id: 1, codigo: 'INC-001', titulo: 'Falla de red Laboratorio 04',
      descripcion: 'No hay conexión a internet en los equipos del laboratorio 04.',
      prioridad: 'Alta', estado: 'En proceso', responsable: 'Soporte técnico',
      fecha: '2026-11-23'
    },
    {
      id: 2, codigo: 'INC-002', titulo: 'Error de acceso al portal',
      descripcion: 'El portal institucional muestra un error al iniciar sesión.',
      prioridad: 'Media', estado: 'Pendiente', responsable: 'Mesa de ayuda',
      fecha: '2026-11-23'
    },
    {
      id: 3, codigo: 'INC-003', titulo: 'Actualización de Office',
      descripcion: 'Se requiere actualizar el paquete Office de un equipo.',
      prioridad: 'Baja', estado: 'Resuelta', responsable: 'Soporte técnico',
      fecha: '2026-11-22'
    }
  ];

  getAll(): Incidencia[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      this.saveAll(this.initialData);
      return [...this.initialData];
    }
    try {
      return JSON.parse(stored) as Incidencia[];
    } catch {
      this.saveAll(this.initialData);
      return [...this.initialData];
    }
  }

  save(item: Omit<Incidencia, 'id' | 'codigo'>, id?: number): Incidencia {
    const records = this.getAll();
    if (id !== undefined) {
      const index = records.findIndex(record => record.id === id);
      if (index < 0) throw new Error('La incidencia ya no existe.');
      const updated: Incidencia = { ...item, id, codigo: records[index].codigo };
      records[index] = updated;
      this.saveAll(records);
      return updated;
    }

    const nextId = records.reduce((max, record) => Math.max(max, record.id), 0) + 1;
    const created: Incidencia = {
      ...item,
      id: nextId,
      codigo: `INC-${String(nextId).padStart(3, '0')}`
    };
    this.saveAll([created, ...records]);
    return created;
  }

  delete(id: number): void {
    this.saveAll(this.getAll().filter(record => record.id !== id));
  }

  private saveAll(records: Incidencia[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }
}
