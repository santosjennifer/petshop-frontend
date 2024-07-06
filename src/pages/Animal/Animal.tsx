import React from 'react';
import "./Animal.css";
import AnimalsTable from '../../components/Animal/AnimalsTable.tsx';
import { Link } from 'react-router-dom';

const Animal: React.FC = () => {
    return (
        <div className="animal">
            <h2>Listagem de Pets</h2>
            <AnimalsTable />
            <Link to="/add-animal" className="btn">Novo Pet</Link>
        </div>
    );
};

export default Animal;