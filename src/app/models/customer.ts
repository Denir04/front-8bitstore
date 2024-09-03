import { Address } from "./address";

export interface Customer {
  id: string;
  nome_completo: string;
  data_nascimento: string;
  cpf: string;
  telefone: string;
  genero: string;
  email: string;
  senha: string;
  senha_novamente: string;
  endereco_residencial: Address;
}
