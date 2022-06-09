import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function HomePage() {
    const itemPerPage = 3;
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalData, setTotalData] = useState(null);
    const backend = 'http://localhost:3000/';
    useEffect(() => {
        fetch(`http://localhost:3000?page=${page}&itemPerPage=${itemPerPage}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data.results.products);
                setTotalData(data.results.total);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [page]);
    const setPageNumber = (page) => {
        setPage(page);
    }
    const paginationButtons = () => {
        let btn = [];
        if (totalData) {
            const totalPage = Math.ceil(totalData / itemPerPage);
            for (let i = 0; i < totalPage; i++){
                btn.push(
                    <button key={i} className='btn' onClick={() => { setPageNumber(i + 1) }}> {i + 1} </button>
                )
            }
        }
        return btn;
    }
    return (
        <React.Fragment>
            <div className='text-center'>
                <h1 className='main-title home-page-title'>
                    welcome to our app
                </h1>
                <Link to='/'>
                    <button className='primary-button'>Log out</button>
                </Link>
                <main>
                    <div className='grid'>
                        {data &&
                            data.map((item, key) => (
                                <article className='card product-item' key={key}>
                                    <header className='card__header'>
                                        <h1 className='product__title'>
                                            {item.title}
                                        </h1>
                                    </header>
                                    <div className='card__image'>
                                        <img
                                            src={backend + item.imageUrl}
                                            alt={item.title}
                                        />
                                    </div>
                                    <div className='card__content'>
                                        <h2 className='product__price'>
                                            {item.price}
                                        </h2>
                                        <p className='product__description'>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className='card__actions'>
                                        <a href='/products/' className='btn'>
                                            Details
                                        </a>
                                    </div>
                                </article>
                            ))}
                    </div>
                    {totalData && paginationButtons()}           
                    {!data.length && <h1>No Products Found!</h1>}
                </main>
            </div>
        </React.Fragment>
    );
}
