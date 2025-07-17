import React, { useEffect, useState } from "react";
import "./EditarImagem.css"; // Assuming this CSS exists

import api from "../../services/api";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import { useAuth } from '../../context/AuthContext'; // Import useAuth

function EditarImagem() {
    const [imagens, setImagens] = useState([]); // Will store gallery items, each with its images
    const [mensagem, setMensagem] = useState(''); // For user feedback

    const { user } = useAuth(); // Get user from AuthContext

    // Effect to set Authorization header for all API calls
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            // Limpa o cabeçalho se não houver token (útil após logout)
            delete api.defaults.headers.common['Authorization'];
            setMensagem("Você não está autenticado. Faça login para acessar.");
        }
    }, [user]); // Re-run when user object changes (e.g., after login/logout)

    // Effect to fetch images on component mount and when authentication status changes
    useEffect(() => {
        // Only fetch if user is authenticated (or if token is present, depending on your auth flow)
        // A rota GET /Gallery não requer autorização, então podemos tentar buscar sempre.
        // Se a rota GET /Gallery no seu backend exigir autenticação, descomente a linha abaixo.
        // if (localStorage.getItem('authToken')) {
            fetchImagens();
        // } else {
        //     setMensagem("Faça login para ver e editar as imagens da galeria.");
        // }
    }, [user]); // Re-fetch when user object changes (e.g., after login)

    const fetchImagens = async () => {
        try {
            // Endpoint for getting all gallery items
            const response = await api.get("/Gallery");
            
            // ADIÇÃO PARA DEBUG: Logar a resposta completa do backend
            console.log("Resposta completa do backend para /Gallery:", response.data);
            
            // CORREÇÃO AQUI: Acessar response.data.data para obter o array real
            // Assuming response.data.data is a list of GalleryResponseDTO
            // Each GalleryResponseDTO has Id, Title, ImageDetails (List<ImageDetailsDTO>), UserId
            const fetchedGalleryItems = response.data.data.map(item => { // Alterado de response.data.map para response.data.data.map
                // ADIÇÃO PARA DEBUG: Logar cada item da galeria
                console.log("Processando item da galeria:", item);

                const displayUrl = (item.imageDetails && item.imageDetails.length > 0)
                    ? `data:image/${item.imageDetails[0].extension.substring(1)};base64,${item.imageDetails[0].base64}`
                    : 'https://placehold.co/150x150';
                
                // ADIÇÃO PARA DEBUG: Logar a URL de exibição gerada
                console.log("URL de exibição gerada:", displayUrl);

                return {
                    id: item.id,
                    titulo: item.title, // Map Title from backend to titulo for frontend
                    userId: item.userId,
                    imageDetails: item.imageDetails || [], // Store the full image details list
                    displayUrl: displayUrl
                };
            });
            setImagens(fetchedGalleryItems);
            setMensagem(""); // Clear message on successful fetch
        } catch (err) {
            console.error("Erro ao buscar imagens da galeria:", err);
            setMensagem("Erro ao carregar imagens da galeria. Verifique sua conexão ou autenticação.");
        }
    };

    // Handles changes for text inputs (like title)
    const handleChange = (id, field, value) => {
        setImagens((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    // Handles changes for file input (new image upload)
    const handleImageFileChange = async (id, file) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            const parts = base64String.split(';');
            const mimeType = parts[0].split(':')[1];
            const extension = '.' + mimeType.split('/')[1];
            const base64Data = parts[1].split(',')[1];

            setImagens((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              // Replace existing image details with new one (assuming one image per gallery item for simplicity)
                              imageDetails: [{ Base64: base64Data, Extension: extension }], 
                              displayUrl: `data:image/${extension.substring(1)};base64,${base64Data}`
                          }
                        : item
                )
            );
        };
        reader.readAsDataURL(file);
    };


    const handleSalvar = async (id) => {
        const itemToSave = imagens.find((i) => i.id === id);
        if (!itemToSave) {
            setMensagem("Item da galeria não encontrado para salvar.");
            return;
        }

        // Ensure UserId is available, either from state or AuthContext
        const currentUserId = itemToSave.userId || (user ? (user.nameid || user.sub) : null);
        if (!currentUserId) {
            setMensagem("Erro: ID do usuário não disponível para salvar a imagem. Faça login novamente.");
            return;
        }

        // CORREÇÃO AQUI: Ajustando os nomes das propriedades para PascalCase
        const payload = {
            Id: itemToSave.id, // Mudado de 'id' para 'Id'
            Title: itemToSave.titulo, // Mudado de 'title' para 'Title'
            ImageDetails: itemToSave.imageDetails, // Mudado de 'imageDetails' para 'ImageDetails'
            UserId: currentUserId // Mudado de 'userId' para 'UserId'
        };

        try {
            // Endpoint for updating a gallery item
            await api.put("/Gallery", payload); // PUT to /Gallery
            setMensagem("Imagem da galeria salva com sucesso!");
            fetchImagens(); // Re-fetch to ensure data consistency and update UI
        } catch (err) {
            console.error("Erro ao salvar imagem da galeria:", err);
            setMensagem("Erro ao salvar imagem da galeria. Tente novamente.");
            if (err.response && err.response.data) {
                console.error('Detalhes do erro do backend (JSON):', JSON.stringify(err.response.data, null, 2));
                setMensagem(err.response.data.message || 'Erro ao salvar imagem da galeria.');
            }
        }
    };

    const handleExcluir = async (id) => {
        try {
            // Endpoint for deleting a gallery item
            await api.delete(`/Gallery/${id}`); // DELETE to /Gallery/{id}
            setImagens((prev) => prev.filter((i) => i.id !== id));
            setMensagem("Imagem da galeria excluída com sucesso!");
        } catch (err) {
            console.error("Erro ao excluir imagem da galeria:", err);
            setMensagem("Erro ao excluir imagem da galeria. Tente novamente.");
            if (err.response && err.response.data) {
                console.error('Detalhes do erro do backend (JSON):', JSON.stringify(err.response.data, null, 2));
                setMensagem(err.response.data.message || 'Erro ao excluir imagem da galeria.');
            }
        }
    };

    return (
        <div className="editar-imagem">
            <NavbarAdmin />
            <div className="container-editar">
                <h2>Editar Imagens da Galeria</h2>
                {mensagem && <p className="mensagem">{mensagem}</p>} {/* Display messages */}
                <div className="grid-cards">
                    {imagens.map((imagem) => (
                        <div className="card" key={imagem.id}>
                            <img src={imagem.displayUrl} alt={imagem.titulo} />
                            <label>Título:</label>
                            <input
                                type="text"
                                value={imagem.titulo}
                                onChange={(e) => handleChange(imagem.id, "titulo", e.target.value)}
                            />

                            <label>Alterar Imagem:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageFileChange(imagem.id, e.target.files[0])}
                            />

                            <div className="card-buttons">
                                <button className="salvar" onClick={() => handleSalvar(imagem.id)}>
                                    Salvar
                                </button>
                                <button className="excluir" onClick={() => handleExcluir(imagem.id)}>
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

export default EditarImagem;
