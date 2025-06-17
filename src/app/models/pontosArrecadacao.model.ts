export interface pontoArrecadacao {
  id?: number;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  horarioFuncionamento: string;
  idParceiro: number;
  latitude?: number;
  longitude?: number;
  parceiro?: any;

}
