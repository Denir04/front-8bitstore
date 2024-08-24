export interface Address {
  id: number;
  apelido: string;
  tipo_residencia: string;
  tipo_logradouro: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  pais: string;
  observacoes: string;
  cobranca: boolean;
  entrega: boolean;
  residencial: boolean;
}
