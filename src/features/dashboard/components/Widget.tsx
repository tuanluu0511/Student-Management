import React from 'react';
import './Widget.scss';

export interface WidgetProps {
  title: string;

  children: any;
}

export default function Widget({ title, children }: WidgetProps) {
  return (
    <div className="widget__container">
      <h4 className="widget__container--title">{title}</h4>
      <div className="widget__container--box">{children}</div>
    </div>
  );
}
