import { AnalisadorLexico } from './AnalisadorLexico.js';

const codigo = "if 2 + var_nova then";

console.log("Analisando o código:", `"${codigo}"`);
console.log("-".repeat(40));

try {
  const analisador = new AnalisadorLexico(codigo);
  const tokens = analisador.analisar();
  
  console.log("Tokens reconhecidos:");
  console.table(tokens);
  
} catch (erro) {
  console.error("Ocorreu um erro durante a análise léxica:");
  console.error(erro.message);
}