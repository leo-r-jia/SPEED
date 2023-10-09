import { FormEvent, useState, useRef } from "react";
import formStyles from "../../styles/Form.module.scss";

const NewArticle = () => {
    // Const for article details
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState<string[]>([]);
    const [source, setSource] = useState("");
    const [pubYear, setPubYear] = useState<number>(0);
    const [doi, setDoi] = useState("");
    const [SE_practice, setSePractice] = useState("");
    const [claim, setClaim] = useState("");

    // Refs for user handling messages
    const submitWarningRef = useRef<HTMLParagraphElement | null>(null);
    const submitSuccessfulRef = useRef<HTMLParagraphElement | null>(null);
    const submitUnsuccessfulRef = useRef<HTMLParagraphElement | null>(null);

    // Function to toggle the display property of an element
    const toggleDisplay = (ref: React.RefObject<HTMLElement>, displayValue: string) => {
        if (ref.current) {
            ref.current.style.display = displayValue;
        }
    };

    const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Check for empty fields
        if (!title || authors.some(author => !author) || !source || !pubYear || !doi || !SE_practice || !claim) {
            toggleDisplay(submitWarningRef, 'block');
            toggleDisplay(submitUnsuccessfulRef, 'none');
            toggleDisplay(submitSuccessfulRef, 'none');
            return;
        }

        const articleData = {
            title,
            authors,
            source,
            publication_year: pubYear,
            doi,
            summary: "",
            linked_discussion: "",
            total_ratings: 0,
            moderatorApproved: false,
            analystApproved: false,
            rejected: false,
            SE_practice,
            claim
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
                // Provide feedback to the user
                toggleDisplay(submitUnsuccessfulRef, 'block');
                toggleDisplay(submitWarningRef, 'none');
                toggleDisplay(submitSuccessfulRef, 'none');
                throw new Error('Failed to submit article.');
            }
            console.log('Article submitted successfully!');
            // Reset form fields
            setTitle("");
            setAuthors([]);
            setSource("");
            setPubYear(0);
            setDoi("");
            setSePractice("");
            setClaim("");
            // Provide feedback to user
            toggleDisplay(submitWarningRef, 'none');
            toggleDisplay(submitUnsuccessfulRef, 'none');
            toggleDisplay(submitSuccessfulRef, 'block');
        } catch (error) {
            console.error('Error submitting article:', error);
            // Provide feedback to the user
            toggleDisplay(submitUnsuccessfulRef, 'block');
            toggleDisplay(submitWarningRef, 'none');
            toggleDisplay(submitSuccessfulRef, 'none');
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

                <label htmlFor="claim">Claim:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="claim"
                    id="claim"
                    value={claim}
                    onChange={(event) => {
                        setClaim(event.target.value);
                    }}
                />

                <p className={formStyles.warning} ref={submitWarningRef}>Please fill in all fields</p>
                <p className={formStyles.warning} ref={submitUnsuccessfulRef}>Article did not submit. Please try again.</p>
                <p className={formStyles.submitSuccessful} ref={submitSuccessfulRef}>Article submitted</p>
                <button className={formStyles.formItem} type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default NewArticle; 