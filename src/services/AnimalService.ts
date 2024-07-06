
const API_URL = 'http://localhost:8001/api';

const animals = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/animal`);
    if (!response.ok) {
      throw new Error('Falha ao buscar animais');
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const animal = async (id): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/animal/${id}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar animal');
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createAnimal = async (data: object): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/animal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Falha ao salvar animal');
    }

    return responseData;
  } catch (error) {
    throw error;
  }
};

const editAnimal = async (id, data: object): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/animal/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Falha ao atualizar animal');
    }

    return responseData;
  } catch (error) {
    throw error;
  }
};

const deleteAnimal = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/animal/${id}`, {
      method: "DELETE"
    });

    if (response.status === 204) {
      return;
    }

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Falha ao excluir animal');
    }
  } catch (error) {
    throw new Error(error.message || 'Erro ao excluir animal');
  }
};

const animalService = {
  animals,
  animal,
  createAnimal,
  editAnimal,
  deleteAnimal
};

export default animalService;