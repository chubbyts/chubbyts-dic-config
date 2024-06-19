import { createContainer } from '@chubbyts/chubbyts-dic/dist/container';
import { describe, expect, test } from 'vitest';
import type { ConfigDelegator, ConfigFactory } from '../src/dic-config';
import { createContainerByConfigFactory } from '../src/dic-config';
import { delegator1, delegator2, delegator3, factory1, factory2, Invokable1, Invokable2 } from './assets';

describe('createContainerByConfigFactory', () => {
  test('without dependencies', () => {
    const config = { key: 'value' };

    const containerByConfigFactory = createContainerByConfigFactory(config);

    const container = containerByConfigFactory();

    expect(container.has('config')).toBe(true);
    expect(container.get('config')).toBe(config);
  });

  test('test service', () => {
    const service1 = new Invokable1();
    const service2 = new Invokable2();

    const container = createContainer();
    container.set('name1', () => service1);

    const containerByConfigFactory = createContainerByConfigFactory({
      dependencies: {
        services: new Map<string, unknown>().set('name2', service2),
      },
    });

    containerByConfigFactory(container);

    expect(container.has('name1')).toBe(true);
    expect(container.has('name2')).toBe(true);

    expect(container.get('name1')).toBe(service1);
    expect(container.get('name2')).toBe(service2);
  });

  test('test factories', () => {
    const containerByConfigFactory = createContainerByConfigFactory({
      dependencies: {
        factories: new Map<string, ConfigFactory>().set(Invokable1.name, factory1).set(Invokable2.name, factory2),
      },
    });

    const container = containerByConfigFactory();

    expect(container.has(Invokable1.name)).toBe(true);
    expect(container.has(Invokable2.name)).toBe(true);

    expect(container.get(Invokable1.name)).toBeInstanceOf(Invokable1);
    expect(container.get(Invokable2.name)).toBeInstanceOf(Invokable2);
  });

  test('test aliases', () => {
    const containerByConfigFactory = createContainerByConfigFactory({
      dependencies: {
        factories: new Map<string, ConfigFactory>().set(Invokable1.name, factory1),
        aliases: new Map<string, string>().set('name1', Invokable1.name).set('name2', Invokable1.name),
      },
    });

    const container = containerByConfigFactory();

    expect(container.has('name1')).toBe(true);
    expect(container.has('name2')).toBe(true);

    expect(container.get(Invokable1.name)).toBe(container.get('name1'));
    expect(container.get(Invokable1.name)).toBe(container.get('name2'));

    expect(container.get('name1')).toBeInstanceOf(Invokable1);
    expect(container.get('name2')).toBeInstanceOf(Invokable1);
  });

  test('test delegators', () => {
    const containerByConfigFactory = createContainerByConfigFactory({
      dependencies: {
        services: new Map<string, unknown>().set('name2', new Invokable1()),
        factories: new Map<string, ConfigFactory>().set(Invokable1.name, factory1),
        aliases: new Map<string, string>().set('name1', Invokable1.name),
        delegators: new Map<string, Array<ConfigDelegator>>()
          .set('name2', [delegator1, delegator2])
          .set(Invokable1.name, [delegator1, delegator2])
          .set('name1', [delegator3]),
      },
    });

    const container = containerByConfigFactory();

    expect(container.has('name2')).toBe(true);
    expect(container.has(Invokable1.name)).toBe(true);
    expect(container.has('name1')).toBe(true);

    const service1: Invokable1 = container.get(Invokable1.name);

    expect(service1).toBe(container.get('name1'));

    expect(service1.key1).toBe('value1');
    expect(service1.key2).toBe('value2');
    expect(service1.key3).toBe(undefined);

    const service2: Invokable1 = container.get('name2');

    expect(service2.key1).toBe(undefined);
    expect(service2.key2).toBe(undefined);
    expect(service1.key3).toBe(undefined);
  });

  test('test delegators missing factory', () => {
    const containerByConfigFactory = createContainerByConfigFactory({
      dependencies: {
        delegators: new Map<string, Array<ConfigDelegator>>().set(Invokable1.name, [delegator1, delegator2]),
      },
    });

    const container = containerByConfigFactory();

    try {
      container.get(Invokable1.name);
      fail('Expected error');
    } catch (e) {
      const { name, message, cause } = e as Error & { cause: Error };
      expect(name).toBe('Error');
      expect(message).toBe('Could not create service with id "Invokable1"');
      expect(cause.message).toBe('Missing previous');
    }
  });
});
