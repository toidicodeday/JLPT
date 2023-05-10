export type FilterItem = {
  type: 'normal' | 'other'
  searchKey: string
  opt: string
  value: any
}

export type FilterTabOption = {
  value?: any
  icon?: JSX.Element
  label?: string
  isSearching?: boolean
}

export type FilterTabs = {
  searchKey?: string
  opt?: string
  options?: FilterTabOption[]
}
