import React from 'react';
import "./Person.css";
import PersonCreate from '../../components/Person/PersonCreate.tsx';

const Person: React.FC = () => {
    return (
        <div className="person">
            <h2>Cadastro de Tutores</h2>
            <PersonCreate />
        </div>
    );
};

export default Person;