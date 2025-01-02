import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpensesLoadFromFileComponent } from './expenses-load-from-file.component';

describe('ExpensesLoadFromFileComponent', () => {
  let component: ExpensesLoadFromFileComponent;
  let fixture: ComponentFixture<ExpensesLoadFromFileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesLoadFromFileComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesLoadFromFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
