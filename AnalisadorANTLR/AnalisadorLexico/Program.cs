using System;
using Antlr4.Runtime;
using Antlr4.Runtime.Tree;

class Program
{
    static void Main(string[] args)
    {
        string code = @"
            program Test;
            var x : integer;
            begin
                x := 10 + 20 * (3 - 1);
                if x >= 30 then
                    x := x + 1;
                while x < 100 do
                    x := x + 10;
            end;
        ";

        // --- Etapa 1: Lexer ---
        var input = new AntlrInputStream(code);
        var lexer = new MyLangLexer(input);
        var tokens = new CommonTokenStream(lexer);

        // --- Etapa 2: Parser ---
        var parser = new MyLangParser(tokens);
        var tree = parser.program(); // regra inicial da gramática

        Console.WriteLine("TOKENS:");
        tokens.Fill();
        foreach (var t in tokens.GetTokens())
        {
            string name = lexer.Vocabulary.GetSymbolicName(t.Type);
            Console.WriteLine($"{name} -> '{t.Text}'");
        }

        Console.WriteLine("\nÁRVORE SINTÁTICA:");
        Console.WriteLine(tree.ToStringTree(parser)); // árvore em formato LISP
    }
}
