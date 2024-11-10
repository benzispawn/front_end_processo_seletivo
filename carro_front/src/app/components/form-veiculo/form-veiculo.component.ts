import {Component, Inject} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Veiculo} from "../../model";
import {VeiculoService} from "../../services/veiculo.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-form-veiculo',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './form-veiculo.component.html',
  styleUrl: './form-veiculo.component.scss',
  host: {
    class: 'form-veiculo',
  }
})
export class FormVeiculoComponent {
  veiculo!: Veiculo;
  constructor(
    private veiculoService: VeiculoService,
    protected dialogRef: MatDialogRef<FormVeiculoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Veiculo | null,
  ) {

    this.veiculo = data
      ? {...data}
      : { id: 0, placa: '', chassi: '', renavam: '', modelo: '', marca: '', ano: new Date().getFullYear() };
  }

  async onSubmit() {
    if (!!this.veiculo?.id) {
      await this.veiculoService.updateVeiculo(this.veiculo);
    } else {
      await this.veiculoService.criarVeiculo(this.veiculo);
    }
    this.dialogRef.close(true);
  }
}
