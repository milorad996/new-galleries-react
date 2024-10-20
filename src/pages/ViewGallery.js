
import { useDispatch, useSelector } from "react-redux";
import { getActiveUser } from "../store/auth/slice";
import { addComment, deleteComment, deleteGallery, getComments, getGallery } from "../store/galleries/slice";
import { selectGallery } from "../store/galleries/selectors";
import { selectActiveUser } from "../store/auth/selectors";
import './../css/ViewGallery.css';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ViewGallery() {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const author = useSelector(selectActiveUser);



    const [newComment, setNewComment] = useState({
        body: "",

    });



    const gallery = useSelector(selectGallery);

    useEffect(() => {
        dispatch(getComments({
            galleryId: gallery?.id
        }))
        dispatch(getActiveUser());
        dispatch(getGallery({
            id: id
        }));
    }, [dispatch, id, author?.id, gallery?.id]);



    const handleLoadMoreComments = () => {

        dispatch(getGallery({
            id: id,
            page: gallery?.comments?.current_page + 1
        }));
    }


    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };



    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this gallery?");
        if (!confirmDelete) return;

        try {
            console.log("delete gallery in viewgallery", gallery?.gallery?.id)
            dispatch(deleteGallery({
                galleryId: gallery?.gallery?.id,
                meta: {
                    onSuccess: handleActionSuccessDelete,
                },
            }));
        } catch (error) {
            console.error("Error deleting gallery:", error);
        }
    };

    function handleActionSuccessDelete() {
        navigate("/");
    }


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!author?.id) {
            alert("Please log in to leave a comment.");
            return;
        }

        try {
            await dispatch(addComment({
                galleryId: gallery?.gallery?.id,
                newComment: newComment
            }));

            setNewComment({ ...newComment, body: "" });
        } catch (error) {
            alert("Failed to add comment: " + error.message);
        }
    }
    const handleCommentDelete = async (commentId) => {
        try {
            await dispatch(deleteComment(commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };


    return (
        <div className="gallery-container">
            <div className="about-gallery">
                <h2 className="card-title">- {gallery?.gallery?.title} -</h2>
                <p className="card-author">Created by: <Link to={`/authors/${gallery?.gallery?.author?.id}`}> {gallery?.gallery?.author?.first_name + " " + gallery?.gallery?.author?.last_name} </Link></p>
            </div>
            <div className="card-container">
                {gallery?.gallery?.images?.length < 2 && (
                    gallery?.gallery?.images?.map((image) =>
                        <img key={image?.id} className="card-img" src={image?.url} alt={image?.alt} />
                    )
                )}
                {gallery?.gallery?.images?.length > 1 && (
                    <Slider dots={true}
                        infinite={true}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                        className="image-container">
                        {gallery?.gallery?.images?.map((image) =>
                            <img key={image?.id} className="card-img" src={image?.url} alt={image?.alt} />
                        )}
                    </Slider>
                )}

            </div>
            <div className="edit-delete-body">
                {author?.id && author?.id === gallery?.gallery?.author?.id ? (
                    <div className="button-container">
                        <button id="editButton" className="edit-button" onClick={handleEdit}>Edit</button>
                        <button id="deleteButton" className="delete-button" onClick={handleDelete}>Delete</button>
                    </div>
                ) : <></>}
            </div>
            <div className="comments-container">
                <h3 className="comments-title">Comments:</h3>
                <div className="comments-body">
                    {gallery?.comments?.data?.map((comment) => (
                        <div key={comment?.id} className="comment-container">
                            <p className="comment-body-title">{author?.id === comment?.user_id && (author?.first_name + " " + author?.last_name + ": ")}{comment?.body}</p>
                            {author?.id === comment?.user_id && (
                                <button onClick={() => handleCommentDelete(comment?.id)} className="trash-button" title="">
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </button>
                            )}
                        </div>

                    ))}
                    <div className="load-more-comments">
                        <button
                            onClick={handleLoadMoreComments}
                            disabled={gallery?.comments?.current_page === gallery?.comments?.last_page}
                        >
                            Load more
                        </button>
                    </div>
                </div>


                <div className="comment-and-buttons">
                    <textarea
                        className="textarea-comment"
                        cols="50"
                        rows="1"
                        type="text"
                        id="description"
                        placeholder="Leave a comment..."
                        value={newComment?.body}
                        onChange={({ target }) =>
                            setNewComment({ ...newComment, body: target.value })
                        }
                    />
                    <button
                        className="comment-button"
                        onClick={handleCommentSubmit}
                        title=""
                    >
                        <i className="fa fa-paper-plane rotated-icon" aria-hidden="true"></i>
                    </button>


                </div>
            </div>
        </div >
    )
}

export default ViewGallery;


