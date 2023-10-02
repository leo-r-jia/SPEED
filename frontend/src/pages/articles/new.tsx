import { FormEvent, useState } from "react";
import formStyles from "../../styles/Form.module.scss";

const NewDiscussion = () => {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState<string[]>([]);
    const [source, setSource] = useState("");
    const [pubYear, setPubYear] = useState<number>(0);
    const [doi, setDoi] = useState("");
    const [summary, setSummary] = useState("");
    const [SE_practice, setSePractice] = useState("");
    const [claim, setClaim] = useState("");

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
      
        const articleData = {
            title,
            authors,
            source,
            publication_year: pubYear,
            doi,
            summary,
            linked_discussion: "",
            updated_date: null,
            ratings: null,
            average_rating: null,
            total_ratings: 0,
            approved: false,
            rejected: false,
            SE_practice,
            claim: null,
            evidence: null,
        };

        try {
            const response = await fetch('https://speed-backend-git-testing-leo-r-jia.vercel.app/api/articles/createArticle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(articleData),
            });
            if (!response.ok) {
                throw new Error('Failed to submit article.');
            }
            console.log('Article submitted successfully!');
            // Reset form fields or provide feedback to the user
        } catch (error) {
            console.error('Error submitting article:', error);
            // Handle errors or provide feedback to the user
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
        <div className={formStyles.container}>
            <h1>Submit a New Article</h1>
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
                        setPubYear(parseInt(val));
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

                <label htmlFor="method">Method/practice:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="method"
                    id="method"
                    value={SE_practice}
                    onChange={(event) => {
                        setSePractice(event.target.value);
                    }}
                />

                <label htmlFor="method">Claim:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="method"
                    id="method"
                    value={claim}
                    onChange={(event) => {
                        setClaim(event.target.value);
                    }}
                />

                <button className={formStyles.formItem} type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default NewDiscussion; 