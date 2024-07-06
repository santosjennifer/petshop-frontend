import React, { useEffect, useState } from 'react';
import animalService from '../../services/AnimalService.ts';
import './AnimalsTable.css';
import { Animal } from '../../models/Animal.ts';
import { Link } from 'react-router-dom';

const AnimalsTable: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const getAnimals = async () => {
    try {
      const data = await animalService.animals();
      setAnimals(data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao listar animais');
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnimals();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Tem certeza que deseja excluir este animal?');
    if (confirmed) {
      try {
        await animalService.deleteAnimal(id);
        await getAnimals();
        setCurrentPage(1);
      } catch (err) {
        setError('Erro ao excluir animal');
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = animals.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="table-container">
      <table className="animals-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Raça</th>
            <th>Vivo</th>
            <th>Tutor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.name}</td>
              <td>{animal.age}</td>
              <td>{animal.breed}</td>
              <td>{animal.alive ? 'Sim' : 'Não'}</td>
              <td>{animal.guardian}</td>
              <td>
                <Link to={`/edit-animal/${animal.id}`} className="actions-button edit">Editar</Link>
                <button className="actions-button delete" onClick={() => handleDelete(animal.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>{currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastItem >= animals.length}>
          Próxima
        </button>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default AnimalsTable;