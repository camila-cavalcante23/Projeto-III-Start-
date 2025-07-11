import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// 1. MUDANÇA PADRÃO: Trocamos a importação
import api from '../../services/api';
import './Inscricao.css';
import NavbarAdmin from "../../components/";
import Footer from "../../components/Footer/Footer";

// 2. REMOÇÃO: A lista de eventos de mentira foi removida.
// const mockEvents = [...];

const Inscricao = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // 3. MUDANÇA: Agora buscamos os eventos reais da API.
  useEffect(() => {
    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await api.get('/eventos');
            // Filtramos para mostrar apenas eventos em andamento para inscrição
            setEvents(response.data.filter(e => e.status === 'em-andamento')); 
        } catch (err) {
            setError("Não foi possível carregar os eventos.");
        } finally {
            setLoading(false);
        }
    };
    fetchEvents();
  }, []);

  const handleCheckboxChange = (eventId) => {
    setSelectedEvents(prevSelected =>
      prevSelected.includes(eventId)
        ? prevSelected.filter(id => id !== eventId)
        : [...prevSelected, eventId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 4. CORREÇÃO CRÍTICA: Pegamos o ID do usuário real do localStorage.
    const userId = localStorage.getItem('userId');
    if (!userId) {
        setError('Você precisa estar logado para se inscrever.');
        return;
    }

    if (selectedEvents.length === 0) {
      setError('Selecione pelo menos um evento para se inscrever.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // 5. MUDANÇA PADRÃO: Usamos 'api.post' com os dados corretos.
      const response = await api.post('/api/subscriptions', {
        userId,
        eventIds: selectedEvents,
      });

      if (response.status === 200) {
        setSuccess('Inscrição realizada com sucesso!');
        setTimeout(() => navigate('/meus-eventos'), 2000); // Sugestão: talvez navegar para uma página de "meus eventos"
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao realizar inscrição.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <NavbarAdmin />
      <div className="content-wrapper">
        <div className="page-container">
          <header className="page-header">
            <img src="\src\assets\StartUFC-logo.svg" alt="StartUFC Logo" className="page-logo" />
          </header>
          <main className="main-content">
            <div className="options-menu">
              <a href="#" className="option-link active">
                <span className="icon-edit"></span> Inscreva-se
              </a>
              <a href="#" className="option-link">
                <span className="icon-list"></span> Programação
              </a>
            </div>
            <form onSubmit={handleSubmit} className="form-box">
              {loading && <p>Carregando eventos...</p>}
              {!loading && events.map(event => (
                <div key={event.id} className="event-item">
                  <input
                    type="checkbox"
                    id={`event-${event.id}`}
                    className="event-checkbox"
                    onChange={() => handleCheckboxChange(event.id)}
                    checked={selectedEvents.includes(event.id)}
                  />
                  <label htmlFor={`event-${event.id}`} className="event-label">
                    <div className="event-details">
                      <span className="event-time">{new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} / {new Date(event.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}h</span>
                      <span className="event-name">{event.name}</span>
                    </div>
                    <span className="event-vacancies">{event.vacancies} vagas</span>
                  </label>
                </div>
              ))}
              {error && <p className="message error-message">{error}</p>}
              {success && <p className="message success-message">{success}</p>}
              <button type="submit" className="submit-btn" disabled={loading}>
                <span className="icon-check"></span>
                {loading ? 'Inscrevendo...' : 'Inscreva-se'}
              </button>
            </form>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Inscricao;