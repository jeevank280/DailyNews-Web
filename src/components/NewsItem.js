import React from 'react'

const NewsItem = (props) => {
    let { description, imageUrl, newsUrl, source, author, date } = props;
    return (
        <div className='container my-3'>

            <div className="card" >
                <div className="container" style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', position: 'absolute' }}>
                    <span className="badge rounded-pill bg-danger" >{source}</span>
                </div>
                <img src={imageUrl ? imageUrl : "https://www.virtualtelescope.eu/wordpress/wp-content/uploads/2024/02/2024CY1_poster.jpg"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{description}</p>
                    <p style={{ fontWeight: 'bolder' }} className="card-text">By {author ? author : "Unknown"} on {(new Date(date)).toString().slice(0, -31)}</p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem;