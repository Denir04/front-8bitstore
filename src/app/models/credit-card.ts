export interface CreditCard {
  id: number;
  numero_impresso: string;
  nome_impresso: string;
  cvv: string;
  bandeira: string;
  preferencial: boolean;
}
