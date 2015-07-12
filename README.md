# Kanji keys

A "key" is a word or phrase which can be used as a "fake name" of a kanji. Key can be a real meaning of kanji (e.g. [一 = "one"](http://jisho.org/search/%E4%B8%80%20%23kanji)), or just something helpful to remember a kanji. Keys are not strictly equal to meanings, but usually they are close enough.

Here you can find keys for 3100+ kanji.

## Contents of files

- [kanji-keys.json](kanji-keys.json) - JSON object; keys are kanji themselves, values are objects with two fields:
  - `uniqKey` - string, required, unique non-empty value
  - `otherKeys` - array of strings, required, may be empty
- [kanji-keys.md](kanji-keys.md) - table for convenient viewing on GitHub

For each kanji, there is a unique key and other keys. Other keys usually better in terms of relation to actual meaning of a kanji, but are not guaranteed to be unique. Also, there may not be other keys, if unique key is sufficient.

Most of unique keys are the same as in [RTK][], but not all of them. Also, there are extra kanji, which are not in RTK - those are from my [TopoKanji][] project.

[rtk]: https://en.wikipedia.org/wiki/Remembering_the_Kanji_and_Remembering_the_Hanzi
[topokanji]: https://github.com/scriptin/topokanji

## License

This is a multi-license project. Choose any license from this list:

- [Apache-2.0](http://www.apache.org/licenses/LICENSE-2.0) or any later version
- [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) or any later version
- [EPL-1.0](https://www.eclipse.org/legal/epl-v10.html) or any later version
- [LGPL-3.0](http://www.gnu.org/licenses/lgpl-3.0.html) or any later version
- [MIT](http://opensource.org/licenses/MIT)
