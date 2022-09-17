import "./CustomLink.scss";

import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ILink {
  to: string;
  color: string;
  text: string;
}

function CustomLink({ to, color, text }: ILink) {
  const navigate = useNavigate();

  return (
    <Link underline="hover" color={color} onClick={() => navigate(to)} className="custom_link">
      {text}
    </Link>
  );
}

export default CustomLink;
