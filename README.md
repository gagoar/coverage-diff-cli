<p align="center">
    <a href="https://www.npmjs.com/package/coverage-diff-cli">
      <img src="https://img.shields.io/npm/v/coverage-diff-cli/latest.svg?style=flat-square" alt="NPM Version" />
    </a>
    <a href="https://codecov.io/gh/gagoar/coverage-diff-cli">
      <img src="https://codecov.io/gh/gagoar/coverage-diff-cli/branch/main/graph/badge.svg"  alt="codecov"/>
    </a>
    <a href="https://github.com/gagoar/coverage-diff-cli/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/coverage-diff-cli.svg?style=flat-square" alt="MIT license" />
    </a>
<p align="center">
  <h3 align="center">coverage-diff-cli</h3>

  <p align="center">
     🚦 command line tool to report diff coverage 🚦
    <br />
    <a href="https://github.com/gagoar/coverage-diff-cli#table-of-contents"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/gagoar/coverage-diff-cli/issues">Report Bug</a>
    ·
    <a href="https://github.com/gagoar/coverage-diff-cli/issues">Request Feature</a>
  </p>
</p>

## Table of Contents

- [Built With](#built-with)
- [Installation](#installation)

  - [NPX](#npx)
  - [NPM](#npm-global)
  - [YARN](#yarn-global)
  - [Binary](#binary)

- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Installation

### NPX

```bash
   npx coverage-diff-cli results --baseLocation <base_summary.json> --headLocation <head_summary.json>
```

### NPM (global)

```bash
  npm -g install coverage-diff-cli

  npm run coverage-diff-cli results --baseLocation <base_summary.json> --headLocation <head_summary.json>
```

### YARN (global)

```bash
  yarn global add coverage-diff-cli

  coverage-diff-cli results --baseLocation <base_summary.json> --headLocation <head_summary.json>
```

### Binary

If you don't want any dependencies, you can use the binary directly.

Head over to [releases](https://github.com/gagoar/coverage-diff-cli/releases/latest) and pick the binary for LINUX, MACOSX and WINDOWS.

## Getting Started

This cli exposes 3 main functionalities coming directly from [coverage-dff](https://github.com/flaviusone/coverage-diff) project.

the `base` and `head` parameters are a standard output from istanbul code coverage tool called [json-summary](https://istanbul.js.org/docs/advanced/alternative-reporters/#json-summary).

> if you are using jest (that comes already with istanbul inside) you can just specify the `--coverageReporters` via [command line](https://jestjs.io/docs/en/cli) or via the [configuration](https://jestjs.io/docs/en/23.x/configuration#coveragereporters-arraystring).

```bash
Usage: coverage-diff-cli [options] [command]

🚦 command line tool to report diff coverage 🚦

Options:
  -V, --version                                           output the version number
  -b --baseLocation <path/to/the/base/json-summary.json>  The base summary (frequently on master/main branch), for more details: https://istanbul.js.org/docs/advanced/alternative-reporters/#json-summary
  -h --headLocation <path/to/the/head/json-summary.json>  The head summary (frequently coming from changes in a PR), for more details:
                                                          https://istanbul.js.org/docs/advanced/alternative-reporters/#json-summary
  --help                                                  display help for command

Commands:
  diff                                                    It will return a diff (json format) between base and head summary diffs
  regression                                              It will exit with 0 or 1 if was a regression or not
  results                                                 It will display a markdown table with the differential and regressions
  help [command]                                          display help for command
```

### Diff

It will return a json object displaying the differential between these 2 summaries. (you can see the type of the response [ICoverageSummary](#diff-response-type))

```bash
  npx coverage-diff diff --baseLocation <base_summary.json> --headLocation <head_summary.json>
```

### Regression

The command line will exit with `1` if there has been a regression, useful when trying to request changes on a PR.

```bash
  npx coverage-diff regression --base --baseLocation <base_summary.json> --headLocation <head_summary.json>
```

### Results

Visual output of results. (markdown). Ideal for posting directly in github PR.

```bash
  npx coverage-diff results --baseLocation <base_summary.json> --headLocation <head_summary.json>
```

It will produce an output such as this:

|     | Ok                     | File             | Lines            | Branches      | Functions        | Statements |
| --- | ---------------------- | ---------------- | ---------------- | ------------- | ---------------- | ---------- |
| ✅  | /absolute/path/file.ts | 100%<br>(+5.41%) | 100%<br>(+9.09%) | 100%<br>(+0%) | 100%<br>(+5.41%) |

Total:

| Lines        | Branches     | Functions | Statements   |
| ------------ | ------------ | --------- | ------------ |
| 100%(+3.51%) | 100%(+9.09%) | 100%(+0%) | 100%(+3.39%) |

## Details

### Diff response type

the diff action on the cli will return a json response of the following shape:

```typescript
export interface ICoverageSummary {
  lines: ICoverageInfo;
  statements: ICoverageInfo;
  functions: ICoverageInfo;
  branches: ICoverageInfo;
}

export interface ICoverageInfo {
  total: number;
  covered: number;
  skipped: number;
  pct: number;
}
```

## Built With

- [coverage-dff](https://github.com/flaviusone/coverage-diff)
- [esbuild](https://github.com/evanw/esbuild)
- [jest](https://github.com/facebook/jest)
- [ora](https://github.com/sindresorhus/ora)
- [commander](https://github.com/tj/commander.js)

## Contributing

Contributions are what makes the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.
