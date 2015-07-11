'use strict';

var _ = require('lodash'), fs = require('fs'), table = require('text-table');

var READ_UTF8 = {mode: 'r', encoding: 'utf8'};

var kanjiRequired = _.filter(
  fs.readFileSync('./data/kanji-required.tsv', READ_UTF8).split('\n'),
  _.negate(_.isEmpty)
);

var meanings = _.chain(fs.readFileSync('./data/kanji-meanings-raw.tsv', READ_UTF8).split('\n'))
  .filter(_.negate(_.isEmpty))
  .map(function (row) {
    var result = row.split('\t');
    [2, 3].forEach(function (i) {
      result[i] = _.map(result[i].split(','), _.trim);
    });
    var uniqKey = result[1];
    return [
      result[0],
      {
        "uniqKey": uniqKey,
        "otherKeys": _.chain(result).drop(2).flatten().uniq().without(uniqKey).filter(_.negate(_.isEmpty)).value()
      }
    ];
  })
  .zipObject()
  .value();

var missing = _.difference(kanjiRequired, _.keys(meanings));
if (missing.length > 0) {
  console.error('Some required kanji are missing:');
  console.error(_.chunk(missing, 10).map(function (chunk) {
    return chunk.join('');
  }).join('\n'));
}

var nonUniq = _.chain(meanings)
  .keys()
  .groupBy(function (char) {
    return meanings[char].uniqKey;
  })
  .pairs()
  .filter(function (row) {
    return row[1].length > 1;
  })
  .value();

if (nonUniq.length > 0) {
  console.error('Some kanji have non-unique keys:');
  console.log(nonUniq.map(function (row) {
    return row[0] + ':' + row[1].join('');
  }).join('\n'));
}

var tableRows = _.chain(meanings)
  .pairs()
  .map(function (pair) {
    return [pair[0], pair[1].uniqKey, pair[1].otherKeys.join(', ')];
  })
  .value();

var header = [
  ['kanji', 'unique key', 'other meanings'], 
  ['-----', '----------', '--------------']
];

var tableOpts = { hsep: ' | ' };

fs.writeFileSync('kanji-keys.md', table(header, tableOpts) + '\n' + table(tableRows, tableOpts));
