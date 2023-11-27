const fs = require('fs');
const acorn = require('acorn');
const walk = require('acorn-walk');

// Ganti 'path/to/file.js' dengan path ke file JavaScript yang ingin Anda analisis
const filePath = './bin/cmd.js';

// Baca isi file
const code = fs.readFileSync(filePath, 'utf-8');

// Parsing kode menggunakan Acorn
const ast = acorn.parse(code, { ecmaVersion: 'latest' });

// Variabel untuk menyimpan fungsi-fungsi yang ditemukan
const functions = [];

// Gunakan Acorn Walk untuk menemukan fungsi-fungsi
walk.simple(ast, {
    FunctionDeclaration(node) {
        functions.push(node.params);
    },
    // FunctionExpression(node) {
    //     if (node.id) {
    //         functions.push(node.id.name);
    //     }
    // },
});

// Tampilkan nama fungsi yang ditemukan
console.log(functions);
