/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module '*.graphql' {
  import {DocumentNode} from 'graphql';

  const value: DocumentNode;
  export = value;
}