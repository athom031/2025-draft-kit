import React, { useState, useEffect } from "react";
import { rankings } from "./data/rankings";
import "./App.css";

function App() {
  const [players, setPlayers] = useState(rankings);
  const [draftedPlayers, setDraftedPlayers] = useState([]);
  const [positionFilter, setPositionFilter] = useState("ALL");
  const [tierFilter, setTierFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("overall_ranking");
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique positions for filter
  const positions = ["ALL", ...new Set(rankings.map((p) => p.position))];
  const tiers = ["ALL", ...new Set(rankings.map((p) => p.tier))];

  // Filter and sort players
  const filteredPlayers = players
    .filter((player) => !draftedPlayers.includes(player.id))
    .filter(
      (player) => positionFilter === "ALL" || player.position === positionFilter
    )
    .filter(
      (player) => tierFilter === "ALL" || player.tier === parseInt(tierFilter)
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
      if (sortBy === "tier") return a.tier - b.tier;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const handleDraftPlayer = (playerId) => {
    setDraftedPlayers((prev) => [...prev, playerId]);
  };

  const handleUndraftPlayer = (playerId) => {
    setDraftedPlayers((prev) => prev.filter((id) => id !== playerId));
  };

  const getTierColor = (tier) => {
    const colors = {
      1: "#FFD700", // Gold
      2: "#C0C0C0", // Silver
      3: "#CD7F32", // Bronze
      4: "#FF6B6B", // Red
      5: "#4ECDC4", // Teal
      6: "#45B7D1", // Blue
      7: "#96CEB4", // Green
      8: "#FFEAA7", // Yellow
      9: "#DDA0DD", // Plum
      10: "#98D8C8", // Mint
      11: "#F7DC6F", // Light Yellow
      12: "#BB8FCE", // Light Purple
      13: "#85C1E9", // Light Blue
      14: "#F8C471", // Light Orange
      15: "#82E0AA", // Light Green
      16: "#F1948A", // Light Red
      17: "#D7BDE2", // Light Lavender
      18: "#A9CCE3", // Light Sky Blue
      19: "#F9E79F", // Light Gold
      20: "#D5A6BD", // Light Pink
      21: "#A3E4D7", // Light Mint
      22: "#FAD7A0", // Light Peach
      23: "#D2B4DE", // Light Violet
      24: "#AED6F1", // Light Blue
      25: "#F5B7B1", // Light Salmon
      26: "#D5F4E6", // Light Mint
    };
    return colors[tier] || "#E8E8E8";
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
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="filter-select"
          >
            {tiers.map((tier) => (
              <option key={tier} value={tier}>
                {tier === "ALL" ? "All Tiers" : `Tier ${tier}`}
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
            <option value="tier">Sort by Tier</option>
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
            <div
              key={player.id}
              className="player-card"
              style={{ borderLeft: `4px solid ${getTierColor(player.tier)}` }}
            >
              <div className="player-header">
                <span className="player-name">{player.name}</span>
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
                <div className="tier">Tier {player.tier}</div>
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
                  <div
                    key={playerId}
                    className="drafted-player"
                    style={{
                      borderLeft: `4px solid ${getTierColor(player.tier)}`,
                    }}
                  >
                    <div className="player-header">
                      <span className="player-name">{player.name}</span>
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
                      <div className="tier">Tier {player.tier}</div>
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
