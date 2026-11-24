export type Prioridad = 'Alta' | 'Media' | 'Baja';
export type EstadoIncidencia = 'Pendiente' | 'En proceso' | 'Resuelta';

export interface Incidencia {
  id: number;
  codigo: string;
  titulo: string;
  descripcion: string;
  prioridad: Prioridad;
  estado: EstadoIncidencia;
  responsable: string;
  fecha: string;
}
