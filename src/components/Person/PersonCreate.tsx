import React, { useState } from 'react';
import "./PersonCreate.css";
import { IMaskInput } from "react-imask";
import personService from '../../services/PersonService.ts';

const PersonCreate: React.FC = () => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            await personService.createPerson({ name, cpf, phone });
            setSuccess('Tutor salvo com sucesso!');
            setError(null);
            clearForm();
        } catch (error) {
            setSuccess(null);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const clearForm = () => {
        setName('');
        setCpf('');
        setPhone('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input
                        type="text"
                        placeholder="Nome do tutor"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    CPF:
                    <IMaskInput
                        mask="000.000.000-00"
                        placeholder="000.000.000-00"
                        required
                        value={cpf}
                        onAccept={(value: any) => setCpf(value)}
                    />
                </label>
                <label>
                    Telefone:
                    <IMaskInput
                        mask="(00) 00000-0000"
                        placeholder="(99) 99999-9999"
                        value={phone}
                        onAccept={(value: any) => setPhone(value)}
                    />
                </label>

                <button type="submit" className='btn' disabled={loading}>
                    {loading ? 'Adicionando...' : 'Adicionar Tutor'}
                </button>

                {success && <p className="success-message">{success}</p>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default PersonCreate;