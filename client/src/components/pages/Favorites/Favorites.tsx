import "./Favorites.scss";

import CardBook from "../../molecules/CardBook/CardBook";
import { CompleteBook } from "../../../utils/interfaces";
import { FavoriteHook } from "../../../utils/customHooks";

function Favorites() {
  const { favorites } = FavoriteHook();

  return (
    <main className="favorites_component component">
      <section className="favorites_container max_width">
        {favorites.length > 0 ? (
          // TODO falta incluir el author.name
          favorites.map((b: CompleteBook) => <CardBook key={b.id} {...b} />)
        ) : (
          <p>No tienes favoritos actualmente, agrega algunos y los veras a aquí</p>
        )}
      </section>
    </main>
  );
}

export default Favorites;
