export const curriculum = {
  sourceNote: 'VCAA-aligned sample scope for Victorian Curriculum F-10 Level 10 practice. Replace or extend only with verified VCAA curriculum statements and teacher-reviewed questions.',
  subjects: [
    {
      id: 'maths',
      name: 'Mathematics',
      description: 'Practice across number and algebra, measurement and geometry, and statistics and probability concepts commonly represented at Year 10.',
      levels: [
        { id: 'core', name: 'Core' },
        { id: 'extension', name: 'Extension' },
      ],
      strands: [
        {
          name: 'Number and Algebra',
          topics: [
            {
              name: 'Linear relationships and algebraic reasoning',
              questions: [
                { id: 'm-na-1', level: 'core', prompt: 'Solve 3x + 5 = 20.', options: ['x = 3', 'x = 5', 'x = 8', 'x = 15'], answer: 'x = 5', explanation: 'Subtract 5 from both sides, then divide 15 by 3.' },
                { id: 'm-na-2', level: 'core', prompt: 'Which equation has gradient 2 and y-intercept -1?', options: ['y = 2x - 1', 'y = -x + 2', 'y = x - 2', 'y = -2x - 1'], answer: 'y = 2x - 1', explanation: 'In y = mx + c, m is the gradient and c is the y-intercept.' },
                { id: 'm-na-3', level: 'extension', prompt: 'A line passes through (2, 5) and (6, 13). What is its gradient?', options: ['1', '2', '3', '4'], answer: '2', explanation: 'Gradient is change in y divided by change in x: (13 - 5) / (6 - 2) = 2.' },
                { id: 'm-na-4', level: 'extension', prompt: 'Factorise x² - 9.', options: ['(x - 3)(x + 3)', '(x - 9)(x + 1)', '(x - 3)²', 'x(x - 9)'], answer: '(x - 3)(x + 3)', explanation: 'This is a difference of squares: a² - b² = (a - b)(a + b).' },
              ],
            },
            {
              name: 'Indices, surds and financial mathematics',
              questions: [
                { id: 'm-na-5', level: 'core', prompt: 'Simplify 2³ x 2².', options: ['2⁵', '2⁶', '4⁵', '4⁶'], answer: '2⁵', explanation: 'When multiplying powers with the same base, add the indices.' },
                { id: 'm-na-6', level: 'core', prompt: 'A $200 item is discounted by 10%. What is the sale price?', options: ['$180', '$190', '$198', '$210'], answer: '$180', explanation: '10% of $200 is $20, so the sale price is $180.' },
                { id: 'm-na-7', level: 'extension', prompt: 'Simplify sqrt(50).', options: ['5sqrt(2)', '10sqrt(5)', '25sqrt(2)', '2sqrt(5)'], answer: '5sqrt(2)', explanation: 'sqrt(50) = sqrt(25 x 2) = 5sqrt(2).' },
                { id: 'm-na-8', level: 'extension', prompt: '$1000 earns 5% compound interest for 2 years. What is the value?', options: ['$1050', '$1100', '$1102.50', '$1150'], answer: '$1102.50', explanation: '1000 x 1.05² = 1102.50.' },
              ],
            },
          ],
        },
        {
          name: 'Measurement, Geometry, Statistics and Probability',
          topics: [
            {
              name: 'Trigonometry, similarity and data interpretation',
              questions: [
                { id: 'm-geo-1', level: 'core', prompt: 'In a right triangle, which ratio represents sin(theta)?', options: ['opposite / hypotenuse', 'adjacent / hypotenuse', 'opposite / adjacent', 'hypotenuse / opposite'], answer: 'opposite / hypotenuse', explanation: 'Sine compares the opposite side to the hypotenuse.' },
                { id: 'm-geo-2', level: 'core', prompt: 'What is the median of 4, 8, 9, 10, 14?', options: ['8', '9', '10', '14'], answer: '9', explanation: 'The median is the middle value when the data is ordered.' },
                { id: 'm-geo-3', level: 'extension', prompt: 'A ladder 5 m long leans against a wall at 60 degrees to the ground. Approximately how high up the wall does it reach?', options: ['2.5 m', '3.5 m', '4.3 m', '5.8 m'], answer: '4.3 m', explanation: 'Height = 5 x sin(60 degrees), approximately 4.33 m.' },
                { id: 'm-geo-4', level: 'extension', prompt: 'Two similar shapes have side lengths in the ratio 2:5. What is their area ratio?', options: ['2:5', '4:10', '4:25', '8:125'], answer: '4:25', explanation: 'Area scale factor is the square of the length scale factor.' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'science',
      name: 'Science',
      description: 'Practice across biological, chemical, physical, Earth and space sciences, with science inquiry and evidence-based reasoning.',
      levels: [
        { id: 'core', name: 'Core' },
        { id: 'extension', name: 'Extension' },
      ],
      strands: [
        {
          name: 'Science Understanding',
          topics: [
            {
              name: 'Genetics and evolution',
              questions: [
                { id: 's-bio-1', level: 'core', prompt: 'Where is genetic information mainly stored in a cell?', options: ['Nucleus', 'Ribosome', 'Cell membrane', 'Cytoplasm'], answer: 'Nucleus', explanation: 'In eukaryotic cells, DNA is mainly stored in the nucleus.' },
                { id: 's-bio-2', level: 'core', prompt: 'Which term describes different forms of the same gene?', options: ['Alleles', 'Cells', 'Organs', 'Enzymes'], answer: 'Alleles', explanation: 'Alleles are alternative forms of a gene.' },
                { id: 's-bio-3', level: 'extension', prompt: 'Why can natural selection change a population over generations?', options: ['Helpful inherited traits can become more common', 'All individuals change their DNA by choice', 'Every mutation is beneficial', 'Acquired traits are always inherited'], answer: 'Helpful inherited traits can become more common', explanation: 'Traits that improve survival or reproduction can be passed on more often.' },
                { id: 's-bio-4', level: 'extension', prompt: 'If two heterozygous parents carry a recessive allele, what is the expected chance of a child showing the recessive trait?', options: ['0%', '25%', '50%', '100%'], answer: '25%', explanation: 'A heterozygous cross gives a 1 in 4 chance of two recessive alleles.' },
              ],
            },
            {
              name: 'Chemical reactions and energy change',
              questions: [
                { id: 's-chem-1', level: 'core', prompt: 'Which observation often indicates a chemical reaction?', options: ['Gas bubbles form', 'A solid is cut smaller', 'Water freezes', 'Sugar dissolves'], answer: 'Gas bubbles form', explanation: 'Gas production can indicate new substances forming.' },
                { id: 's-chem-2', level: 'core', prompt: 'In a balanced chemical equation, atoms are conserved because...', options: ['matter is not created or destroyed', 'atoms disappear', 'products weigh nothing', 'reactants become energy only'], answer: 'matter is not created or destroyed', explanation: 'Balancing equations follows conservation of mass.' },
                { id: 's-chem-3', level: 'extension', prompt: 'What does an exothermic reaction do?', options: ['Transfers energy to the surroundings', 'Always needs light to begin', 'Absorbs all surrounding heat', 'Stops particle movement'], answer: 'Transfers energy to the surroundings', explanation: 'Exothermic reactions release energy, often as heat or light.' },
                { id: 's-chem-4', level: 'extension', prompt: 'Why does increasing temperature often increase reaction rate?', options: ['Particles collide more often and with more energy', 'Particles become larger atoms', 'Products turn back into reactants only', 'Mass is created'], answer: 'Particles collide more often and with more energy', explanation: 'Higher temperature increases particle kinetic energy and collision frequency.' },
              ],
            },
            {
              name: 'Motion, forces, energy, Earth and space',
              questions: [
                { id: 's-phys-1', level: 'core', prompt: 'What is the unit of force?', options: ['Newton', 'Joule', 'Watt', 'Volt'], answer: 'Newton', explanation: 'Force is measured in newtons.' },
                { id: 's-phys-2', level: 'core', prompt: 'Which energy store increases when an object is lifted higher?', options: ['Gravitational potential energy', 'Chemical energy', 'Sound energy', 'Elastic energy only'], answer: 'Gravitational potential energy', explanation: 'Objects higher in a gravitational field have more gravitational potential energy.' },
                { id: 's-phys-3', level: 'extension', prompt: 'A 2 kg object accelerates at 3 m/s². What is the net force?', options: ['1.5 N', '5 N', '6 N', '9 N'], answer: '6 N', explanation: 'Using F = ma, force = 2 x 3 = 6 N.' },
                { id: 's-phys-4', level: 'extension', prompt: 'Why do stars appear to move across the night sky?', options: ['Earth rotates on its axis', 'Stars orbit Earth daily', 'The Moon pulls stars along', 'The Sun pushes stars west'], answer: 'Earth rotates on its axis', explanation: 'Apparent daily motion of stars is caused by Earth rotation.' },
              ],
            },
          ],
        },
        {
          name: 'Science Inquiry',
          topics: [
            {
              name: 'Evidence, variables and fair testing',
              questions: [
                { id: 's-inq-1', level: 'core', prompt: 'In an experiment, what is the independent variable?', options: ['The variable deliberately changed', 'The result measured', 'A variable kept the same', 'The conclusion'], answer: 'The variable deliberately changed', explanation: 'The independent variable is the factor changed to test its effect.' },
                { id: 's-inq-2', level: 'core', prompt: 'Why should repeated trials be used?', options: ['To improve reliability', 'To avoid writing a method', 'To change every variable', 'To guarantee a preferred result'], answer: 'To improve reliability', explanation: 'Repeating trials helps identify variation and improves confidence in results.' },
                { id: 's-inq-3', level: 'extension', prompt: 'A graph shows a strong positive correlation. What can you conclude safely?', options: ['The variables are associated, but causation needs more evidence', 'One variable definitely causes the other', 'The data is invalid', 'There is no pattern'], answer: 'The variables are associated, but causation needs more evidence', explanation: 'Correlation alone does not prove causation.' },
                { id: 's-inq-4', level: 'extension', prompt: 'Why should a scientific claim reference evidence?', options: ['Evidence allows the claim to be tested and evaluated', 'Evidence makes opinions unnecessary forever', 'Evidence prevents all errors', 'Evidence replaces the need for reasoning'], answer: 'Evidence allows the claim to be tested and evaluated', explanation: 'Scientific explanations should connect claims to reliable evidence and reasoning.' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
