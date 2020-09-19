// 完整参数说明参考 https://github.com/Hazyzh/jest-html-reporters#available-options
export interface IJestMatmanReporterOptions {
  publicPath?: string;
  filename?: string;
  expand?: string;
  pageTitle?: string;
  logoImgPath?: string;
  hideIcon?: string;
  customInfos?: string;
  testCommand?: string;
  matman?: IMatmanCustomOptions;
}

interface IMatmanCustomOptions {
  outputPath?: string;
}
