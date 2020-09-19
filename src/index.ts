import path from 'path';

import CliTable3 from 'cli-table3';
import colors from 'colors/safe';
import fse from 'fs-extra';

import { Config } from '@jest/types';
import { Context, Test, ReporterOnStartOptions } from '@jest/reporters';
import { AggregatedResult, TestResult } from '@jest/test-result';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import JestHtmlReporters from 'jest-html-reporters';

import { IJestMatmanReporterOptions, IJestMatmanReporterResult } from './types';

// https://brunoscheufler.com/blog/2020-02-14-supercharging-jest-with-custom-reporters
// https://github.com/dkelosky/jest-stare/blob/master/src/reporter/Reporter.ts

// import { Reporter } from '@jest/reporters';
// export default class JestMatmanReporter implements Pick<Reporter, 'onRunComplete'> {
export default class JestMatmanReporter extends JestHtmlReporters {
  public mGlobalConfig: Config.InitialOptions;

  /**
   * jest-matman-reporter configuration
   * @private
   * @type {IJestMatmanReporterOptions}
   * @memberof Reporter
   */
  private mOptions: IJestMatmanReporterOptions;

  /**
   * Creates an instance of Reporter.
   * @param {GlobalConfig} mGlobalConfig - jest global config
   * @param {*} mOptions - jest options in effect
   * @memberof Reporter
   */
  constructor(mGlobalConfig: Config.InitialOptions, mOptions: IJestMatmanReporterOptions) {
    super(mGlobalConfig, mOptions);
    this.mGlobalConfig = mGlobalConfig;
    this.mOptions = mOptions;
  }

  /**
   * Call for tests starting
   * @param {AggregatedResult} results - jest results
   * @param {ReporterOnStartOptions} options - jest invoked options
   * @memberof Reporter
   */
  public onRunStart(results: AggregatedResult, options?: ReporterOnStartOptions) {
    // do nothing
  }

  /**
   * Called for single test
   * @param {Test} test - jest Test object
   * @memberof Reporter
   */
  public onTestStart(test: Test) {
    // do nothing
  }

  /**
   * Called on a test completion
   * @param {Test} test - jest Test object
   * @param {TestResult} testResult - jest results
   * @param {AggregatedResult} aggregatedResult - jest summarized results
   * @memberof Reporter
   */
  public onTestResult(test: Test, testResult: TestResult, results: AggregatedResult) {
    // do nothing
  }

  /**
   * Called when all is complete?
   * @param {Set<Context>} contexts - jest context
   * @param {IResultsProcessorInput} results - jest summarized results
   * @memberof Reporter
   */
  public async onRunComplete(contexts: Set<Context>, results: AggregatedResult) {
    await super.onRunComplete(contexts, results);

    // 这里的取值参考了 @jest/reporters 里面 utils.js 中的写法
    const suitesFailed = results.numFailedTestSuites;
    const suitesPassed = results.numPassedTestSuites;
    const suitesPending = results.numPendingTestSuites;
    const suitesTotal = results.numTotalTestSuites;

    const testsFailed = results.numFailedTests;
    const testsPassed = results.numPassedTests;
    const testsPending = results.numPendingTests;
    const testsTotal = results.numTotalTests;

    const result: IJestMatmanReporterResult = {
      testSuites: {
        // 未通过的数量
        failed: suitesFailed,

        // 跳过不执行的数量
        skipped: suitesPending,

        // 通过的数量
        passed: suitesPassed,

        // 总数
        total: suitesTotal,
      },
      tests: {
        // 未通过的数量
        failed: testsFailed,

        // 跳过不执行的数量
        skipped: testsPending,

        // 通过的数量
        passed: testsPassed,

        // 总数
        total: testsTotal,
      },
    };

    showResultUseTable(result);

    // 输出目录
    const publicPath =
      this.mOptions?.matman?.outputPath || this.mOptions?.publicPath || process.cwd();

    const resultFilename =
      this.mOptions?.matman?.resultFilename || 'jest-matman-reporter-result.json';

    fse.outputJsonSync(path.resolve(publicPath, resultFilename), result);
  }
}

function showResultUseTable(result: IJestMatmanReporterResult): void {
  const cliTable3 = new CliTable3({
    head: [],
  });

  cliTable3.push(['', 'Total', 'Passed', 'Failed', 'Pending']);

  cliTable3.push([
    'Test Suites',
    result.testSuites.total,
    colors.green(result.testSuites.passed + ''),
    colors.red(result.testSuites.failed + ''),
    colors.yellow(result.testSuites.skipped + ''),
  ]);

  cliTable3.push([
    'Tests',
    result.tests.total,
    colors.green(result.tests.passed + ''),
    colors.red(result.tests.failed + ''),
    colors.yellow(result.tests.skipped + ''),
  ]);

  console.log(cliTable3.toString());
}
