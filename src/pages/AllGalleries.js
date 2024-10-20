import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGalleries } from '../store/galleries/slice';
import { selectGalleries } from '../store/galleries/selectors';
import SingleGallery from '../components/SingleGallery';
import './../css/AllGalleries.css';
import GalleryFilter from '../components/GalleryFilter';
import { useNavigate } from 'react-router-dom';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { selectIsAuthenticated } from '../store/auth/selectors';


const AllGalleries = () => {
    const dispatch = useDispatch();
    const galleries = useSelector(selectGalleries);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [visibleGalleries, setVisibleGalleries] = useState([]);
    const itemsPerPage = 6;
    useEffect(() => {
        dispatch(getGalleries());
    }, [dispatch]);


    useEffect(() => {
        if (galleries && galleries.length > 0) {
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            setVisibleGalleries(galleries.slice(start, end));
        }
    }, [galleries, currentPage, itemsPerPage]);

    function handlePageChange(pageNumber) {
        if (currentPage !== pageNumber) {
            setCurrentPage(pageNumber);
            setVisibleGalleries([]);
        }
    }

    const goToRegister = () => {
        navigate('/register');
    }

    return (
        <>
            <div className='gallery-welcome-photo'>
                <div className='welcome-message'>
                    {!isAuthenticated && (
                        <>
                            <h3>Create Your Own Gallery</h3>
                            <p>Explore further for more options</p>
                            <button onClick={goToRegister}>Sign Up</button>
                        </>
                    )}
                </div>
            </div>
            <div className='container-container-container'>

                <section>
                    <div className='container'>
                        <h2 className='allGalleries-title'>All Galleries</h2>
                        <GalleryFilter placeholder="Enter gallery name..." data={galleries} />
                        <div className='cards'>
                            {Array.isArray(visibleGalleries) && visibleGalleries?.map(gallery => (
                                <SingleGallery key={gallery?.id} {...gallery} />
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
            <div className='copyright-section'>
                <div className='social-icons'>
                    <a href="https://github.com/milorad996"><SiGithub /></a>
                    <a href="https://www.linkedin.com/in/milorad-savkovic-673b29183/"><SiLinkedin /></a>
                </div>
                <p>&copy; 2024 Milorad Sakovic</p>
            </div>
        </>
    );
};

export default AllGalleries;
