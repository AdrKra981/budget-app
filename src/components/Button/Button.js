import { InlineButton, RegularButton } from "./ButtonStyles";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useMemo } from "react";

const Button = ({ variant, children, ...props }) => {
  const { to } = props;

  const Component = useMemo(() => {
    switch (variant) {
      case "inline":
        return InlineButton;
      case "regular":
        return RegularButton;

      default:
        return RegularButton;
    }
  }, [variant]);

  const content = useMemo(() => (
    <Component {...props}>{children}</Component>
  ), [props, children]);

  return to ? <Link {...props}>{content}</Link> : <>{content}</>;
};

Button.propTypes = {
    variant: PropTypes.oneOf(['inline', 'regular']),
}

export default Button;
