import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SearchContent from "../../components/SearchContent/SeachContent";
import { useParams } from 'react-router-dom';


const Search = () => {
  const { query } = useParams();

  return (
    <>
      <Header />
      <SearchContent query={query} />
      <Footer />
    </>
  );
};

export default Search;