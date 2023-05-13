// @deno-types="npm:@types/nearley@2.11.2"
import nearley from "npm:nearley";
import grammar from "./parser.ts";
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar), {});

const filepath = Deno.args[0];
const data = await Deno.readTextFile(filepath);

parser.feed(data);
console.log(JSON.stringify(parser.results, null, "\t"));
