// moderator.tsx

import { GetStaticProps, NextPage } from "next";
import data from "../../utils/dummydata.json";
import ModeratorSortableTable from "../../components/table/ModeratorSortableTable";
import { useState } from "react";
import axios from "axios";
import ColumnDropdown from "./ColumnDropdown"; 

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
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "publication_year", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "SE_practice", label: "SE Practice" }, 
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Result of Evidence" },
  ];

  const defaultColumnVisibility: Record<keyof ArticlesInterface, boolean> = {
    id: true,
    title: true,
    authors: true,
    source: true,
    publication_year: true,
    doi: true,
    SE_practice: true,
    claim: true,
    evidence: true,
  };

  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    ...Object.keys(defaultColumnVisibility), 
  ]);
  
  return (
    <div className="container">
      <h1>SPEED Moderator Dashboard</h1>

      <ColumnDropdown
        options={headers.map((header) => ({
          key: header.key,
          label: header.label,
        }))}
        selectedOptions={selectedColumns}
        onSelect={(selected) => setSelectedColumns(selected)}
      />

      <ModeratorSortableTable
        headers={headers.filter((header) => selectedColumns.includes(header.key))}
        data={articles}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async (_) => {

    // Map the data to ensure all articles have consistent property names 

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

