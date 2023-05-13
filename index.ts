// @deno-types="npm:@types/moo@0.5.5"
import moo from "npm:moo";
export let lexer = moo.compile({
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
});
lexer.reset(`while moo`);
while (true) {
  const token = lexer.next();
  if (!token) break;
  console.log(token);
}
