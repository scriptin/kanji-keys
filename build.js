'use strict';

var _ = require('lodash'), fs = require('fs'), table = require('text-table');

var READ_UTF8 = {mode: 'r', encoding: 'utf8'};

var kanjiKeys = JSON.parse(fs.readFileSync('./kanji-keys.json', READ_UTF8));

var nonUniq = _.chain(kanjiKeys)
  .keys()
  .groupBy(function (char) {
    return kanjiKeys[char].uniqKey;
  })
  .pairs()
  .filter(function (row) {
    return row[1].length > 1;
  })
  .value();

if (nonUniq.length > 0) {
  console.error('Some kanji have non-unique keys:');
  console.error(nonUniq.map(function (row) {
    return row[0] + ':' + row[1].join('');
  }).join('\n'));
}

var tableRows = _.chain(kanjiKeys)
  .pairs()
  .map(function (pair, index) {
    return [index, pair[0], pair[1].uniqKey, pair[1].otherKeys.join(', ')];
  })
  .value();

var header = [
  ['no.', 'kanji', 'unique key', 'other keys'], 
  ['---', '-----', '----------', '----------']
];

var tableOpts = { hsep: ' | ' };

fs.writeFileSync('kanji-keys.md', table(header, tableOpts) + '\n' + table(tableRows, tableOpts));
