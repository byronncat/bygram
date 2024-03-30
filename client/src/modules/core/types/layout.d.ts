export interface MenuItem {
  name: string;
  function?: (...args: any) => any;
  functionHandler: (...args: any) => any;
}

export interface SidebarLink {
  name: SidebarBtn;
  icon: string;
  path: string;
  notActive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onExit?: () => void;
}
