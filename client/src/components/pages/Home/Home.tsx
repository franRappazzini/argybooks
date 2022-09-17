import "./Home.scss";

import CardHomeContainer from "../../organisms/CardHomeContainer/CardHomeContainer";
import SearchBar from "../../molecules/SearchBar/SearchBar";

function Home() {
  return (
    <main className="home_component component max_width">
      <SearchBar />
      Home
      <CardHomeContainer />
    </main>
  );
}

export default Home;
