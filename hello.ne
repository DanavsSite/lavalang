@{%
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
%}
@lexer lexer
@preprocessor typescript

statement ->
    var_assign
var_assign ->
   (_ %identifier _):? %identifier _ %colon  %assignEq _ expression {%
    (data:any)=>{
        return {
            type:data[0] ? data[0][1] : "DYNAMIC",
            name:data[1],
            value:data[data.length - 1]
        }
    }
   %}
expression ->
    %string {%id%}
    | %number {%id%}
    | %identifier {%id%}
_ -> %WS:*