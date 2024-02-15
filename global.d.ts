declare module 'next/config' {
  type ConfigTypes = () => {
    // publicRuntimeConfig: {};
    serverRuntimeConfig: {
      questionsDirectory: string;
    };
  };

  declare const getConfig: ConfigTypes;

  export default getConfig;
}
