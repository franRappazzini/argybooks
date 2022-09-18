import "./Home.scss";

import CardHomeContainer from "../../organisms/CardHomeContainer/CardHomeContainer";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import SearchBar from "../../molecules/SearchBar/SearchBar";

function Home() {
  return (
    <main className="home_component component">
      {/* <SearchBar /> */}
      <CustomLink to="/books" text="Buscar libros" color="primary" />
      Home
      <CardHomeContainer />
    </main>
  );
}

export default Home;
