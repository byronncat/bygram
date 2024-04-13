import { HTMLProps } from 'react';

export interface ReactProps {
  children?: React.ReactNode;
  className?: HTMLProps<HTMLElement>['className'] | string;
  zIndex?: number;
  onClick?: (e: React.MouseEvent) => void;
  onExit?: () => void;
}

export type AuthenticationStorage = {
  isAuthenticated: boolean;
  user: UserToken | null;
};

export interface API {
  success: boolean;
  message: string;
}

export type ToastTypeStrings = 'success' | 'error' | 'info' | 'warning' | 'loading';

export type SidebarBtnStrings =
  | 'home'
  | 'search'
  | 'explore'
  | 'create post'
  | 'profile'
  | 'logout';
