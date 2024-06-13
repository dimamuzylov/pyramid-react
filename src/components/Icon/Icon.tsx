import { HTMLAttributes, createElement } from 'react';
import { icons } from './icons';

export type IconName = keyof typeof icons;
type IconProps = HTMLAttributes<HTMLDivElement> & {
  icon: IconName;
};

function Icon(props: IconProps) {
  return (
    <div
      className={`${props.className} flex items-center justify-center`}
      aria-label={props.icon}
      role='img'
      {...props}
    >
      {createElement(icons[props.icon], {
        style: { width: '100%', height: '100%' },
      })}
    </div>
  );
}

export default Icon;
