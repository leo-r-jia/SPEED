import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import axios from "axios";
import styles from "./UserView.module.scss";
import { useState, useEffect } from "react";
import SearchBar from "../../components/search/SearchBar";

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  publication_year: string;
  doi: string;
  SE_practice: string;
  claim: string;
  averageRating: string;
  approved: boolean;
  analystApproved: boolean; 
  moderatorApproved: boolean;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles: initialArticles }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState<"title" | "authors" | "source">("title");

  const [articles, setArticles] = useState(initialArticles); // Store articles in state


  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "title",
    "authors",
    "source",
    "publication_year",
    "doi",
    "SE_practice",
    "claim",
    "averageRating",
  ]);

  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "publication_year", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "SE_practice", label: "SE Practice" },
    { key: "claim", label: "Claim" },
    { key: "averageRating", label: "Rating" },
  ];

  const filteredArticles = articles.filter((article) => {
    return String(article[searchBy])
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  });

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch articles from the API endpoint
        const response = await axios.get(
          "https://speed-backend-git-testing-leo-r-jia.vercel.app/api/articles"
        );

        // Extract the articles from the API response data
        const articles: ArticlesInterface[] = response.data;

        // Filter the articles to only include approved ones
        const approvedArticles = articles.filter(
          (article) => article.analystApproved === true && article.moderatorApproved === true
        );

        setArticles(approvedArticles);
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty dependency array ensures this useEffect runs once on mount


  return (
    <div className={styles.container}>
      <h1>SPEED Articles</h1>
      <SearchBar
        value={searchValue}
        onChange={setSearchValue}
        searchBy={searchBy}
        onSearchByChange={setSearchBy}
      />

      <div className={styles.columnFilter}>
        {headers.map((header) => (
          <label key={header.key}>
            <input
              type="checkbox"
              checked={selectedColumns.includes(header.key)}
              onChange={() => {
                if (selectedColumns.includes(header.key)) {
                  setSelectedColumns(
                    selectedColumns.filter((col) => col !== header.key)
                  );
                } else {
                  setSelectedColumns([...selectedColumns, header.key]);
                }
              }}
            />
            {header.label}
          </label>
        ))}
      </div>

      <SortableTable
        headers={headers}
        data={filteredArticles}
        selectedColumns={selectedColumns}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async (_) => {
  try {
    // Fetch articles from the API endpoint
    const response = await axios.get(
      "https://speed-backend-git-testing-leo-r-jia.vercel.app/api/articles"
    );

    // Extract the articles from the API response data
    const articles: ArticlesInterface[] = response.data;

    // Filter the articles to only include approved ones
    const approvedArticles = articles.filter(
      (article) => article.analystApproved === true && article.moderatorApproved === true
    );

    return {
      props: {
        articles: approvedArticles,
      },
    };
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    return {
      props: {
        articles: [],
      },
    };
  }
};


export default Articles;
