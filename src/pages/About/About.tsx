import React from 'react';
import './About.css';

const About: React.FC = () => {
    return (
        <div className="about">
            <h2>Universo Pet Shop</h2>
            <p>
                Esse é um sistema para gerenciamento de Petshop. <br />
                Desenvolvido em React no front-end e Spring Boot no back-end.
            </p>
            <img src='golden.webp' alt='img-golden'></img>
        </div>
    );
};

export default About;