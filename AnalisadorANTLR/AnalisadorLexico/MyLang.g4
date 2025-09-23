grammar MyLang;

// --- regras do parser ---
program : (decl | stmt)* EOF ;

decl
    : 'program' ID ';'
    | 'var' ID (':' type)? ';'
    ;

type
    : 'integer'
    | 'real'
    | 'boolean'
    | 'string'
    ;

stmt
    : assignStmt
    | ifStmt
    | whileStmt
    | block
    ;

assignStmt : ID ':=' expr ';' ;

ifStmt : 'if' expr 'then' stmt ('else' stmt)? ;

whileStmt : 'while' expr 'do' stmt ;

block : 'begin' stmt* 'end' ';' ;

expr
    : expr ('*'|'/') expr
    | expr ('+'|'-') expr
    | expr relop expr
    | '(' expr ')'
    | INT
    | REAL
    | STRING
    | ID
    ;

relop
    : '=' | '<>' | '<' | '<=' | '>' | '>='
    ;

// --- regras do lexer ---
ID       : [a-zA-Z_][a-zA-Z0-9_]* ;
INT      : [0-9]+ ;
REAL     : [0-9]+ '.' [0-9]+ ([eE] [+-]? [0-9]+)? ;
STRING   : '"' ( ~["\\\r\n] | '\\' . )* '"' ;

PLUS     : '+' ;
MINUS    : '-' ;
MUL      : '*' ;
DIV      : '/' ;
ASSIGN   : ':=' ;
EQUAL    : '=' ;
NEQ      : '<>' ;
LE       : '<=' ;
GE       : '>=' ;
LT       : '<' ;
GT       : '>' ;

LPAREN   : '(' ;
RPAREN   : ')' ;
SEMI     : ';' ;
COLON    : ':' ;
DOT      : '.' ;
COMMA    : ',' ;

// --- comentários e espaços ---
LINE_COMMENT   : '//' ~[\r\n]* -> skip ;
BLOCK_COMMENT1 : '{' .*? '}' -> skip ;
BLOCK_COMMENT2 : '(*' .*? '*)' -> skip ;
WS             : [ \t\r\n]+ -> skip ;
