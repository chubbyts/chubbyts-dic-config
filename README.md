# chubbyts-dic-config

[![CI](https://github.com/chubbyts/chubbyts-dic-config/workflows/CI/badge.svg?branch=master)](https://github.com/chubbyts/chubbyts-dic-config/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/chubbyts/chubbyts-dic-config/badge.svg?branch=master)](https://coveralls.io/github/chubbyts/chubbyts-dic-config?branch=master)
[![Infection MSI](https://badge.stryker-mutator.io/github.com/chubbyts/chubbyts-dic-config/master)](https://dashboard.stryker-mutator.io/reports/github.com/chubbyts/chubbyts-dic-config/master)
[![npm-version](https://img.shields.io/npm/v/@chubbyts/chubbyts-dic-config.svg)](https://www.npmjs.com/package/@chubbyts/chubbyts-dic-config)

[![bugs](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-dic-config&metric=bugs)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-dic-config)
[![code_smells](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-dic-config&metric=code_smells)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-dic-config)
[![coverage](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-dic-config&metric=coverage)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-dic-config)
[![duplicated_lines_density](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-dic-config&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-dic-config)
[![ncloc](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-dic-config&metric=ncloc)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-dic-config)
[![sqale_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-dic-config&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-dic-config)
[![alert_status](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-dic-config&metric=alert_status)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-dic-config)
[![reliability_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-dic-config&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-dic-config)
[![security_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-dic-config&metric=security_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-dic-config)
[![sqale_index](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-dic-config&metric=sqale_index)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-dic-config)
[![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-dic-config&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-dic-config)

## Description

Dependency injection container creation by config, inspired by [mezzio-config][2].

## Requirements

 * node: 14
 * [@chubbyts/chubbyts-dic][3]: ^1.0.2

## Installation

Through [NPM](https://www.npmjs.com) as [@chubbyts/chubbyts-dic-config][1].

```ts
npm i @chubbyts/chubbyts-dic-config@^1.0.2
```

## Usage

```ts
import {
  createContainerByConfigFactory,
  ConfigFactory,
  ConfigDelegator,
} from '@chubbyts/chubbyts-dic-config/dist/dic-config';

const containerByConfigFactory = createContainerByConfigFactory({
  dependencies: {
    services: new Map<string, any>(),
    factories: new Map<string, ConfigFactory>(),
    aliases: new Map<string, string>(),
    delegators: new Map<string, Array<ConfigDelegator>>(),
  },
  // ... other configuration
});

const container = containerByConfigFactory();
```

## Copyright

2023 Dominik Zogg

[1]: https://www.npmjs.com/package/@chubbyts/chubbyts-dic-config
[2]: https://docs.mezzio.dev/mezzio/v3/features/container/config/
[3]: https://www.npmjs.com/package/@chubbyts/chubbyts-dic
