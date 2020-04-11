import React, { useState, useEffect } from "react";
import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post("repositories", {
        url: "https://github.com/euniorweb",
        title: "Jose Silva",
        techs: ["Node", "Express", "TypeScript", "React Native"],
      });
      setRepositories([...repositories, response.data]);
    } catch (error) {
      throw new Error("Error to save repository");
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    } catch (error) {
      throw new Error("Unexpected Error");
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={`repository-${repository.id}`}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
