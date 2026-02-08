import "./Card.css";

export default function Card({name, url, description, imageURL}) {
    return (
        <div className="card">
            {imageURL && (
                <img className="card-image" src={imageURL} alt={name} />
            )}
            <div className="card-content">
                <h2 className="card-name">{name}</h2>
                <p className="card-url">
                    <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                </p>
                <p className="card-description">{description}</p>
            </div>
        </div>
    );
}