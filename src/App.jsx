
import { useEffect, useState } from "react";
import ArticleList from "../ArticleList";
import { fetchArticlesWithTopic } from "./components/articles-api.js"
import { SearchForm } from "./components/SearchForm.jsx";


export function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
		// 2. Використовуємо HTTP-функцію
		const data = await fetchArticlesWithTopic("react");
        setArticles(data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const handleSearch = async (topic) => {
   try {
    setArticles([]);//це setArticles([]), за допомогою якого ми спеціально очищаємо стан articles перед новим запитом, щоб припинити відображення "старого" списку посилань.
    setError(false); // це setError(false), щоб скинути помилку перед наступним запитом, на випадок, якщо вона була у попередньому запиті.
    setLoading(true);
    const data = await fetchArticlesWithTopic(topic);
    setArticles(data);
   }catch{
    setError(true);
   }finally{
    setLoading(false);
   }
  };

	return (
    <div>
      <span>
      <h1>Latest articles</h1>
    <SearchForm onSearch={handleSearch} />
    {loading && <p style={{ fontSize: 20 }}>Loading data, please wait...</p>}
    {error && <Error />}
    {articles.length > 0 && <ArticleList items={articles} />}
  </span>
  <span>
     
      {loading && <p style={{ fontSize: 20 }}>Loading data, please wait...</p>}
      {error && (
        <p style={{ fontSize: 20, color: 'red' }}>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {articles.length > 0 && <ArticleList items={articles} />}
      </span>
    </div>
  );
};

export default App;

