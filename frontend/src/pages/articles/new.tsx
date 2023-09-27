import { FormEvent, useState } from "react";
import formStyles from "../../styles/Form.module.scss";

const NewDiscussion = () => {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState<string[]>([]);
    const [source, setSource] = useState("");
    const [pubYear, setPubYear] = useState<number>(0);
    const [doi, setDoi] = useState("");
    const [summary, setSummary] = useState("");
    const [linkedDiscussion, setLinkedDiscussion] = useState("");

    // const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     console.log(
    //         JSON.stringify({
    //             title,
    //             authors,
    //             source,
    //             publication_year: pubYear,
    //             doi,
    //             summary,
    //             linked_discussion: linkedDiscussion,
    //         })
    //     );
    // };

    const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Hardcoded article data
        const articleData = {
            title: "CORS TESTING",
            authors: ["Author 1", "Author 2"],
            source: "Example Source",
            publication_year: 2023,
            doi: "Example DOI",
            summary: "Example Summary",
            linked_discussion: "Example Linked Discussion",
            SE_practice: "Example Practice",
            claim: "Example Claim",
            evidence: "Example Evidence"
        };
    
        try {
            const response = await fetch('https://speed-backend-git-testing-leo-r-jia.vercel.app/api/articles/createArticle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(articleData)
            });
    
            const responseData = await response.json();
            console.log(responseData); // Log the response data for debugging
    
            // Additional logic to handle response (e.g., show success message, navigate, etc.)
    
        } catch (error) {
            console.error("Error submitting the article:", error);
            // Handle error (e.g., show an error message to the user)
        }
    };
    


    // Some helper methods for the authors array 
    const addAuthor = () => {
        setAuthors(authors.concat([""]));
    };

    const removeAuthor = (index: number) => {
        setAuthors(authors.filter((_, i) => i !== index));
    };

    const changeAuthor = (index: number, value: string) => {
        setAuthors(
            authors.map((oldValue, i) => {
                return index === i ? value : oldValue;
            })
        );
    };

    // Return the full form 
    return (
        <div className="container">
            <h1>New Article</h1>
            <form className={formStyles.form} onSubmit={submitNewArticle}>
                <label htmlFor="title">Title:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />
                
                <label htmlFor="author">Authors:</label>
                {authors.map((author, index) => {
                    return (
                        <div key={`author ${index}`} className={formStyles.arrayItem}>
                            <input
                                type="text"
                                name="author"
                                value={author}
                                onChange={(event) => changeAuthor(index, event.target.value)}
                                className={formStyles.formItem}
                            />
                            <button
                                onClick={() => removeAuthor(index)}
                                className={formStyles.buttonItem}
                                style={{ marginLeft: "3rem" }}
                                type="button"
                            >
                                -
                            </button>
                        </div>
                    );
                })}

                <button
                    onClick={() => addAuthor()}
                    className={formStyles.buttonItem}
                    style={{ marginLeft: "auto" }}
                    type="button"
                >
                    +
                </button>

                <label htmlFor="source">Source:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="source"
                    id="source"
                    value={source}
                    onChange={(event) => {
                        setSource(event.target.value);
                    }}
                />

                <label htmlFor="pubYear">Publication Year:</label>
                <input
                    className={formStyles.formItem}
                    type="number"
                    name="pubYear"
                    id="pubYear"
                    value={pubYear}
                    onChange={(event) => {
                        const val = event.target.value;
                        if (val === "") {
                            setPubYear(0);
                        } else {
                            setPubYear(parseInt(val));
                        }
                    }}
                />

                <label htmlFor="doi">DOI:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="doi"
                    id="doi"
                    value={doi}
                    onChange={(event) => {
                        setDoi(event.target.value);
                    }}
                />

                <label htmlFor="summary">Summary:</label>
                <textarea
                    className={formStyles.formTextArea}
                    name="summary"
                    value={summary}
                    onChange={(event) => setSummary(event.target.value)}
                />

                <button className={formStyles.formItem} type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default NewDiscussion; 