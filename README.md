# bili-fav-collector

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]
[![javascript_code style][code-style-image]][code-style-url]

## b站 UP主收藏夹工具

这个项目提供了一个工具，用于处理BiliBili（哔哩哔哩）平台上指定UP主的所有收藏夹内容信息。它支持以下功能：

- 收藏夹信息获取：获取指定UP主创建的所有收藏夹的信息，包括收藏夹标题、包含视频数量等。
- 收藏夹内容爬取：针对每个收藏夹，获取其中的视频列表和详细信息，支持分页抓取。

## 如何使用：
指定UP主ID和Cookie：在代码中设置待爬取UP主的ID和登录所需的Cookie。
执行程序：运行主函数，程序将自动获取UP主的收藏夹信息并逐一获取每个收藏夹的视频内容。
数据处理：你可以对获取的视频内容进行处理，例如保存到文件、进行分析或做其他数据操作。

## 使用前提：
你需要有相应UP主的登录权限（Cookie），或者该UP主的收藏夹是公开的，来获取其收藏夹信息。
该工具旨在用于学习和个人研究目的，请在合法合规的范围内使用。

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Kirk Lin](https://github.com/kirklin)


<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/bili-fav-collector?style=flat&colorA=080f12&colorB=3491fa
[npm-version-href]: https://npmjs.com/package/bili-fav-collector
[npm-downloads-src]: https://img.shields.io/npm/dm/bili-fav-collector?style=flat&colorA=080f12&colorB=3491fa
[npm-downloads-href]: https://npmjs.com/package/bili-fav-collector
[bundle-src]: https://img.shields.io/bundlephobia/minzip/bili-fav-collector?style=flat&colorA=080f12&colorB=3491fa&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=bili-fav-collector
[license-src]: https://img.shields.io/github/license/kirklin/bili-fav-collector.svg?style=flat&colorA=080f12&colorB=3491fa
[license-href]: https://github.com/kirklin/bili-fav-collector/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=3491fa
[jsdocs-href]: https://www.jsdocs.io/package/bili-fav-collector
[code-style-image]: https://img.shields.io/badge/code__style-%40kirklin%2Feslint--config-3491fa?style=flat&colorA=080f12&colorB=3491fa
[code-style-url]: https://github.com/kirklin/eslint-config/
