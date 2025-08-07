# Dynasty Draft Kit 2025

A modern React web application for managing dynasty fantasy football drafts with Boris rankings.

## Features

- **Player Rankings**: 200 players ranked by Boris with tiers, overall rankings, and position rankings
- **Draft Tracking**: Mark players as drafted/undrafted with persistent state
- **Advanced Filtering**: Filter by position, tier, and search by name/team
- **Multiple Sort Options**: Sort by overall rank, position rank, tier, or name
- **Visual Design**: Color-coded tiers and positions with modern UI
- **Responsive**: Works on desktop, tablet, and mobile devices

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Usage

### Filtering Players

- **Position Filter**: Select specific positions (QB, RB, WR, TE, DST, K) or view all
- **Tier Filter**: Filter by specific tiers (1-26) or view all tiers
- **Search**: Type player names or team names to quickly find players

### Sorting Options

- **Overall Rank**: Default sorting by Boris overall rankings
- **Position Rank**: Sort by ranking within each position
- **Tier**: Sort by tier number
- **Name**: Alphabetical sorting

### Draft Management

- **Draft a Player**: Click the "Draft" button on any player card
- **Undraft a Player**: Click "Undraft" in the drafted players section
- **Reset Draft**: Clear all drafted players with the reset button

### Visual Indicators

- **Tier Colors**: Each tier has a unique color on the left border
- **Position Badges**: Color-coded position indicators
- **Rankings**: Overall rank and position rank displayed on each card

## Data Structure

The rankings include:

- **200 total players/teams**
- **All NFL positions**: QB, RB, WR, TE, DST, K
- **College prospects**: Marked with their school as team
- **Current NFL teams**: Updated as of 2025 season
- **Boris tiers**: 1-26 with detailed rankings

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Technologies Used

- **React 18**: Modern React with hooks
- **CSS3**: Custom styling with gradients and animations
- **Local Storage**: Draft state persistence (coming soon)
- **Responsive Design**: Mobile-first approach

## Data Source

Rankings based on Boris dynasty rankings for the 2025 season, converted from CSV format with current team and position information.
