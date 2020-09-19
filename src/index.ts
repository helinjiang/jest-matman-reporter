import { Config } from '@jest/types';
import { Context, Test, ReporterOnStartOptions } from '@jest/reporters';
import { AggregatedResult, TestResult } from '@jest/test-result';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import JestHtmlReporters from 'jest-html-reporters';

import { IJestMatmanReporterOptions } from './types';

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

    if (this.mOptions?.outputPath) {
      console.log('=this.mOptions?.outputPath=', this.mOptions?.outputPath);
    }

    // 这里的取值参考了 @jest/reporters 里面 utils.js 中的写法
    const suitesFailed = results.numFailedTestSuites;
    const suitesPassed = results.numPassedTestSuites;
    const suitesPending = results.numPendingTestSuites;
    const suitesTotal = results.numTotalTestSuites;

    const testsFailed = results.numFailedTests;
    const testsPassed = results.numPassedTests;
    const testsPending = results.numPendingTests;
    const testsTotal = results.numTotalTests;

    const result = {
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

    console.log('0000result: ', result);
  }
}
