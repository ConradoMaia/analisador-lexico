import { TiposDeTokens } from './tiposDeTokens.js';
import { Token } from './Token.js';
import { palavrasChave } from './palavrasChave.js';

const regras = [
  [TiposDeTokens.ESPACO_BRANCO, /^\s+/],
  [TiposDeTokens.COMENTARIO, /^\{(.|\s)*?\}/], // Comentário de bloco { ... }
  [TiposDeTokens.COMENTARIO, /^\/\/.*/],       // Comentário de linha //
  
  [TiposDeTokens.NUMERO_REAL, /^\d+\.\d+/],
  [TiposDeTokens.NUMERO_INTEIRO, /^\d+/],
  
  [TiposDeTokens.LITERAL_STRING, /^"([^"\\]|\\.)*"/],
  
  [TiposDeTokens.IDENTIFICADOR, /^[\p{L}_][\p{L}\p{N}_]*/u],

  [TiposDeTokens.ATRIBUICAO, /^:=/],
  [TiposDeTokens.DIFERENTE, /^<>/],
  [TiposDeTokens.MENOR_IGUAL, /^<=/],
  [TiposDeTokens.MAIOR_IGUAL, /^>=/],
  
  [TiposDeTokens.PARENTESES_ESQ, /^\(/],
  [TiposDeTokens.PARENTESES_DIR, /^\)/],
  [TiposDeTokens.PONTO_VIRGULA, /^;/],
  [TiposDeTokens.DOIS_PONTOS, /^:/],
  [TiposDeTokens.PONTO, /^\./],
  [TiposDeTokens.VIRGULA, /^,/],
  
  [TiposDeTokens.MAIS, /^\+/],
  [TiposDeTokens.MENOS, /^-/],
  [TiposDeTokens.MULTIPLICACAO, /^\*/],
  [TiposDeTokens.DIVISAO_REAL, /^\//],
  [TiposDeTokens.IGUAL, /^=/],
  [TiposDeTokens.MENOR, /^</],
  [TiposDeTokens.MAIOR, /^>/],
];

const tokensIgnorados = new Set([
  TiposDeTokens.ESPACO_BRANCO,
  TiposDeTokens.COMENTARIO
]);

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

    for (let [tipo, regex] of regras) {
      const corresponde = subStringRestante.match(regex);

      if (corresponde) {
        const lexema = corresponde[0];
        
        if (tipo === TiposDeTokens.IDENTIFICADOR) {
          const tipoDaPalavraChave = palavrasChave[lexema.toLowerCase()];
          if (tipoDaPalavraChave) {
            tipo = tipoDaPalavraChave;
          }
        }
        
        const token = new Token(tipo, lexema, this.linha, this.coluna);
        
        this.avancarPosicao(lexema);

        if (tokensIgnorados.has(tipo)) {
          return null;
        }

        return token;
      }
    }

    throw new Error(`Caractere inesperado '${subStringRestante[0]}' na linha ${this.linha}, coluna ${this.coluna}`);
  }
  
  avancarPosicao(lexema) {
    const linhas = lexema.split('\n');
    if (linhas.length > 1) {
      this.linha += linhas.length - 1;
      this.coluna = linhas[linhas.length - 1].length + 1;
    } else {
      this.coluna += lexema.length;
    }
    this.posicao += lexema.length;
  }
}