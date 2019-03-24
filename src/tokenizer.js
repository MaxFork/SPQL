function tokenizer(input) {
    let current = 0;
    let tokens = [];
    while (current < input.length) {
        let char = input[current];
        if (char === "{") {
            tokens.push({
                type: "lb",
                value: "{"
            });
            current++;
            continue;
        }
        if (char === "(") {
            tokens.push({
                type: "ls",
                value: "("
            });
            current++;
            continue;
        }
        if (char === "[") {
            tokens.push({
                type: "la",
                value: "["
            });
            current++;
            continue;
        }
        if (char === "}") {
            tokens.push({
                type: "rb",
                value: "}"
            });
            current++;
            continue;
        }
        if (char === ")") {
            tokens.push({
                type: "rs",
                value: ")"
            });
            current++;
            continue;
        }
        if (char === "]") {
            tokens.push({
                type: "ra",
                value: "]"
            });
            current++;
            continue;
        }
        if (/\s/.test(char)) {
            current++;
            continue;
        }
        if (char === ";") {
            tokens.push({
                type: "end",
                value: ";"
            });
            current++;
            continue;
        }
        if (char === ".") {
            tokens.push({
                type: "fs",
                value: "."
            });
            current++;
            continue;
        }
        if (char === ",") {
            tokens.push({
                type: "rz",
                value: ","
            });
            current++;
            continue;
        }
        if (/[0-9]/.test(char)) {
            let value = "";
            while (/[0-9\.]/.test(char) && current < input.length) {
                value += char;
                char = input[++current];
            }
            tokens.push({
                type: "num",
                value
            });
            continue;
        }
        if (char === '"') {
            let value = "";
            char = input[++current];
            while (true) {
                if (char === "\\") {
                    value += char;
                    char = input[++current];
                    value += char;
                    char = input[++current];
                    continue;
                }
                if (char === '"' || current >= input.length) {
                    break;
                }
                value += char;
                char = input[++current];
            }
            char = input[++current];
            tokens.push({
                type: "str",
                value
            });
            continue;
        }
        if (char === "'") {
            let value = "";
            char = input[++current];
            while (true) {
                if (char === "\\") {
                    value += char;
                    char = input[++current];
                    value += char;
                    char = input[++current];
                    continue;
                }
                if (char === "'" || current >= input.length) {
                    break;
                }
                value += char;
                char = input[++current];
            }
            char = input[++current];
            tokens.push({
                type: "sts",
                value
            });
            continue;
        }
        if (char === "/") {
            let value = "";
            char = input[++current];
            while (true) {
                if (char === "\\") {
                    value += char;
                    char = input[++current];
                    value += char;
                    char = input[++current];
                    continue;
                }
                if (char === "/" || current >= input.length) {
                    break;
                }
                value += char;
                char = input[++current];
            }
            char = input[++current];
            tokens.push({
                type: "rgx",
                value
            });
            continue;
        }
        if (char === "#") {
            let value = "";
            char = input[++current];
            while (char !== "\n" && current < input.length) {
                value += char;
                char = input[++current];
            }
            char = input[++current];
            continue;
        }
        let LETTERS = /[A-Za-z0-9\_\$]/i;
        if (LETTERS.test(char)) {
            let value = "";
            while (LETTERS.test(char) && current < input.length) {
                value += char;
                char = input[++current];
            }
            if (
                " if else for while do func switch class break continue case default return try catch ".indexOf(
                    " " + value + " "
                ) >= 0
            ) {
                tokens.push({
                    type: "key",
                    value
                });
            } else {
                tokens.push({
                    type: "nm",
                    value
                });
            }
            continue;
        }
        let PUNC = /[\+\-\*\/\\\=\%\&\|\!\?\:\<\>\~\`\@\^]/i;
        if (PUNC.test(char)) {
            let value = "";
            while (PUNC.test(char) && current < input.length) {
                value += char;
                char = input[++current];
            }
            tokens.push({
                type: "pnc",
                value
            });
            continue;
        }
        throw new TypeError("Unexpected token: " + char);
    }
    return tokens;
}

exports.tokenizer = tokenizer;