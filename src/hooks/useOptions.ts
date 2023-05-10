import { SelectOptionType } from '@/services/commonResposntType'
import { forEach } from 'lodash'

type Props = {
  apiOptions: SelectOptionType[] | undefined
  searchValue: string
  initSelected: SelectOptionType[]
  // firstValue: number | string
  // firstLabel: string | undefined
}

const useOptions = ({ apiOptions, searchValue, initSelected }: Props) => {
  if (!apiOptions) return []
  if (searchValue) return apiOptions

  let notFoundOptions: SelectOptionType[] = []
  initSelected.forEach(({ label, value }) => {
    const result = apiOptions.findIndex(item => item.value === value)

    if (result < 0) notFoundOptions.push({ label, value })
  })
  return [...notFoundOptions, ...apiOptions]
}

export default useOptions
