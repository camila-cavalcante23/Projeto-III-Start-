import React, { useEffect, useState } from "react";
import "./EditarEventos.css";
import axios from "axios";
import Navbar from "../../components/Navbar/NavbarAdmin";

function EditarEventos() {
  const [eventos, setEventos] = useState([]);

  // Busca eventos na API ao carregar
  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await axios.get("https://localhost:44367/eventos");
      setEventos(response.data);
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
    }
  };

  const handleSalvar = async (id) => {
    const evento = eventos.find((e) => e.id === id);
    try {
      await axios.put(`https://localhost:44367/eventos/${id}`, evento);
      alert("Evento salvo com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar evento:", err);
      alert("Erro ao salvar.");
    }
  };

  const handleExcluir = async (id) => {
    try {
      await axios.delete(`https://localhost:44367/eventos/${id}`);
      setEventos((prev) => prev.filter((e) => e.id !== id));
      alert("Evento excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir evento:", err);
      alert("Erro ao excluir.");
    }
  };

  const handleChange = (id, field, value) => {
    setEventos((prev) =>
      prev.map((ev) =>
        ev.id === id ? { ...ev, [field]: value } : ev
      )
    );
  };

  return (
    <div className="editar-usuarios">
      <Navbar />
    <div className="container-editar">
      <h2>Editar Eventos</h2>
      <div className="grid-cards">
        {eventos.map((evento) => (
          <div className="card" key={evento.id}>
            <img src={evento.imagem} alt={evento.titulo} />
            <input
              type="text"
              value={evento.titulo}
              onChange={(e) => handleChange(evento.id, "titulo", e.target.value)}
            />
            <textarea
              value={evento.descricao}
              onChange={(e) => handleChange(evento.id, "descricao", e.target.value)}
            />
            <div className="card-buttons">
              <button className="salvar" onClick={() => handleSalvar(evento.id)}>
                Salvar
              </button>
              <button className="excluir" onClick={() => handleExcluir(evento.id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default EditarEventos;
