import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';
import { PeopleService } from 'src/app/services/people.service';
import { Person } from '../model/person';
import { GetPeople } from './people.actions';

export class PeopleStateModel {
  public people: Person[];
}

const defaults = {
  people: []
};

@State<PeopleStateModel>({
  name: 'people',
  defaults
})
@Injectable()
export class PeopleState {

  // Selectores
  @Selector()
  static people(state: PeopleStateModel) {
    return state.people;
  }

  constructor(private peopleService: PeopleService) { }

  @Action(GetPeople)
  getPeople({ setState }: StateContext<PeopleStateModel>, { payload }: GetPeople) {
    return this.peopleService.fetchPeople(payload.name).pipe(
      tap((people: Person[]) => {
        setState({
          people
        })
      })
    )
  }
}
