
const API_URL = 'http://localhost:8031/api';

const personList = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/person`);
    if (!response.ok) {
      throw new Error('Falha ao buscar tutores');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const createPerson = async (data): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/person`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Falha ao salvar tutor');
    }

    return responseData;
  } catch (error) {
    throw error;
  }
};

const personService = {
  personList,
  createPerson
};

export default personService;