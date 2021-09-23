import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientslistComponent } from './clientslist.component';

describe('ClientslistComponent', () => {
  let component: ClientslistComponent;
  let fixture: ComponentFixture<ClientslistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
