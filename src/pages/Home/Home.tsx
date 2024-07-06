import React from 'react';
import "./Home.css";

const Home: React.FC = () => {
    return (
        <div className="home">
            <h2>Bem vindo ao Pet Shop!</h2>
            <img src='gato.jpg' alt='img-cat'></img>
        </div>
    );
};

export default Home;