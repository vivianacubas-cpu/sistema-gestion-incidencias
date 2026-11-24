import { Component } from '@angular/core';
import { IncidenciasComponent } from './features/incidencias/incidencias.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IncidenciasComponent],
  template: '<app-incidencias />'
})
export class AppComponent {}
