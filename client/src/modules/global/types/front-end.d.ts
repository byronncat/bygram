export interface ReactProps {
  readonly children?: React.ReactNode
  readonly className?: HTMLProps<HTMLElement>['className'] | string
  readonly zIndex?: number
  readonly onClick?: (e: React.MouseEvent) => void
  readonly onExit?: () => void
}

export type ToastTypeStrings =
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'loading'

export type SidebarOptionStrings =
  | 'home'
  | 'search'
  | 'explore'
  | 'create post'
  | 'profile'
  | 'logout'
