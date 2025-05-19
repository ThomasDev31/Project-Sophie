import "../styles/contact.css";

function Contact() {
    return (
        <>
            <div className="container-contact">
                <h2 className="title">Contact</h2>
                <p>Vous avez un projet ? Discutons-en !</p>
                <form className="form" action="POST">
                    <label className="name" htmlFor="name">
                        Nom
                    </label>
                    <div className="input">
                        <input type="text" id="name" />
                    </div>
                    <label className="email" htmlFor="email">
                        E-mail
                    </label>
                    <div className="input">
                        <input type="email" id="email" />
                    </div>
                    <label className="message" htmlFor="Message">
                        Message
                    </label>
                    <div className="input">
                        <textarea
                            name="message"
                            id="message"
                            rows="10"
                        ></textarea>
                    </div>
                    <input className="button" type="submit" value="Envoyer" />
                </form>
            </div>
        </>
    );
}

export default Contact;
