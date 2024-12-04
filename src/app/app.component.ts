import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public dietPages = [
    { title: 'Ingredients', url: '/ingredients', icon: 'fish' },
    { title: 'Dishes', url: '/dishes', icon: 'fast-food' },
    { title: 'Diets', url: '/diets', icon: 'heart' },
    { title: 'Shared Management', url: '/sharedManagement', icon: 'settings' },
    { title: 'Diet Requirements', url: '/dietRequirements', icon: 'newspaper' },
    { title: 'Shopping List', url: '/shoppingList', icon: 'document' },
  ];

  public moneyPages = [
    { title: 'Expenses', url: '/expenses', icon: 'card' },
    { title: 'Planning', url: '/expenses/planning', icon: 'cash' },
  ];

  public organizationPages = [
    { title: 'Calendar', url: '/calendar', icon:'calendar'},
    { title: 'ToDo', url: '/todo', icon: 'list'}
  ]

  constructor() {}
}
