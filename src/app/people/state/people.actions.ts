export class GetPeople {
  static readonly type = '[People] Get people';
  constructor(public payload: { name: string }) { }
}
