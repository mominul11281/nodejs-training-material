import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function HomePage() {
    const [data, setData] = useState([]);
    const backend = 'http://localhost:3000/';
    useEffect(() => {
        fetch('http://localhost:3000')
            .then((res) => res.json())
            .then((data) => {
                setData(data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
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
                                <article className='card product-item'>
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

                    {!data.length && <h1>No Products Found!</h1>}
                </main>
            </div>
        </React.Fragment>
    );
}
