declare module '*.json' {
  const content: string
  // eslint-disable-next-line import/no-default-export
  export default content
}

declare type Address = string
