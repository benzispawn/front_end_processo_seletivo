import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IError, Veiculo} from "../model";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private url: string = "http://localhost:3000/api/veiculos";
  constructor(private http: HttpClient) {

  }

  async pegarVeiculos(): Promise<Veiculo[] | IError> {
    try {
      const response = await this.http.get<Veiculo[] | IError>(`${this.url}/`);
      return await lastValueFrom(response);
    } catch (error) {
      return {
        error: `Falhou ao pegar os veículos.`,
      }
    }
  }

  async pegarVeiculosPorId(id: number): Promise<Veiculo[] | IError> {
    try {
      const response = await this.http.get<Veiculo[] | IError>(`${this.url}/${id}`);
      return await lastValueFrom(response);
    } catch (error) {
      return {
        error: `Falhou ao pegar os veículos`,
      }
    }
  }

  async criarVeiculo(veiculo: Veiculo): Promise<Veiculo | IError> {
    try {
      const response = await this.http.post<Veiculo | IError>(`${this.url}`, veiculo);
      return await lastValueFrom<Veiculo | IError>(response);
    } catch (error) {
      return {
        error: `Falhou em adicionar o veículo.`,
      }
    }
  }

  async updateVeiculo(veiculo: Veiculo): Promise<Veiculo | IError> {
    try {
      const response = await this.http.put<Veiculo | IError>(`${this.url}/` + veiculo.id, veiculo);
      return await lastValueFrom<Veiculo | IError>(response);
    } catch (error) {
      return {
        error: `Falhou ao atualizar o veículo ${veiculo.id}`,
      }
    }
  }

  async deleteVeiculo(veiculo: Veiculo): Promise<void | IError> {
    try {
      console.log('@@@ veiculo deletar', veiculo);
      const response = await this.http.delete<void | IError>(`${this.url}/` + veiculo.id);
      return await lastValueFrom<void | IError>(response);
    } catch (error) {
      console.log('2@@ falhou')
      return {
        error: `Falhou ao remover o veículo ${veiculo.id}`,
      }
    }

  }

}
