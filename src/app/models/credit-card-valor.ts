export interface CreditCardValor {
    id: number;
    numero_impresso: string;
    nome_impresso: string;
    cvv: string;
    bandeira: string;
    preferencial: boolean;
    valor: number|null;
  }