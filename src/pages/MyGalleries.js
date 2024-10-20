import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveUser } from '../store/auth/selectors';
import { getActiveUser } from '../store/auth/slice';
import { getAuthorGallery } from '../store/galleries/slice';
import { selectAuthorGallery } from '../store/galleries/selectors';
import SingleGallery from '../components/SingleGallery';
import './../css/MyGalleries.css';

function MyGalleries() {
    const author = useSelector(selectActiveUser);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleGalleries, setVisibleGalleries] = useState([]);
    const itemsPerPage = 6;

    useEffect(() => {
        dispatch(getActiveUser());
        dispatch(getAuthorGallery({
            id: author?.id,
            page: currentPage,
        }));
    }, [dispatch, author?.id, currentPage]);

    const authorGalleries = useSelector(selectAuthorGallery);

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setVisibleGalleries(authorGalleries?.slice(start, end) || []);
    }, [authorGalleries, currentPage, itemsPerPage]);

    const handlePageChange = (pageNumber) => {
        if (currentPage !== pageNumber) {
            setCurrentPage(pageNumber);
            setVisibleGalleries([]);
        }
    };

    return (
        <div className="myGalleries-container">
            <h2 className="myGalleries-title">My Galleries</h2>
            <div className="my-galleries-container-two">
                <section className="my-galleries-section">
                    <div className="container">
                        <div className="cards">
                            {visibleGalleries?.map((gallery) => (
                                <SingleGallery {...gallery} key={gallery?.id} />
                            ))}
                        </div>
                        <div className="pagination">
                            <span
                                className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                {'<'}
                            </span>
                            {Array.from({ length: Math.ceil(authorGalleries?.length / itemsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
                                <span
                                    key={pageNumber}
                                    className={`pagination-item ${currentPage === pageNumber ? 'active' : ''}`}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </span>
                            ))}
                            <span
                                className={`pagination-item ${currentPage === Math.ceil(authorGalleries?.length / itemsPerPage) ? 'disabled' : ''}`}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                {'>'}
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default MyGalleries;
