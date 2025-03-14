import React, { useEffect, useState } from 'react';
import "./AnimalCreate.css";
import personService from '../../services/PersonService.ts';
import animalService from '../../services/AnimalService.ts';
import { Person } from '../../models/Person.ts';

const AnimalCreate: React.FC = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [breed, setBreed] = useState('');
    const [guardian, setGuardian] = useState('');
    const [guardians, setGuardians] = useState<Person[]>([]);
    const [loadingGuardians, setLoadingGuardians] = useState<boolean>(true);
    const [errorGuardians, setErrorGuardians] = useState<string | null>(null);
    const [errorForm, setErrorForm] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    useEffect(() => {
        const getPersonList = async () => {
            try {
                const data = await personService.personList();
                setGuardians(data);
                setLoadingGuardians(false);
            } catch (err) {
                setErrorGuardians('Erro ao listar tutores');
                setLoadingGuardians(false);
            }
        };

        getPersonList();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const ageNumber = parseInt(age, 10);
        const selectedGuardian = guardians.find(g => g.id === guardian);

        const animalData = {
            name,
            age: ageNumber,
            breed,
            guardian: selectedGuardian?.id
        };

        setLoadingSubmit(true);

        try {
            await animalService.createAnimal(animalData);
            setSuccessMessage('Animal salvo com sucesso!');
            setErrorForm(null);
            clearForm();
        } catch (error) {
            setSuccessMessage(null);
            setErrorForm(error.message);
        } finally {
            setLoadingSubmit(false);
        }
    };

    const clearForm = () => {
        setName('');
        setAge('');
        setBreed('');
        setGuardian('');
    };

    return (
        <div>
            <h2>Adicionar Novo Animal</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input
                        type="text"
                        placeholder="Nome do animal"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Idade:
                    <input
                        type="number"
                        placeholder="Idade do animal"
                        required
                        value={age}
                        min="0"
                        max="50"
                        onChange={(e) => setAge(e.target.value)}
                    />
                </label>
                <label>
                    Raça:
                    <input
                        type="text"
                        placeholder="Raça do animal"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                    />
                </label>
                <label>
                    Tutor:
                    {loadingGuardians ? (
                        <p>Carregando tutores...</p>
                    ) : errorGuardians ? (
                        <p>{errorGuardians}</p>
                    ) : (
                        <select value={guardian} onChange={(e) => setGuardian(e.target.value)}>
                            <option value="">Selecione o tutor</option>
                            {guardians.map((tutor) => (
                                <option key={tutor.id} value={tutor.id}>{tutor.name}</option>
                            ))}
                        </select>
                    )}
                </label>

                <button type="submit" className='btn' disabled={loadingSubmit}>
                    {loadingSubmit ? 'Adicionando...' : 'Adicionar Animal'}
                </button>

                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorForm && <p className="error">{errorForm}</p>}
            </form>
        </div>
    );
};

export default AnimalCreate;