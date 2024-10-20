import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAuthorGallery } from '../store/galleries/slice';
import { selectAuthorGallery } from '../store/galleries/selectors';
import SingleGallery from '../components/SingleGallery';
import './../css/AuthorGalleries.css';

function AuthorGalleries() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [visibleGalleries, setVisibleGalleries] = useState([]);
    const itemsPerPage = 6;

    const galleries = useSelector(selectAuthorGallery);


    useEffect(() => {
        dispatch(getAuthorGallery({ id, page: currentPage }));
    }, [dispatch, id, currentPage]);

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setVisibleGalleries(galleries?.slice(start, end) || []);
    }, [galleries, currentPage, itemsPerPage]);

    const handlePageChange = (pageNumber) => {
        if (currentPage !== pageNumber) {
            setCurrentPage(pageNumber);
            setVisibleGalleries([]);
        }
    };

    return (
        <div className='author-container'>
            <h2 className='author-title'>Galleries by {galleries && galleries[0]?.author?.first_name + ' ' + galleries[0]?.author?.last_name}</h2>
            <div className='author-container-two'>
                <section>
                    <div className='container'>
                        <div className='cards'>
                            {visibleGalleries?.map((gallery) => (
                                <SingleGallery {...gallery} key={gallery?.id} />
                            ))}
                        </div>

                        <div className='pagination'>
                            <span
                                className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                {'<'}
                            </span>
                            {Array.from({ length: Math.ceil(galleries?.length / itemsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
                                <span
                                    key={pageNumber}
                                    className={`pagination-item ${currentPage === pageNumber ? 'active' : ''}`}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </span>
                            ))}
                            <span
                                className={`pagination-item ${currentPage === Math.ceil(galleries?.length / itemsPerPage) ? 'disabled' : ''}`}
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

export default AuthorGalleries;

