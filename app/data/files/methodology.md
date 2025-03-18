# Methodology & Process Overview

## Research Background & Motivation
- Alzheimer's disease is a major cause of cognitive decline in the U.S. with few effective treatments.
- We were inspired by a CSU professor’s research on inflammation using nanoligamers  
  (see: [N. Inflammation Research Article](https://jneuroinflammation.biomedcentral.com/articles/10.1186/s12974-024-03182-9)).
- Our original goal was to use yeast to mimic the nanoligamer approach. However, we learned:
  - Nanoligamers are custom-made by a Colorado company.
  - Saccharomyces cerevisiae cannot produce them.
- This led us to focus on the broader inflammasome system and the proteins that build up with aging, contributing to neurodegenerative diseases.
- With many questionable studies on Alzheimer’s and neuroinflammation, we saw an opportunity to make a real contribution.

## Experimental Protocols

### Plasmid System Design
- **E. coli Plasmid (pPOP2-E):**
  - A high-copy, Ampicillin-resistant plasmid containing the human POP2 gene.
  - Features a T7 promoter and designated restriction sites.
- **Yeast Plasmid (pRS423-GAL or similar):**
  - Intended to drive expression in yeast with the GAL promoter.
  - Our goal was to subclone POP2 into this vector without disrupting the GAL promoter.

### Transformation & Cloning Process
- **Initial Strategy:**
  - Planned to use NotI and XhoI sites for subcloning.
  - Issue: The XhoI site would remove or disrupt the GAL promoter.
- **Alternative Approaches Explored:**
  - Considered NotI with SacII. However, SacII:
    - Is designed to work with a coenzyme.
    - Does not ligate well under our conditions.
  - In our ordering process, we mistakenly used the wrong enzymes:
    - The POP2 fragment should have been cut with BtgI and NotI instead of NotI and XhoI.
- **Experimental Steps Taken:**
  - Conducted the experiment twice using SacII and NotI.
  - Used an imager and a lightbox to check for protein expression but did not detect the protein.
- **Current Pivot:**
  - Due to these issues and a tight deadline (2 weeks before MURALS), we have decided to pivot:
    - We will exclude the yeast expression comparison.
    - Instead, we plan to re-amplify POP2 by PCR and use Gibson Assembly (or Golden Gate Assembly) to add correct flanking sites.
  
### Enzyme Titration & Digestion Optimization
- **Professor’s Recommendations:**
  - Titrate enzyme units: Use about 1–2 μL of enzyme (at the supplied units/μL) per microgram of DNA.
  - Perform 2-fold serial dilutions while keeping DNA concentration constant.
  - For example, in a 40 μL reaction, adding 2 μL of enzyme may be optimal so that after the initial cut, the enzyme becomes limiting.
  - Consider longer or multiple short digests to improve efficiency without over-digesting critical regions like the GAL promoter.

## Decision-Making Process & Collaboration
- Extensive team discussions and literature reviews led us from the nanoligamer idea to a broader focus on neuroinflammation.
- We initially planned to compare protein expression in E. coli and yeast.
- Challenges with restriction site selection and enzyme compatibility forced us to pivot.
- Regular feedback from mentors and a CSU professor helped shape our new approach.
- Our team now aims to refine the cloning process quickly using alternative methods (PCR + Gibson Assembly) to meet our tight deadline.

## Clarifying Questions
- **Restriction Site Alternatives:**  
  Which alternative restriction sites in pRS423-GAL (or another yeast shuttle vector) have you considered that might preserve the GAL promoter?
- **Enzyme Titration Details:**  
  Do you have specific DNA concentrations and reaction volumes that we should use for the titration experiment? Would a 2-fold serial dilution series starting at 2 μL enzyme per μg of DNA work?
- **PCR vs. Partial Digest:**  
  Would re-PCR of the POP2 gene with new flanking sites be faster and less risky than optimizing the partial digest conditions?
- **Cloning Method Alternatives:**  
  Are Gibson Assembly or Golden Gate Assembly viable options given your available resources and timeline? Do you already have the necessary reagents and primer designs?
- **Local Lab Resources:**  
  Have you identified any non-CSU labs in Colorado that might provide a compatible yeast vector or additional cloning support?
- **Verification Methods:**  
  Besides gel electrophoresis, are there other rapid verification methods you plan to use for checking the integrity of the digest and ligation (e.g., colony PCR)?

