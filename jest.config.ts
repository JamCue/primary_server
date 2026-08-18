import {pathsToModuleNameMapper} from 'ts-jest';
// @ts-ignore
import {compilerOptions} from './tsconfig.json';
import type {JestConfigWithTsJest} from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {isolatedModules: true}],
  },
  collectCoverage: true,
  collectCoverageFrom: ['./src/(services|mappers)/**/*.ts'],
  testPathIgnorePatterns: ['/build'],
  roots: ['<rootDir>'],
  // modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/',
}),
  maxConcurrency: 2
};

export default jestConfig;
