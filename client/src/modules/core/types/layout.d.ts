export interface MenuItem {
  name: string;
  function?: (...args: any) => any;
  functionHandler: (...args: any) => any;
}
