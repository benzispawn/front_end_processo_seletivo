import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVeiculoComponent } from './form-veiculo.component';

describe('FormVeiculoComponent', () => {
  let component: FormVeiculoComponent;
  let fixture: ComponentFixture<FormVeiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormVeiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
