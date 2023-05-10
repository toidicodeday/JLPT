import React from 'react'
import IRoute from '../objects/IRoute'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

export const createBreadCrumb = (
  data: IRoute[],
  url: string,
  parent: string = '',
): any => {
  let result: any = []
  let urlData: any[] = url.split('/')

  if (urlData[2] === '') {
    urlData.pop()
  }
  let i = 0
  let parentpath = parent
  let dataTemp: any = data
  let mainBread: any
  while (i < urlData.length) {
    let path = `/${urlData[i]}`
    mainBread = dataTemp.filter((x: IRoute) => {
      return x.path === path
    })

    if (mainBread.length > 0) {
      result.push(
        <Breadcrumb.Item key={mainBread[0].path}>
          <Link to={`${parentpath}${mainBread[0].path}`}>
            {mainBread[0].name}
          </Link>
        </Breadcrumb.Item>,
      )

      if (mainBread.length > 0 && mainBread[0].children) {
        dataTemp = mainBread[0].children
        parentpath += mainBread[0].path
      }
    }
    i++
  }

  return { breadcrumbItems: result, pageInfos: mainBread[0] }
}
