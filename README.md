# POP2 Research Project

A Next.js application for visualizing and analyzing protein optimization research data.

## Features

- Interactive data visualization
- Protein structure viewer
- Temperature effects analysis
- Expression kinetics charts
- Research documentation
- Data upload capabilities

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Radix UI Components
- Shadcn UI
- NGL Viewer
- Recharts
- Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- pnpm 8+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory and add necessary environment variables:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

To create a production build:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── data/            # Data visualization pages
│   └── documentation/   # Documentation pages
├── components/          # React components
│   ├── ui/             # UI components
│   └── data-visualization/ # Data visualization components
├── public/             # Static files
└── styles/            # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Adding Your Own Content

### Data Files

1. Place your data files in the `public/data/files`