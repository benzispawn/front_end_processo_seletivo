import {Component, OnInit} from '@angular/core';
import {VeiculoService} from "../../services/veiculo.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IError, Veiculo} from "../../model";
import {FormVeiculoComponent} from "../form-veiculo/form-veiculo.component";

@Component({
  selector: 'app-lista-veiculos',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    // provideHttpClient(withFetch()),
    VeiculoService,
  ],
  templateUrl: './lista-veiculos.component.html',
  styleUrl: './lista-veiculos.component.scss',
  host: {
    'class': 'lista-veiculos',
  }
})
export class ListaVeiculosComponent implements OnInit {
  colunas: string[] = ['placa', 'modelo', 'marca', 'ano', 'editar', 'remover'];
  dataSource = new MatTableDataSource<Veiculo>();
  veiculos: Veiculo[] | IError = [];
  textoBusca: string = '';
  mensagemErro: string | null = null;
  constructor(
    // private _router: RouterOutlet
    private veiculoService: VeiculoService,
    private dialog: MatDialog,
  ) {

  }
  async ngOnInit() {
    await this.pegarVeiculos();
  }

  async pegarVeiculos() {
    let result = await this.veiculoService.pegarVeiculos();
    if ('error' in result) {
      this.mensagemErro = result.error;
    } else {
      this.veiculos = result;
      this.dataSource.data = this.veiculos;
    }
  }

  abrirFormulario(veiculo?: Veiculo) {
    const dialogRef = this.dialog.open(FormVeiculoComponent, {
      data: veiculo || null,
    });
    dialogRef.afterClosed().subscribe(async result => {
      await this.pegarVeiculos();
      if (result && veiculo?.id) {
        this.veiculos = await this.veiculoService.pegarVeiculosPorId(veiculo.id);
      }
    });
  }

  async removerVeiculo(veiculo: Veiculo) {
    const result: void | IError = await this.veiculoService.deleteVeiculo(veiculo);
    if (!!result && result.error) {
      this.mensagemErro = result.error;
    } else {
      await this.pegarVeiculos();
    }
  }

  filtrarVeiculos() {
    const filtro = this.textoBusca.trim().toLowerCase();
    if (!filtro) {
      this.dataSource.data = (this.veiculos as Veiculo[]);
      return;
    }
    const tmp = (this.veiculos as Veiculo[]).filter(v => {
      return v.modelo.toLowerCase().includes(filtro) ||
      v.marca.toLowerCase().includes(filtro)
    });
    this.dataSource.data = tmp;
  }
}
