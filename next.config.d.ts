declare module 'next/config' {
  type ConfigTypes = () => {
    basePath: string;
    // publicRuntimeConfig: {};
    serverRuntimeConfig: {
      questionsDirectory: string;
    };
  };

  declare const getConfig: ConfigTypes;

  export default getConfig;
}
