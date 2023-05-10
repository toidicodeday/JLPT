export function addAllOps(opsArr: any) {
  if (opsArr?.length === 0) {
    return [
      {
        id: 'all',
        value: 'all',
        label: 'Chọn tất cả',
        isSelected: true,
      },
      ...opsArr?.map((item: any) => ({
        id: item?.value,
        value: item?.value,
        label: item?.label,
        isSelected: false,
      })),
    ]
  } else {
    return [
      {
        id: 'all',
        value: 'all',
        label: 'Chọn tất cả',
        isSelected: true,
      },
    ]
  }
}
