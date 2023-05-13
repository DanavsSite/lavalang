// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var identifier: any;
declare var colon: any;
declare var assignEq: any;
declare var string: any;
declare var number: any;
declare var WS: any;

// @deno-types="npm:@types/moo@0.5.5"
import moo from "npm:moo"
 let lexer = moo.compile({
  WS: /[ \t]+/,
  comment: /\/\/.*?$/,
  number: /0|[1-9][0-9]*/,
  string: /".*"|'.*'/,
  lparen: "(",
  rparen: ")",
  keywords: ["if", "while"],
  identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
  NL: { match: /\n/, lineBreaks: true },
  assignEq: "=",
  colon: ":",
});

interface NearleyToken {
  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: lexer,
  ParserRules: [
    {"name": "statement", "symbols": ["var_assign"]},
    {"name": "var_assign$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_"]},
    {"name": "var_assign$ebnf$1", "symbols": ["var_assign$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "var_assign$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "var_assign", "symbols": ["var_assign$ebnf$1", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("colon") ? {type: "colon"} : colon), (lexer.has("assignEq") ? {type: "assignEq"} : assignEq), "_", "expression"], "postprocess": 
        (data:any)=>{
            return {
                type:data[0] ? data[0][1] : "DYNAMIC",
                name:data[1],
                value:data[data.length - 1]
            }
        }
           },
    {"name": "expression", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expression", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"]}
  ],
  ParserStart: "statement",
};

export default grammar;
