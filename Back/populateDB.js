const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Assignment = require('./model/assignment'); // Assure-toi que le chemin est bon

// 🔗 Connexion à ta propre base MongoDB (modifie si nécessaire)
mongoose.connect('mongodb+srv://mbds:UniCA25@assignments.mxszzes.mongodb.net/assignments?retryWrites=true&w=majority'
, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const matieres = [
  { nom: 'Technologies Web', prof: 'Mr Buffa', image: 'assets/img/web.png' },
  { nom: 'Base de Données', prof: 'Mme Diaby', image: 'assets/img/bdd.png' },
  { nom: 'Big Data', prof: 'Mr Yao', image: 'assets/img/bigdata.png' },
  { nom: 'DevOps', prof: 'Mme Akissi', image: 'assets/img/devops.png' }
];

// 🧠 Génération d'un devoir fictif
const createFakeAssignment = () => {
  const matiere = faker.helpers.arrayElement(matieres);
  return new Assignment({
    nom: faker.hacker.phrase(),
    dateDeRendu: faker.date.future(),
    rendu: faker.datatype.boolean(),
    auteur: faker.person.fullName(),
    matiere: matiere.nom,
    prof: matiere.prof,
    imageMatiere: matiere.image,
    note: faker.number.int({ min: 0, max: 20 }),
    remarques: faker.lorem.sentence()
  });
};

// 🚀 Remplir la base
const insertAssignments = async () => {
  try {
    await Assignment.deleteMany({}); // Vide la base (optionnel)
    const assignments = [];

    for (let i = 0; i < 1000; i++) {
      assignments.push(createFakeAssignment());
    }

    await Assignment.insertMany(assignments);
    console.log('✅ 1000 devoirs insérés avec succès !');
  } catch (err) {
    console.error('❌ Erreur :', err);
  } finally {
    mongoose.disconnect();
  }
};

insertAssignments();
