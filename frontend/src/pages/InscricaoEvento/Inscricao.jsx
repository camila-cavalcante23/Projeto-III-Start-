import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Inscricao.css';
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";

const mockEvents = [
  { id: 'evt1', name: 'Palestra de Abertura', date: '2025-10-20T09:00:00', vacancies: 15 },
  { id: 'evt2', name: 'Workshop de Design Thinking', date: '2025-10-20T14:00:00', vacancies: 5 },
  { id: 'evt3', name: 'Mesa Redonda: O Futuro das Startups', date: '2025-10-21T11:00:00', vacancies: 8 },
];

const Inscricao = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 500);
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
    if (selectedEvents.length === 0) {
      setError('Selecione pelo menos um evento para se inscrever.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const userId = 'ID_DO_USUARIO_LOGADO';
      const response = await axios.post('https://localhost:44367/api/subscriptions', {
        userId,
        eventIds: selectedEvents,
      });
      if (response.status === 200) {
        setSuccess('Inscrição realizada com sucesso!');
        setTimeout(() => navigate('/meus-eventos'), 2000);
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
              {events.map(event => (
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
