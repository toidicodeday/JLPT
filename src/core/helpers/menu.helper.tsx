import React from 'react'
import IRoute from '../../core/objects/IRoute'
import { Link } from 'react-router-dom'
import Icon from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { checkPath } from '@/utils/helpers/convert.helper'
import { sample, times } from 'lodash'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const CustomIcon = (component: any) => {
  if (component) {
    return (
      <Icon
        component={component}
        style={{ fontSize: '20px', color: '#2192FF' }}
      />
    )
  } else {
    return null
  }
}

export const createMenu = (route: IRoute, parent: string = ''): MenuItem => {
  const isHaveChild =
    route.children &&
    route.children?.filter((item: IRoute) => !item.hidden).length > 0

  const menuPath = checkPath(`${parent}${route.path}`)

  if (isHaveChild) {
    return getItem(
      route.name,
      route.key,
      CustomIcon(route.icon),
      route.children
        ?.map(iRoute => createMenu(iRoute, menuPath))
        .filter(i => i),
    )
  }
  if (!route.hidden && route.path) {
    return getItem(
      <Link to={menuPath}>{route.name}</Link>,
      route.key,
      CustomIcon(route.icon),
    )
  }
  return null
}

export const createMenus = (routes: IRoute[]) => {
  return routes.map(route => createMenu(route, '')).filter(i => i)
}
export const getMenyKeyFromPath = (routes: IRoute[], currentPath: string) => {
  try {
    let finalRoute: any
    const filterRoute = routes.filter(i => i.path !== '/')
    const homeRoute = routes.find(i => i.path === '/')

    const firstRoute = filterRoute.find(route =>
      currentPath.startsWith(route.path),
    )

    finalRoute = firstRoute

    if (firstRoute?.children?.length) {
      const newPath = currentPath.substring(firstRoute.path.length)

      const secondRoute = firstRoute?.children.find(route =>
        newPath.startsWith(route.path),
      )
      if (secondRoute) finalRoute = secondRoute
    }

    if (!firstRoute) finalRoute = homeRoute

    return finalRoute.key
  } catch (error) {
    return ''
  }
}

export const generateRandomString = (len: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const result = times(len)
    .map(() => sample(characters.split('')))
    .join('')
  return result
}
