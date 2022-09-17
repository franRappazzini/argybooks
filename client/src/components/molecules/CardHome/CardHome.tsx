import "./CardHome.scss";

import { BookHome } from "../../../utils/interfaces";
import { Link } from "react-router-dom";

function CardHome({ id, image, name }: BookHome) {
  return (
    <Link
      to={`/book/${id}`}
      className="card_home"
      // style={{ backgroundImage: `url(${image})` }}
    >
      <img src={image} alt={name} />
    </Link>
  );
}

export default CardHome;
