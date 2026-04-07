export type GlossaryCategory = 'Proteins' | 'Nucleic Acids' | 'Tools'

export interface GlossaryTerm {
  term: string
  definition: string
  category: GlossaryCategory
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Allele',
    definition:
      'An allele is a variant form of a gene at a specific locus. Different alleles can produce different traits, such as alternative pigment, enzyme, or disease-risk outcomes. Population genetics often tracks allele frequency to understand inheritance patterns.',
    category: 'Nucleic Acids',
  },
  {
    term: 'Alignment',
    definition:
      'Alignment arranges two or more sequences so that similar positions line up. It helps reveal conserved regions, functional motifs, and evolutionary relationships. Good alignments make it easier to compare genes, proteins, or structural features across species.',
    category: 'Tools',
  },
  {
    term: 'Amino Acid',
    definition:
      'Amino acids are the building blocks of proteins. Cells use 20 standard amino acids to build polypeptides with different structures and functions. Their side chains determine chemical behavior such as charge, polarity, and hydrophobicity.',
    category: 'Proteins',
  },
  {
    term: 'BLAST',
    definition:
      'BLAST stands for Basic Local Alignment Search Tool. It compares a query sequence against databases to find similar sequences quickly and is widely used for identifying genes and proteins. Researchers use it to infer function, detect homologs, and guide annotation.',
    category: 'Tools',
  },
  {
    term: 'Codon',
    definition:
      'A codon is a three-nucleotide sequence in messenger RNA that specifies an amino acid or stop signal. Codons are the code words that connect nucleotide sequences to protein sequence. The genetic code is nearly universal, which makes codons a core concept in molecular biology.',
    category: 'Nucleic Acids',
  },
  {
    term: 'Chromosome',
    definition:
      'A chromosome is a packaged DNA molecule that carries many genes. In eukaryotes, chromosomes are organized with proteins to fit inside the nucleus and support accurate inheritance. Changes in chromosome number or structure can affect development and disease.',
    category: 'Nucleic Acids',
  },
  {
    term: 'DNA',
    definition:
      'DNA, or deoxyribonucleic acid, stores the hereditary instructions for life. Its sequence encodes genes, regulatory elements, and other information needed to build and maintain cells. The double helix structure helps DNA copy accurately during replication.',
    category: 'Nucleic Acids',
  },
  {
    term: 'E-value',
    definition:
      'The E-value estimates how many matches of similar quality might occur by chance in a database search. Lower E-values indicate more significant hits and stronger evidence of similarity. In practice, it helps separate real biological signals from noise.',
    category: 'Tools',
  },
  {
    term: 'Exon',
    definition:
      'An exon is a segment of a gene that remains in the mature RNA after splicing. In protein-coding genes, exons usually contain the sequence that is translated into amino acids. Alternative splicing can combine exons in different ways to expand protein diversity.',
    category: 'Nucleic Acids',
  },
  {
    term: 'Enzyme',
    definition:
      'An enzyme is a biological catalyst, usually a protein, that speeds up chemical reactions without being consumed. Enzymes make metabolism efficient by lowering the energy needed for reactions. Their active sites bind specific substrates and help control cellular chemistry.',
    category: 'Proteins',
  },
  {
    term: 'Gene',
    definition:
      'A gene is a segment of DNA that encodes a functional product, usually a protein or a functional RNA. Genes are the basic units of inheritance and are often regulated in complex ways. Promoters, enhancers, and epigenetic marks can influence when a gene is active.',
    category: 'Nucleic Acids',
  },
  {
    term: 'Genome',
    definition:
      'A genome is the complete set of genetic material in an organism. It includes all chromosomes plus any extra DNA such as mitochondrial or plasmid sequences. Genome size and organization vary widely across life forms.',
    category: 'Nucleic Acids',
  },
  {
    term: 'Hormone',
    definition:
      'A hormone is a signaling molecule that coordinates activity between cells, tissues, and organs. Many hormones are proteins or peptides that travel through the body to trigger specific responses. Others, such as steroid hormones, are lipids derived from cholesterol.',
    category: 'Proteins',
  },
  {
    term: 'Homology',
    definition:
      'Homology means shared evolutionary ancestry between sequences or structures. In bioinformatics, homologous sequences often suggest related function or a common origin. Homology is a binary concept: features are either homologous or they are not.',
    category: 'Tools',
  },
  {
    term: 'Intron',
    definition:
      'An intron is a segment of a gene that is transcribed into RNA but removed before translation. Introns are common in eukaryotes and can influence gene regulation, splicing, and evolution. Some introns also contain regulatory elements or small RNAs.',
    category: 'Nucleic Acids',
  },
  {
    term: 'Lipid',
    definition:
      'Lipids are a broad class of fat-like molecules, including fats, oils, waxes, and cholesterol. They are central to membranes, energy storage, and signaling. Because they are hydrophobic, lipids often assemble into bilayers or droplets.',
    category: 'Proteins',
  },
  {
    term: 'Messenger RNA',
    definition:
      'Messenger RNA, or mRNA, carries the coding sequence copied from DNA to the ribosome. Ribosomes read mRNA codons to assemble proteins during translation. In many cells, mRNA is short-lived so protein production can change quickly.',
    category: 'Nucleic Acids',
  },
  {
    term: 'Nucleotide',
    definition:
      'A nucleotide is the building block of DNA and RNA. It contains a sugar, a phosphate group, and a nitrogenous base such as A, T, U, C, or G. Nucleotides also serve as energy carriers and signaling molecules in cells.',
    category: 'Nucleic Acids',
  },
  {
    term: 'PDB',
    definition:
      'PDB stands for Protein Data Bank, a public repository for 3D structures of proteins, nucleic acids, and complexes. Researchers use it to study molecular shape, function, and interactions. The archive is a key reference for structural biology and drug design.',
    category: 'Tools',
  },
  {
    term: 'Polypeptide',
    definition:
      'A polypeptide is a chain of amino acids linked by peptide bonds. One or more polypeptides fold into a functional protein with a specific biological role. The order of amino acids determines how the chain folds and behaves.',
    category: 'Proteins',
  },
  {
    term: 'Protein',
    definition:
      'Proteins are versatile biomolecules built from amino acids. They form enzymes, structural scaffolds, transporters, receptors, and many other functional molecules in cells. A protein’s 3D shape is often as important as its sequence.',
    category: 'Proteins',
  },
  {
    term: 'Promoter',
    definition:
      'A promoter is a DNA region near a gene that helps recruit RNA polymerase and start transcription. It acts like an on-switch for gene expression, though the exact controls vary by organism. Many promoters work together with enhancers and repressors.',
    category: 'Nucleic Acids',
  },
  {
    term: 'Ribosome',
    definition:
      'A ribosome is the molecular machine that translates mRNA into protein. It reads codons, matches tRNAs, and catalyzes peptide bond formation. Ribosomes contain both RNA and protein, making them a classic ribonucleoprotein complex.',
    category: 'Proteins',
  },
  {
    term: 'RNA',
    definition:
      'RNA, or ribonucleic acid, is a versatile nucleic acid involved in protein synthesis, regulation, and catalysis. Unlike DNA, RNA usually uses ribose sugar and uracil instead of thymine. Many RNAs do not encode proteins but instead help regulate or process information.',
    category: 'Nucleic Acids',
  },
  {
    term: 'Transcription',
    definition:
      'Transcription is the process of copying information from DNA into RNA. It is the first major step in gene expression and is tightly regulated in response to cellular needs. The resulting RNA can be processed further before it becomes functional.',
    category: 'Nucleic Acids',
  },
]
