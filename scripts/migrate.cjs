const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    if (fs.statSync(file).isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Exact pair replacements
  const pairs = [
    [/bg-white\s+bg-gray-[89]00/g, 'bg-gray-800'],
    [/bg-white\s+dark:bg-gray-900/g, 'bg-gray-900'],
    [/bg-gray-50\s+dark:bg-gray-900/g, 'bg-gray-900'],
    [/bg-white\s+dark:bg-gray-800/g, 'bg-gray-800'],
    [/bg-gray-100\s+dark:bg-gray-800/g, 'bg-gray-800'],
    [/text-gray-900\s+dark:text-gray-100\/70/g, 'text-gray-100/70'],
    [/text-gray-900\s+dark:text-gray-100/g, 'text-gray-100'],
    [/text-gray-500\s+dark:text-gray-400/g, 'text-gray-400'],
    [/text-gray-700\s+dark:text-gray-300/g, 'text-gray-300'],
    [/border-gray-200\s+dark:border-gray-700/g, 'border-gray-700'],
    [/shadow-sm\s+dark:shadow-md/g, 'shadow-md'],
    [/bg-green-600\s+dark:bg-green-500/g, 'bg-green-500'],
    [/hover:bg-green-700\s+dark:hover:bg-green-400/g, 'hover:bg-green-400'],
    [/bg-white\/90\s+dark:bg-gray-800\/90/g, 'bg-gray-800/90'],
    [/bg-white\/80\s+dark:bg-gray-800\/80/g, 'bg-gray-800/80'],
  ];

  pairs.forEach(([regex, replacement]) => {
    content = content.replace(regex, replacement);
  });

  // 2. Remove isolated dark: prefixes
  content = content.replace(/dark:([^\s\"\'\`\}]+)/g, '$1');

  // 3. Remove stray light classes cautiously 
  content = content.replace(/\bbg-white\b/g, 'bg-gray-800');
  content = content.replace(/\btext-black\b/g, 'text-white');
  content = content.replace(/\bbg-gray-50\b/g, 'bg-gray-900');
  content = content.replace(/\bborder-gray-200\b/g, 'border-gray-700');

  // Clean up excessive whitespace
  content = content.replace(/\s{2,}(?=[\"\'\`])/g, ' '); 

  if (content !== original) {
    fs.writeFileSync(file, content);
  }
});
console.log("Migration complete.");
