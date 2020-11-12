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
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

This cli exposes 3 main functionalities coming directly from [coverage-dff](https://github.com/flaviusone/coverage-diff) project.

the `base` and `head` parameters are a standard output from istanbul code coverage tool called [json-summary](https://istanbul.js.org/docs/advanced/alternative-reporters/#json-summary).

> if you are using jest (that comes already with istanbul inside) you can just specify the `--coverageReporter` via [command line](https://jestjs.io/docs/en/cli) or via the [configuration](https://jestjs.io/docs/en/23.x/configuration#coveragereporters-arraystring).

### Diff

It will return a json object displaying the differential between these 2 summaries. (you can see the type of the response [ICoverageSummary](#diff-response-type))

```bash
  coverage-diff diff --base <base_summary.json> --head <head_summary.json>
```

### Regression

The command line will exit with 1 if there has been a regression, useful when trying to request changes on on a PR.

```bash
  coverage-diff regression --base --base <base_summary.json> --head <head_summary.json>
```

### Results

visual output of the results.

```bash
  coverage-diff results --base --base <base_summary.json> --head <head_summary.json>
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

- [esbuild](https://github.com/evanw/esbuild)
- [coverage-dff](https://github.com/flaviusone/coverage-diff)
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
