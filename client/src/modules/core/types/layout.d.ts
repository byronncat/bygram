export interface MenuItem {
  name: string;
  function?: (...args: any) => any;
  functionHandler: (...args: any) => any;
}

export interface SidebarLink {
  name: SidebarBtn;
  icon: any;
  path: string;
  notActive?: boolean;
  onClick?: () => void;
  onExit?: () => void;
}
