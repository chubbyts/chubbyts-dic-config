import { Container } from '@chubbyts/chubbyts-dic-types/dist/container';
import { ConcreteContainer, createContainer, createParameter, Factory } from '@chubbyts/chubbyts-dic/dist/container';

type ContainerByConfigFactory = (concreteContainer?: ConcreteContainer) => ConcreteContainer;

export type ConfigFactory = (container: Container, name: string) => unknown;
export type ConfigDelegator = (container: Container, name: string, factory: Factory) => unknown;

type Config = {
  dependencies?: {
    services?: Map<string, unknown>;
    factories?: Map<string, ConfigFactory>;
    aliases?: Map<string, string>;
    delegators?: Map<string, Array<ConfigDelegator>>;
  };
  [x: string]: unknown;
};

const addServices = (concreteContainer: ConcreteContainer, services: Map<string, unknown>): void => {
  services.forEach((service: unknown, name: string) => {
    concreteContainer.set(name, () => {
      return service;
    });
  });
};

const addFactories = (concreteContainer: ConcreteContainer, factories: Map<string, ConfigFactory>) => {
  factories.forEach((factory: ConfigFactory, name: string) => {
    concreteContainer.set(name, (container: Container): unknown => {
      return factory(container, name);
    });
  });
};

const addAliases = (concreteContainer: ConcreteContainer, aliases: Map<string, string>): void => {
  aliases.forEach((target: string, name: string) => {
    concreteContainer.set(name, (container: Container): unknown => {
      return container.get(target);
    });
  });
};

const addDelegators = (
  concreteContainer: ConcreteContainer,
  delegators: Map<string, Array<ConfigDelegator>>,
  services: Map<string, any>,
  aliases: Map<string, string>,
): void => {
  delegators.forEach((delegatorList: Array<ConfigDelegator>, name: string) => {
    if (services.has(name) || aliases.get(name)) {
      return;
    }

    delegatorList.forEach((delegator: ConfigDelegator) => {
      concreteContainer.set(name, (container: Container, previous?: Factory): unknown => {
        if (!previous) {
          throw new Error('Missing previous');
        }

        return delegator(container, name, () => {
          return previous(container);
        });
      });
    });
  });
};

export const createContainerByConfigFactory = (config: Config): ContainerByConfigFactory => {
  return (concreteContainer: ConcreteContainer = createContainer()): ConcreteContainer => {
    concreteContainer.set('config', createParameter(config));

    const dependencies = config.dependencies;

    if (undefined === dependencies) {
      return concreteContainer;
    }

    const services = dependencies.services || new Map<string, any>();
    const factories = dependencies.factories || new Map<string, ConfigFactory>();
    const aliases = dependencies.aliases || new Map<string, string>();
    const delegators = dependencies.delegators || new Map<string, Array<ConfigDelegator>>();

    addServices(concreteContainer, services);
    addFactories(concreteContainer, factories);
    addAliases(concreteContainer, aliases);
    addDelegators(concreteContainer, delegators, services, aliases);

    return concreteContainer;
  };
};
