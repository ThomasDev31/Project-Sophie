import { useEffect, useState } from "react";
import Contact from "./contact";
import About from "./About";

import "../styles/works.css";

function Works() {
	const [works, setWorks] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setisLoading] = useState(true);
	const [categories, setCategories] = useState([]);

	const fetchWorks = async () => {
		try {
			const response = await fetch("http://localhost:5678/api/works");
			if (!response.ok) {
				throw new Error(response.status);
			}
			const data = await response.json();
			setWorks(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setisLoading(false);
		}
	};

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
	}, []);

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
					<h2>Mes projets</h2>
					<div className="container-categories">
						<ul>
							<li>
								<button className="category_button" >Tous</button>
							</li>
							{categories.map((categorie) => (
								<li key={categorie.id}>
									<button className="category_button" >{categorie.name}</button>
								</li>
							))}
						</ul>
					</div>
					<div className="container-works">
						{works.map((work) => (
							<div className="container-work" key={work.id}>
								<img src={work.imageUrl} alt={work.title} />
								<p>{work.title}</p>
							</div>
						))}
					</div>
					<Contact />
				</div>
			)}
		</>
	);
}

export default Works;
