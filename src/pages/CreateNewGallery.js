

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { selectGallery, selectGalleryErrors, selectSuccessfullyCreatedGallery } from "../store/galleries/selectors";
import { useEffect, useState } from "react";
import { addGallery, editGallery, setGalleryErrors, setSuccessfullyCreatedGallery } from "../store/galleries/slice";
import "./../css/CreateNewGallery.css";

function CreateNewGallery() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const gallery = useSelector(selectGallery);
    const galleryErrors = useSelector(selectGalleryErrors);
    const isCreatedGallery = useSelector(selectSuccessfullyCreatedGallery);




    const [newGallery, setNewGallery] = useState({
        title: "",
        description: "",
        images: [{ url: "" }],
    });
    function handleActionSuccessEdit() {
        navigate(`/my-galleries`);
    }


    const handleAddClick = () => {
        if (newGallery.images.length < 3) {
            setNewGallery({
                ...newGallery,
                images: [...newGallery.images, { url: "" }],
            });
        }


    };
    useEffect(() => {
        dispatch(setGalleryErrors(null));
    }, [dispatch, location])




    const handleCancel = (e) => {
        e.preventDefault();
        if (id) {
            navigate(`/ galleries / ${gallery.id} `);
        } else {
            navigate("/my-galleries");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                if (!gallery) {
                    alert("You can edit only your own gallery");
                    navigate("/");
                    return;
                }
                await dispatch(editGallery({
                    id,
                    gallery: newGallery,
                    meta: {
                        onSuccess: handleActionSuccessEdit,
                    },
                }));
            } else {
                await dispatch(addGallery({
                    gallery: newGallery,

                }));
            }
        } catch (error) {
            alert("Gallery creation failed");
            console.error("Error creating gallery:", error);
        }
    };
    useEffect(() => {
        return () => {
            dispatch(setSuccessfullyCreatedGallery(""));
        };
    }, [dispatch, location]);


    console.log("galleri errors: ", galleryErrors, "is created gallery: ", isCreatedGallery);
    useEffect(() => {
        if (galleryErrors === null && isCreatedGallery === "Gallery created successfully") {
            navigate("/");
        }
    }, [navigate, isCreatedGallery, galleryErrors]);






    const handleInputChange = (e, index) => {
        const { value } = e.target;
        const list = [...newGallery.images];
        list[index].url = value;
        setNewGallery({
            ...newGallery,
            images: list,
        });
    };



    const handleRemoveClick = (index) => {
        setNewGallery({
            ...newGallery,
            images: newGallery.images.filter((img, i) => index !== i),
        });
    };

    const reorderArray = (event, originalArray) => {
        const movedItem = originalArray.find(
            (i, index) => index === event.oldIndex
        );
        const remainingItems = originalArray.filter(
            (i, index) => index !== event.oldIndex
        );

        const reorderedItems = [
            ...remainingItems.slice(0, event.newIndex),
            movedItem,
            ...remainingItems.slice(event.newIndex),
        ];

        return reorderedItems;
    };

    const changeOrder = (index, direction) => {
        setNewGallery((prevGallery) => ({
            ...prevGallery,
            images: reorderArray(
                { oldIndex: index, newIndex: index + (direction === "UP" ? -1 : 1) },
                prevGallery.images
            ),
        }));
    };

    return (
        <div className="create-new-gallery-container">
            <form onSubmit={handleSubmit} className="create-gallery-form">
                <h2 style={{ padding: "10px" }} className="create-edit-gallery">
                    {id ? "- Edit Gallery -" : "- Create New Gallery -"}
                </h2>
                <div style={{ padding: "10px" }}>
                    <input
                        className={`title - input ${galleryErrors?.title ? 'input-error-gallery' : ''} `}

                        type="text"
                        id="title"
                        placeholder="Title"
                        value={newGallery?.title}
                        onChange={({ target }) =>
                            setNewGallery({ ...newGallery, title: target.value })
                        }
                    />
                    {galleryErrors?.title && <p className="error-message-gallery">{galleryErrors?.title}</p>}
                </div>
                <div style={{ padding: "10px" }}>
                    <textarea
                        className={`textarea - description ${galleryErrors?.description ? 'input-error-gallery' : ''} `}
                        cols="50"
                        rows="4"
                        type="text"
                        id="description"
                        placeholder="Description"
                        value={newGallery?.description}
                        onChange={({ target }) =>
                            setNewGallery({ ...newGallery, description: target.value })
                        }
                    />
                    {galleryErrors?.description && <p className="error-message-gallery">{galleryErrors.description}</p>}
                </div>
                {newGallery.images &&
                    newGallery.images.map((x, i) => (
                        <div key={i} className="image-input-container">
                            <div className="input-group">
                                <div className="input-add-url">

                                    <input
                                        className={`url-input ${galleryErrors && galleryErrors[`images.${i}.url`] ? 'input-error-gallery' : ''} `} key={i}
                                        name="url"
                                        value={x.url}
                                        placeholder="Image url"
                                        onChange={(e) => handleInputChange(e, i)}
                                    />
                                    {galleryErrors && galleryErrors[`images.${i}.url`] && <p className="error-message-gallery">{galleryErrors[`images.${i}.url`]}</p>}

                                    <div className={newGallery?.images?.length < 3 ? "add-button" : "disable-button"}>
                                        {newGallery?.images?.length - 1 === i && (
                                            <button onClick={handleAddClick}>
                                                Add picture
                                            </button>
                                        )}

                                    </div>

                                </div>
                                <div className="button-group">
                                    <span>
                                        {newGallery?.images?.length > 1 && (
                                            <button
                                                className="remove-button"
                                                onClick={() => handleRemoveClick(i)}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </span>
                                    <span>
                                        {newGallery?.images?.length > 1 && (
                                            <button
                                                className="up-button"
                                                type="button"
                                                onClick={() => changeOrder(i, "UP")}
                                            >
                                                Move Up
                                            </button>
                                        )}
                                    </span>
                                    <span>
                                        {newGallery?.images?.length > 1 && (
                                            <button
                                                className="down-button"
                                                type="button"
                                                onClick={() => changeOrder(i, "DOWN")}
                                            >
                                                Move Down
                                            </button>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                <span className="edit-create-cancel-button">
                    <button className="edit-create-button" type="submit">{id ? "Edit" : "Create"}</button>
                    <button className="cancel-button" type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </span>
            </form>
        </div>

    );
}

export default CreateNewGallery;
