# POP2 Research Project Website

This is the website for our undergraduate research project on human POP2 protein expression in E. coli and yeast systems.

## Adding Your Own Content

### Data Files

1. Place your data files in the `public/data/files` directory:
   - CSV files for expression data
   - PDF files for documentation
   - PDB files for protein structures
   - Any other relevant files

2. The files will be accessible at `/data/files/your-file-name.extension`

### Images

1. Place your images in the `public/images` directory
2. Reference them in your code as `/images/your-image.jpg`

### Interactive Data

1. Update the data in the API routes:
   - `app/api/expression-kinetics/route.ts`
   - `app/api/temperature-effects/route.ts`

2. Or modify the components to load data from your CSV files:
   - `components/data-visualization/expression-kinetics-chart.tsx`
   - `components/data-visualization/temperature-effects-chart.tsx`

### PyMOL Structure

1. Place your PDB file in `public/data/files/`
2. Update the `protein-structure-viewer.tsx` component to load your file:
   ```typescript
   // Change this line
   const structure = await stage.loadFile('/data/files/your-structure.pdb')

