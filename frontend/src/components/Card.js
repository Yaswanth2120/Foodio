import React from 'react';

const Card = ({ title, image, description }) => (
    <div className="card">
        <img src={image} alt={title} />
        <div className="card-content">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    </div>
);

export default Card;