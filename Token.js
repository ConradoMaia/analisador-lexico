export class Token {
  constructor(tipo, lexema, linha, coluna) {
    this.tipo = tipo;
    this.lexema = lexema;
    this.linha = linha;
    this.coluna = coluna;
  }
}