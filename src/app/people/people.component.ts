import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Person } from './model/person';
import { GetPeople } from './state/people.actions';
import { PeopleState } from './state/people.state';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  // Selector asociado a la propiedad people del estado
  @Select(PeopleState.people)
  people$: Observable<Person[]>;

  // Array donde almacenaremos las personas
  public peopleFiltered: Person[] = [];

  // Atributo para el filtro del nombre
  public filterName: string;
 
  constructor(private store: Store) { 
    this.filterName = '';
  }

  ngOnInit() {
    // Filtro al inicio
    this.filter();
    this.fetchPeople();
  }

  fetchPeople(){
    // Nos subscribimos para estar pendiente de los cambios de la propiedad
    this.people$.subscribe({
      next: () => {
        // Obtenemos el array de personas de la store
        this.peopleFiltered = this.store.selectSnapshot(PeopleState.people);
        console.log('People ha cambiado');
      }
    })
  }

  filter() {
    // Activo la acción, dandole el nombre a filtrar
    this.store.dispatch(new GetPeople({ name: this.filterName }));
  }
}
