import { useContext, useEffect, useState } from "react";
import Contact from "./contact";
import About from "./About";
import { AuthContext } from "../layout/AuthContext";
import "../styles/works.css";

function Works() {
	const [works, setWorks] = useState([]);
	const [worksDisplayed, setWorksDisplayed] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setisLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const [open, setOpen] = useState(false);
	const { token } = useContext(AuthContext)
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
			const response = await fetch(`http://localhost:5678/api/works/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			if (!response.ok) {
				throw new Error(response.status);
			}
			// const data = await response.json();
			setWorks((prevWorks) => prevWorks.filter((work) => work.id !== id));
		} catch (err) {
			setError(err.message);
		}
	}

	const fetchCategories = async () => {
		try {
			const response = await fetch("http://localhost:5678/api/categories");
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
            const tamere = works.filter((work) => work.category.name === filtername);
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
				<div className="container-global">
					<About />
					<div className="modify">
					<h2>Mes projets</h2>
					{token && (
						<button className="editing" onClick={() => setOpen(!open)}><i className="fa-solid fa-pen-to-square" ></i></button>

					)}
					</div>
					<div className="container-categories">
						<ul>
							<li>
								<button className="category_button" onClick={() => filterCats('')}>
									Tous
								</button>
							</li>
							{categories.map((categorie) => (
								<li key={categorie.id}>
									<button className="category_button" onClick={() => filterCats(categorie.name)}>{categorie.name}</button>
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
					<div className={`modal ${open ? "open" : ""}`}>
						<div className="content-modal">
							<button className="btn-closed" onClick={() => setOpen(!open)}>X</button>
							<div className="div-work">
								{works.map((work) => (
								<div className="container-work" key={work.id}>
									<div >
										<img src={work.imageUrl} alt={work.title} />
										<i className="fa-solid fa-trash" onClick={() => deleteWork(work.id)}></i>
									</div>
									
								</div>
								))}
							</div>
							
							<hr />
							<button className="adding-element">Ajouter un élément</button>
						</div>

					</div>
					<Contact />
				</div>
			)}
		</>
	);
}

export default Works;
