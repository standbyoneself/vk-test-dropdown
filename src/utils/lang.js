// Qwerty order
var latinSymbols = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  '[',
  ']',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  ';',
  '',
  '\\',
  '`',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  ',',
  '.',
  '/',
];

// Qwerty order
var cyrillicSymbols = [
  'й',
  'ц',
  'у',
  'к',
  'е',
  'н',
  'г',
  'ш',
  'щ',
  'з',
  'х',
  'ъ',
  'ф',
  'ы',
  'в',
  'а',
  'п',
  'р',
  'о',
  'л',
  'д',
  'ж',
  'э',
  'ё',
  ']',
  'я',
  'ч',
  'с',
  'м',
  'и',
  'т',
  'ь',
  'б',
  'ю',
  '/',
];

var translitRU = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'i',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ы: 'y',
  э: 'e',
  ю: 'yu',
  я: 'ya',
  ь: '',
  ъ: '',
};

var translitEN = {
  a: 'а',
  b: 'б',
  c: 'ц',
  d: 'д',
  e: 'е',
  f: 'ф',
  g: 'г',
  h: 'х',
  i: 'и',
  j: '',
  k: 'к',
  l: 'л',
  m: 'м',
  n: 'н',
  o: 'о',
  p: 'п',
  q: '',
  r: 'р',
  s: 'с',
  t: 'т',
  u: 'у',
  v: 'в',
  w: 'в',
  x: '',
  y: 'ы',
  z: 'з',
};

/**
 * Returns the cyrillic word
 * typed in latin keyboard layout
 * @param {string} latinWord
 * @returns {string} Cyrillic word
 * whose symbols are mapped
 * to latin qwerty
 *
 * @example
 * mapToCyrillicKeyboard('hjuj') => 'рого'
 */
function mapToCyrillicKeyboard(latinWord) {
  var cyrillicWord = '';
  for (var i = 0; i < latinWord.length; i++) {
    var symbol = latinWord[i].toLowerCase();
    var index = latinSymbols.indexOf(symbol);
    if (index === -1) {
      continue;
    }
    var cyrillicSymbol = cyrillicSymbols[index];
    cyrillicWord += cyrillicSymbol;
  }
  return cyrillicWord;
}

/**
 * Returns the latin word
 * typed in cyrillic keyboard layout
 * @param {string} cyrillicWord
 * @returns {string} Latin word
 * whose symbols are mapped
 * to cyrillic qwerty
 *
 * @example
 * mapToLatinKeyboard('кщпщ') => 'rogo'
 */
function mapToLatinKeyboard(cyrillicWord) {
  var latinWord = '';
  for (var i = 0; i < cyrillicWord.length; i++) {
    var symbol = cyrillicWord[i].toLowerCase();
    var index = cyrillicSymbols.indexOf(symbol);
    if (index === -1) {
      continue;
    }
    var latinSymbol = latinSymbols[index];
    latinWord += latinSymbol;
  }
  return latinWord;
}

function isCyrillic(str) {
  return /[а-я]/i.test(str);
}

function isLatin(str) {
  return /[a-z]/i.test(str);
}

function transliterate(word) {
  var result = '';
  for (var i = 0; i < word.length; i++) {
    var symbol = word[i].toLowerCase();
    var translitSymbol = isCyrillic(symbol)
      ? translitRU[symbol] || symbol
      : translitEN[symbol] || symbol;

    result += translitSymbol;
  }
  return result;
}
