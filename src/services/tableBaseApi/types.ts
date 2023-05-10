export type FilterFieldsType = {
  filterType: 'normal' | 'other'
  type: string
  searchKey: string
  placeholder?: string
  width: number
  options?: FilterOptionType[]
}

export type FilterOptionType = {
  id?: string | number
  label?: string
  value?: string | number
  isSelected?: boolean
}

export type FilterTabOptionType = {
  value?: number | string
  icon?: any
  label?: string
  isSearching?: boolean
  totalCounted?: number
  isCountingTotal?: boolean
}

export type FilterTabsType = {
  type?: string
  searchKey?: string
  opt?: string
  options?: FilterTabOptionType[]
}

export type SortOptionType = {
  id: 'desc' | 'asc'
  sort: 'desc' | 'asc'
  label: string
  isSelected: boolean
}

export type SortFieldType = {
  sortBy: string
  options: SortOptionType[]
}
