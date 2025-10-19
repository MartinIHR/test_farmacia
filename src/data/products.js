const products = [
  {
    id: 'p1',
    name: 'Paracetamol 500mg (20 tabl.)',
    price: 4.99,
    image: 'https://picsum.photos/seed/med1/600/400',
    description: 'Analgésico y antipirético. Uso adulto.',
    category: 'Analgesic',
    requiresPrescription: false,
    stockByLocation: {
      'Santiago': 12,
      'Providencia': 5,
      'Las Condes': 0,
      'Maipú': 8
    }
  },
  {
    id: 'p2',
    name: 'Ibuprofeno 400mg (10 tabl.)',
    price: 3.49,
    image: 'https://picsum.photos/seed/med2/600/400',
    description: 'Antiinflamatorio para uso ocasional.',
    category: 'Analgesic',
    requiresPrescription: false,
    stockByLocation: {
      'Santiago': 0,
      'Providencia': 2,
      'Las Condes': 1,
      'Maipú': 4
    }
  },
  {
    id: 'p3',
    name: 'Antibiótico ABC 250mg',
    price: 19.99,
    image: 'https://picsum.photos/seed/med3/600/400',
    description: 'Antibiótico bajo prescripción médica. No vender sin receta.',
    category: 'Antibiotic',
    requiresPrescription: true,
    stockByLocation: {
      'Santiago': 3,
      'Providencia': 0,
      'Las Condes': 2,
      'Maipú': 0
    }
  }
];

export default products;