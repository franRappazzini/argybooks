import "./CustomLink.scss";

import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ILink {
  to: string;
  color: string;
  text: string;
  underline?: "none" | "always" | "hover";
  onClick?: () => void;
  state?: string;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "inherit";
}

function CustomLink({ to, color, text, underline, onClick, state, variant }: ILink) {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick?.();
    navigate(to, { state: { value: state } });
  };

  return (
    <Link
      variant={variant ? variant : "body1"}
      underline={underline ? underline : "hover"}
      color={color}
      onClick={handleClick}
      className="custom_link"
    >
      {text}
    </Link>
  );
}

export default CustomLink;
