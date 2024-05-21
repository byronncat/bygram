import React, { HTMLProps } from 'react';

export interface ReactProps {
  readonly children?: React.ReactNode | JSX.Element;
  readonly className?: HTMLProps<HTMLElement>['className'] | string;
  readonly zIndex?: number;
  readonly onClick?: (e: React.MouseEvent) => void;
  readonly onExit?: () => void;
}
