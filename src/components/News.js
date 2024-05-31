import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    document.title = `DailyNews- ${(props.category)[0].toUpperCase() + (props.category).slice(1)}`;



    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);

    }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=5609793787a04ab690a737c2c252b51a&page=${page + 1}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setPage(page + 1)
        setLoading(false);
    }
    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
    }, []);


  

    return (
        <>
            <h2 className="text-center my-4" style={{ marginTop: '65px' }}>Top {(props.category)[0].toUpperCase() + (props.category).slice(1)} Headlines</h2>

            {loading && <Spinner />}
            {/* Check if initial fetch is done before rendering InfiniteScroll */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >

                {<div className="container">
                    <div className="row">
                        {articles.map((element, index) => {
                            return (
                                <div className="col-md-4" key={index}>
                                    <NewsItem
                                        key={index}
                                        title={element.title}
                                        description={element.description}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        source={element.source.name}
                                        author={element.author}
                                        date={element.publishedAt}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>}
            </InfiniteScroll>


        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;