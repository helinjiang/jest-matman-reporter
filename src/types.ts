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

export interface IJestMatmanReporterResult {
  testSuites: {
    // 未通过的数量
    failed: number;

    // 跳过不执行的数量
    skipped: number;

    // 通过的数量
    passed: number;

    // 总数
    total: number;
  };
  tests: {
    // 未通过的数量
    failed: number;

    // 跳过不执行的数量
    skipped: number;

    // 通过的数量
    passed: number;

    // 总数
    total: number;
  };
}

interface IMatmanCustomOptions {
  outputPath?: string;
  resultFilename?: string;
}
