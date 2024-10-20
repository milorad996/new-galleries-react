
import React from "react";
import { Link } from "react-router-dom";
import './../css/SingleGallery.css';
import useFormattedDate from "../hooks/useFormattedDate";

function SingleGallery({
    id,
    title,
    author,
    images,
    created_at,
}) {

    const createdAt = useFormattedDate(created_at);

    return (
        <div className="card">
            {images?.length > 0 && (
                <img
                    className="card-image"
                    src={images[0].url}
                    alt=""
                />
            )}
            <div className="card-content">
                <h2 className="card-title">
                    <Link to={`/galleries/${id}`}>{title}</Link>
                </h2>
                <p className="card-author"><span className="text-author">Author:</span>
                    <span><Link to={`/authors/${author?.id}`}>
                        {author?.first_name + " " + author?.last_name}
                    </Link></span>
                </p>
                <p className="card-created-at">Created at: {createdAt}</p>
            </div>
        </div>
    );
}

export default SingleGallery;
