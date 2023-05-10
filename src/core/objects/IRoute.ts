export default interface IRoute {
  path: string
  name: string
  key: string
  component?: any
  children?: IRoute[]
  hidden?: boolean
  icon?: any
  redirect?: string
  accessKey?: string
}
