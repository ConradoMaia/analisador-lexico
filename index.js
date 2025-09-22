import { AnalisadorLexico } from './AnalisadorLexico.js';

const codigo = `
{ Programa que calcula o salário de funcionários }
Program CalcularSalario;
Var
  TempoEmAnos : Integer;
  ValorSalario: Real;
  Nome: String; // Exemplo de comentário de linha
Begin
  Nome := "João Silva";
  TempoEmAnos := 15;

  If (TempoEmAnos > 10) Then
    ValorSalario := 5000.00
  Else
    ValorSalario := 3000.00;
End.
`;

console.log("Analisando o código de exemplo completo...");
console.log("-".repeat(60));

try {
  const analisador = new AnalisadorLexico(codigo);
  const tokens = analisador.analisar();
  
  console.log("Tokens reconhecidos:");
  console.table(tokens.map(t => ({ tipo: t.tipo, lexema: t.lexema, linha: t.linha, coluna: t.coluna })));
  
} catch (erro) {
  console.error("Ocorreu um erro durante a análise léxica:");
  console.error(erro.message);
}