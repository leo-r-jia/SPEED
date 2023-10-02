import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import axios from "axios";
import styles from "./Articles.module.scss";

interface ArticlesInterface {
    id: string;
    title: string;
    authors: string;
    source: string;
    publication_year: string;
    doi: string;
    claim: string;
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
        { key: "claim", label: "Claim" },
    ];

    return (
        <div>
            <h1>SPEED Articles</h1>
            <p>Search Placeholder</p>
            <SortableTable headers={headers} data={articles} />
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