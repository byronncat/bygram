import React, { HTMLProps } from 'react'

export interface ReactProps {
  readonly children?: React.ReactNode
  readonly className?: HTMLProps<HTMLElement>['className'] | string
  readonly zIndex?: number
  readonly onClick?: (e: React.MouseEvent) => void
  readonly onExit?: () => void
}

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
  LOADING = 'loading',
}
export type ToastTypeStrings = `${ToastType}`

export enum SidebarOption {
  HOME = 'home',
  SEARCH = 'search',
  EXPLORE = 'explore',
  CREATE_POST = 'create post',
  PROFILE = 'profile',
  LOGOUT = 'logout',
}
export type SidebarOptionStrings = `${SidebarOption}`
