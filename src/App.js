import React, { useState, useEffect } from "react";
import { rankings } from "./data/rankings";
import "./App.css";

function App() {
  const [players, setPlayers] = useState(rankings);
  const [draftedPlayers, setDraftedPlayers] = useState([]);
  const [positionFilter, setPositionFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("overall_ranking");
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique positions for filter
  const positions = ["ALL", ...new Set(rankings.map((p) => p.position))];

  // Filter and sort players
  const filteredPlayers = players
    .filter((player) => !draftedPlayers.includes(player.id))
    .filter(
      (player) => positionFilter === "ALL" || player.position === positionFilter
    )
    .filter(
      (player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.team.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "overall_ranking")
        return a.overall_ranking - b.overall_ranking;
      if (sortBy === "position_ranking")
        return a.position_ranking - b.position_ranking;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const handleDraftPlayer = (playerId) => {
    setDraftedPlayers((prev) => [...prev, playerId]);
  };

  const handleUndraftPlayer = (playerId) => {
    setDraftedPlayers((prev) => prev.filter((id) => id !== playerId));
  };

  const getPositionColor = (position) => {
    const colors = {
      QB: "#FF6B6B",
      RB: "#4ECDC4",
      WR: "#45B7D1",
      TE: "#96CEB4",
      DST: "#F7DC6F",
      K: "#BB8FCE",
    };
    return colors[position] || "#E8E8E8";
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dynasty Draft Kit 2025</h1>
        <div className="stats">
          <span>Available: {filteredPlayers.length}</span>
          <span>Drafted: {draftedPlayers.length}</span>
          <span>Total: {players.length}</span>
        </div>
      </header>

      <div className="controls">
        <div className="filters">
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="filter-select"
          >
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos === "ALL" ? "All Positions" : pos}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="overall_ranking">Sort by Overall Rank</option>
            <option value="position_ranking">Sort by Position Rank</option>
            <option value="name">Sort by Name</option>
          </select>

          <input
            type="text"
            placeholder="Search players or teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <button onClick={() => setDraftedPlayers([])} className="reset-button">
          Reset Draft
        </button>
      </div>

      <div className="content">
        <div className="players-grid">
          {filteredPlayers.map((player) => (
            <div key={player.id} className="player-card">
              <div className="player-header">
                <span className="player-name">
                  {player.name}
                  {player.isRookie && (
                    <span className="rookie-badge">ROOKIE</span>
                  )}
                </span>
                <span
                  className="position-badge"
                  style={{ backgroundColor: getPositionColor(player.position) }}
                >
                  {player.position}
                </span>
              </div>

              <div className="player-details">
                <div className="team">{player.team}</div>
                <div className="rankings">
                  <span className="overall-rank">
                    #{player.overall_ranking}
                  </span>
                  <span className="position-rank">
                    #{player.position_ranking} {player.position}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDraftPlayer(player.id)}
                className="draft-button"
              >
                Draft
              </button>
            </div>
          ))}
        </div>

        {draftedPlayers.length > 0 && (
          <div className="drafted-section">
            <h2>Drafted Players ({draftedPlayers.length})</h2>
            <div className="drafted-grid">
              {draftedPlayers.map((playerId) => {
                const player = players.find((p) => p.id === playerId);
                return (
                  <div key={playerId} className="drafted-player">
                    <div className="player-header">
                      <span className="player-name">
                        {player.name}
                        {player.isRookie && (
                          <span className="rookie-badge">ROOKIE</span>
                        )}
                      </span>
                      <span
                        className="position-badge"
                        style={{
                          backgroundColor: getPositionColor(player.position),
                        }}
                      >
                        {player.position}
                      </span>
                    </div>

                    <div className="player-details">
                      <div className="team">{player.team}</div>
                      <div className="rankings">
                        <span className="overall-rank">
                          #{player.overall_ranking}
                        </span>
                        <span className="position-rank">
                          #{player.position_ranking} {player.position}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleUndraftPlayer(playerId)}
                      className="undraft-button"
                    >
                      Undraft
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
