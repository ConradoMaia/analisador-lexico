import { TiposDeTokens } from './tiposDeTokens.js';
import { Token } from './Token.js';

const regras = [
  [TiposDeTokens.ESPACO_BRANCO, /^\s+/],
  [TiposDeTokens.IF, /^if\b/],
  [TiposDeTokens.THEN, /^then\b/],
  [TiposDeTokens.NUMERO_INTEIRO, /^(0|[1-9][0-9]*)/],
  [TiposDeTokens.IDENTIFICADOR, /^[a-zA-Z_][a-zA-Z0-9_]*/],
  [TiposDeTokens.MAIS, /^\+/],
];

export class AnalisadorLexico {
  constructor(codigoFonte) {
    this.codigo = codigoFonte;
    this.posicao = 0;
    this.linha = 1;
    this.coluna = 1;
  }

  analisar() {
    const tokens = [];
    while (this.posicao < this.codigo.length) {
      const token = this.obterProximoToken();
      if (token) {
        tokens.push(token);
      }
    }
    tokens.push(new Token(TiposDeTokens.FIM_DE_ARQUIVO, null, this.linha, this.coluna));
    return tokens;
  }

  obterProximoToken() {
    const subStringRestante = this.codigo.substring(this.posicao);

    for (const [tipo, regex] of regras) {
      const corresponde = subStringRestante.match(regex);

      if (corresponde) {
        const lexema = corresponde[0];
        const token = new Token(tipo, lexema, this.linha, this.coluna);
        
        this.avancarPosicao(lexema);

        if (tipo === TiposDeTokens.ESPACO_BRANCO) {
          return null;
        }

        return token;
      }
    }

    throw new Error(`Caractere inesperado '${subStringRestante[0]}' na linha ${this.linha}, coluna ${this.coluna}`);
  }
  
  avancarPosicao(lexema) {
    this.posicao += lexema.length;
    
    const linhas = lexema.split('\n');
    if (linhas.length > 1) {
      this.linha += linhas.length - 1;
      this.coluna = linhas[linhas.length - 1].length + 1;
    } else {
      this.coluna += lexema.length;
    }
  }
}