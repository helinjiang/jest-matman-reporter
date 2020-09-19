# jest-matman-reporter

Jest reporter for matman.

## 1. 如何使用

本项目是在 [jest-html-reporters](https://github.com/Hazyzh/jest-html-reporters) 的基础上扩展的，因此参数和使用方式与其一致，例如：

```js
module.exports = {
  reporters: [
    'default',
    [
      'jest-matman-reporters',
      {
        publicPath: './html-report',
        filename: 'report.html',
        expand: true,
      },
    ],
  ],
};
```

参数配置和使用方式请查看 [jest-html-reporters](https://github.com/Hazyzh/jest-html-reporters) 说明。

唯一不同的是，本组件增加了一个 `options.matman` 配置，该配置为 `object` 类型。

- `options.matman.outputPath`，`string`，结果输出目录，如果不传递则会取 `options.matman.publicPath` 值，其次取 `process.cwd()`
- `options.matman.resultFilename`，`string`，结果文件的名字，默认值为 `jest-matman-reporter-result.json`

## 2. 查看报告结果

除了 [jest-html-reporters](https://github.com/Hazyzh/jest-html-reporters) 原本提供的 `.html` 报告之外，本组件还会在控制台输出一个表格结果，类似这样：

```
┌─────────────┬───────┬────────┬────────┬─────────┐
│             │ Total │ Passed │ Failed │ Pending │
├─────────────┼───────┼────────┼────────┼─────────┤
│ Test Suites │ 2     │ 2      │ 0      │ 0       │
├─────────────┼───────┼────────┼────────┼─────────┤
│ Tests       │ 2     │ 2      │ 0      │ 0       │
└─────────────┴───────┴────────┴────────┴─────────┘
```

同步还会输出一个 `json` 文件，类似这样：

```json
{
  "testSuites": { "failed": 0, "skipped": 0, "passed": 2, "total": 2 },
  "tests": { "failed": 0, "skipped": 0, "passed": 2, "total": 2 }
}
```
