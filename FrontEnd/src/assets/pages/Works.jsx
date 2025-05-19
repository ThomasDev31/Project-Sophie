import { useContext, useEffect, useState } from "react";
import Contact from "./contact";
import About from "./About";
import { AuthContext } from "../layout/AuthContext";
import "../styles/works.css";

function Works() {
    const [works, setWorks] = useState([]);
    const [worksDisplayed, setWorksDisplayed] = useState([]);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setisLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const { token } = useContext(AuthContext);
    const [step, setStep] = useState(1);
    const fetchWorks = async () => {
        try {
            const response = await fetch("http://localhost:5678/api/works");
            if (!response.ok) {
                throw new Error(response.status);
            }
            const data = await response.json();
            setWorks(data);
            setWorksDisplayed(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setisLoading(false);
        }
    };

    const deleteWork = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:5678/api/works/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error(response.status);
            }
            // const data = await response.json();
            setWorks((prevWorks) => prevWorks.filter((work) => work.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const addWork = async (FormData) => {
        try {
            const response = await fetch(`http://localhost:5678/api/works`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: FormData,
            });
            if (!response.ok) {
                throw new Error(response.status);
            }
            fetchWorks();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Image :", image);
		console.log("Title :", title);
		console.log("Category :", category);

        const formData = new FormData();
	
        formData.append("image", image);
        formData.append("title", title);
        formData.append("category", parseInt(category, 10));
	console.log(formData)
        await addWork(formData);
        setTitle("");
        setImage(null);
        setCategory("");
        setStep(1);
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(
                "http://localhost:5678/api/categories"
            );
            if (!response.ok) {
                throw new Error(response.status);
            }
            const data = await response.json();

            setCategories(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setisLoading(false);
        }
    };

    useEffect(() => {
        fetchWorks();
        fetchCategories();
        filterCats();
    }, []);

    const filterCats = (filtername) => {
        if (filtername === "") {
            setWorksDisplayed(works);
        } else {
            const tamere = works.filter(
                (work) => work.category.name === filtername
            );
            setWorksDisplayed(tamere);
        }
    };

    return (
        <>
            {error && (
                <div className="container-error">
                    <p>{error}</p>
                </div>
            )}
            {isLoading && (
                <div className="container-loading">
                    <p>Les données sont entrains de charger</p>
                </div>
            )}
            {!error && !isLoading && (
                <>
                    <div className="container-global">
                        <About />
                        <div className="modify">
                            <h2>Mes projets</h2>
                            {token && (
                                <button
                                    className="editing"
                                    onClick={() => setOpen(!open)}
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                            )}
                        </div>
                        <div className="container-categories">
                            <ul>
                                <li>
                                    <button
                                        className="category_button"
                                        onClick={() => filterCats("")}
                                    >
                                        Tous
                                    </button>
                                </li>
                                {categories.map((categorie) => (
                                    <li key={categorie.id}>
                                        <button
                                            className="category_button"
                                            onClick={() =>
                                                filterCats(categorie.name)
                                            }
                                        >
                                            {categorie.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="container-works">
                            {worksDisplayed.map((work) => (
                                <div className="container-work" key={work.id}>
                                    <img src={work.imageUrl} alt={work.title} />
                                    <p>{work.title}</p>
                                </div>
                            ))}
                        </div>

                        <Contact />
                    </div>

                    {step === 1 && (
                        <div className={`modal ${open ? "open" : ""}`}>
                            <div className="content-modal">
                                <h2>Galerie Photos</h2>
                                <button
                                    className="btn-closed"
                                    onClick={() => setOpen(!open)}
                                >
                                    X
                                </button>
                                <div className="div-work">
                                    {works.map((work) => (
                                        <div
                                            className="container-work"
                                            key={work.id}
                                        >
                                            <div>
                                                <img
                                                    src={work.imageUrl}
                                                    alt={work.title}
                                                />
                                                <i
                                                    className="fa-solid fa-trash"
                                                    onClick={() =>
                                                        deleteWork(work.id)
                                                    }
                                                ></i>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <hr />
                                <button
                                    className="adding-element"
                                    onClick={() => setStep(2)}
                                >
                                    Ajouter un élément
                                </button>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className={`modal ${open ? "open" : ""}`}>
                            <div className="content-modal">
                                <h2>Galerie Photos</h2>
                                <button onClick={() => setStep(1)}>
                                    return
                                </button>
                                <button
                                    className="btn-closed"
                                    onClick={() => {
                                        setOpen(!open);
                                        setStep(1);
                                    }}
                                >
                                    X
                                </button>

                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="file"
                                        name="imageUrl"
                                        onChange={(e) =>
                                            setImage(e.target.files[0])
                                        }
                                    />
                                    <input
                                        type="text"
                                        name="title"
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                    <select
                                        name="category"
                                        id="category"
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                    >
										<option value="0">....</option>
                                        {categories.map((categorie) => (
                                            <option
                                                key={categorie.id}
                                                value={categorie.id}
                                                name="categoryId"
                                            >
                                                {categorie.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button type="submit">Envoyer</button>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Works;
