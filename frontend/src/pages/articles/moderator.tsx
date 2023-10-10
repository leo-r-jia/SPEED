// moderator.tsx

import { GetStaticProps, NextPage } from "next";
import data from "../../utils/dummydata.json";
import ModeratorSortableTable from "../../components/table/ModeratorSortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import ColumnDropdown from "./ColumnDropdown";
import styles from "./ModeratorView.module.scss";
import SearchBar from "@/components/search/SearchBar";

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  publication_year: string;
  doi: string;
  SE_practice: string;
  claim: string;
  evidence: string;
  approved: boolean;
  rejected: boolean;
  submission_date: string;
  moderatorApproved: boolean; 
  analystApproved: boolean; 
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles: initialArticles }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState<"title" | "authors" | "source">("title");
  const [articles, setArticles] = useState(initialArticles); // Store articles in state


  const approvedArticles = articles.filter(
    (article) => article.analystApproved === true && article.moderatorApproved === true
  );
    const rejectedArticles = articles.filter(article => article.rejected === true);
    const submittedArticles = articles.filter(
      (article) =>
        article.analystApproved === false &&
        article.moderatorApproved === false &&
        article.rejected === false
    );

    const analystQueueArticles = articles.filter(
      (article) =>
        article.analystApproved === false &&
        article.moderatorApproved === true &&
        article.rejected === false
    );
  const [activeTab, setActiveTab] = useState('submitted');


  const filterBySearchValue = (articleList: ArticlesInterface[]) => {
    return articleList.filter(article => {
      return String(article[searchBy]).toLowerCase().includes(searchValue.toLowerCase());
    });
  };
  

const filteredApprovedArticles = filterBySearchValue(approvedArticles);
const filteredRejectedArticles = filterBySearchValue(rejectedArticles);
const filteredSubmittedArticles = filterBySearchValue(submittedArticles);
const filteredanalystQueueArticles = filterBySearchValue(analystQueueArticles);
const filteredAllArticles = filterBySearchValue(articles);

  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "id", "title", "authors", "source", "publication_year",
    "doi", "SE_practice", "claim", "evidence", "approved", "rejected", "submission_date"
  ]);

  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "publication_year", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "SE_practice", label: "SE Practice" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Result of Evidence" },
    { key: "submission_date", label: "Submission Date" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all articles from the API endpoint without filtering
        const response = await axios.get(
          "https://speed-backend-git-testing-leo-r-jia.vercel.app/api/articles"
          //"http://localhost:3001/api/articles"
        );
  
        // Extract the articles from the API response data
        const articles: ArticlesInterface[] = response.data;
  
        // Update the state with all articles
        setArticles(articles);
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    };
  
    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty dependency array ensures this useEffect runs once on mount
  

  return (
    <div className={styles.container}>
      <h1>SPEED Moderator Dashboard</h1>
      <SearchBar
        value={searchValue}
        onChange={setSearchValue}
        searchBy={searchBy}
        onSearchByChange={setSearchBy}
      />
      <ColumnDropdown
        options={headers.map((header) => ({
          key: header.key,
          label: header.label,
        }))}
        selectedOptions={selectedColumns}
        onSelect={(selected) => setSelectedColumns(selected)}
      />

      <button onClick={() => setActiveTab('submitted')}>Submitted</button>
      <button onClick={() => setActiveTab('analystQueue')}>Analyst Queue</button>
      <button onClick={() => setActiveTab('approved')}>Approved</button>
      <button onClick={() => setActiveTab('rejected')}>Rejected</button>
      <button onClick={() => setActiveTab('all')}>All</button>

      {activeTab === 'submitted' && (
        <ModeratorSortableTable
          headers={headers.filter((header) => selectedColumns.includes(header.key))}
          data={filteredSubmittedArticles}
        />
      )}
      {activeTab === 'analystQueue' && (
      <ModeratorSortableTable
        headers={headers.filter((header) => selectedColumns.includes(header.key))}
        data={filteredanalystQueueArticles}
      />
      )}
      {activeTab === 'approved' && (
        <ModeratorSortableTable
          headers={headers.filter((header) => selectedColumns.includes(header.key))}
          data={filteredApprovedArticles}
        />
      )}
      {activeTab === 'rejected' && (
        <ModeratorSortableTable
          headers={headers.filter((header) => selectedColumns.includes(header.key))}
          data={filteredRejectedArticles}
        />
      )}
      {activeTab === 'all' && (
        <ModeratorSortableTable
          headers={headers.filter((header) => selectedColumns.includes(header.key))}
          data={filteredAllArticles}
        />
      )}
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

    return {
      props: {
        articles,
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