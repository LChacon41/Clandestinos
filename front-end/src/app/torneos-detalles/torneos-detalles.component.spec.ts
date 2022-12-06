import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneosDetallesComponent } from './torneos-detalles.component';

describe('TorneosDetallesComponent', () => {
  let component: TorneosDetallesComponent;
  let fixture: ComponentFixture<TorneosDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorneosDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneosDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
