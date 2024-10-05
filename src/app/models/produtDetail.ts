export interface ProductDetail{
    id: number,
    isbn: string,
    titulo: string,
    ano: number,
    imagem: string,
    descricao: string,
    faixa_etaria: number,
    max_jogadores: number,
    custo: number,
    quantidade_carrinho: number,
    categorias: string[],
    plataformas: string[],
    desenvolvedoras: string[]
}