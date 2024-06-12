import { Button as NextUiButton, ButtonProps } from '@nextui-org/button';
import './Button.css';
import { postEvent } from '@tma.js/sdk-react';

function Button(props: ButtonProps) {
  return (
    <NextUiButton
      {...props}
      disableRipple
      onPress={(e) => {
        postEvent('web_app_trigger_haptic_feedback', {
          type: 'impact',
          impact_style: 'soft',
        });
        props.onPress?.(e);
      }}
      className={`text-center h-15 ${props.className || ''} ${props.variant}`}
    >
      {props.children}
    </NextUiButton>
  );
}

export default Button;
