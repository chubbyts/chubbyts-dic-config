import { Container } from '@chubbyts/chubbyts-dic-types/dist/container';
import { ConfigDelegator, ConfigFactory } from '../src/dic-config';

export class Invokable1 {
  public key1?: string;
  public key2?: string;
  public key3?: string;
}

export class Invokable2 {
  public key?: string;
}

export const delegator1: ConfigDelegator = (container: Container, name: string, factory: Function) => {
  const invokable1: Invokable1 = factory();

  invokable1.key1 = 'value1';

  return invokable1;
};

export const delegator2: ConfigDelegator = (container: Container, name: string, factory: Function) => {
  const invokable1: Invokable1 = factory();

  invokable1.key2 = 'value2';

  return invokable1;
};

export const delegator3: ConfigDelegator = (container: Container, name: string, factory: Function) => {
  const invokable1: Invokable1 = factory();

  invokable1.key3 = 'value3';

  return invokable1;
};

export const factory1: ConfigFactory = () => {
  return new Invokable1();
};

export const factory2: ConfigFactory = () => {
  return new Invokable2();
};
