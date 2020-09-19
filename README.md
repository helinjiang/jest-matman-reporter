# jest-matman-reporter

Jest reporter for matman.

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
