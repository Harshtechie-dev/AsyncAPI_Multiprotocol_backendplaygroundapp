const fs = require('fs');
const path = require('path');
const { parse } = require('@asyncapi/parser');

async function loadSpec() {
  const content = fs.readFileSync(path.join(__dirname, 'asyncapi.yaml'), 'utf8');
  const { document } = await parse(content);
  return document;
}

module.exports = { loadSpec };