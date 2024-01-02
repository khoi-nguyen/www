import meta from './index.json'

export default () => {
  const location = useLocation()
  return (
    <Page meta={meta}>
      <h1>Ressources</h1>
      <Explorer pattern={`${location.pathname}/?[0-9a-z]+-.*json$`} showPDF />
      <h2>Solution de certains exercices</h2>
      <h3>Refuge animalier</h3>
      {html.hl`
      <form>
        <label>Type de l'animal</label>
        <select name="type" value="cat">
          <option value="dog" selected="selected">chien</option>
          <option value="cat">chat</option>
        </select>
        <label>Nom de l'animal</label>
        <input name="name" type="text" />
        <label>Âge de l'animal</label>
        <input name="age" type="number" />
        <button onclick="addAnimal()" type="button">Ajouter</button>
      </form>
      <ul id="animals">
      </ul>
      <p>La moyenne d'âge des chiens est <span id="dogMean">0</span></p>
      <p>La moyenne d'âge des chats est <span id="catMean">0</span></p>

      `}
      {js.hl`
        // Fonction permettant de créer un objet spécial
        // qui met automatiquement le DOM à jour à chaque changement
        //
        // Exemple d'utilisation:
        //
        // const age = createStateVar('age');
        // age.value = 3 // L'élément avec id 'age' affiche 3
        // age.value = 5 // L'élément avec id 'age' affiche 5
        const createStateVar = (id, template = x => x) => ({
          get value() {
            return this.state;
          },
          set value(newVal) {
            document.getElementById(id).innerHTML = template(this.state = newVal);
          },
        })

        // Fonction décrivant comment afficher les animaux
        const showAnimal = (animal) => \`<li>\${animal.name} (\${animal.type}), \${animal.age} ans</li>\`;

        // État du programme
        // Tout changement de ces variables sera automatiquement propagé au DOM
        const animals = createStateVar('animals', (list) => list.map(showAnimal).join(''));
        const dogMean = createStateVar('dogMean');
        const catMean = createStateVar('catMean');

        // Calcule la moyenne pour un type d'animal (dog/cat)
        function mean(type) {
          const filtered = animals.value.filter(animal => animal.type === type);
          const sum = filtered.reduce((total, animal) => total + animal.age, 0);
          return filtered.length ? sum / filtered.length : 0;
        }

        // Fonction qui ajoute les animaux à partir du formulaire
        function addAnimal() {
          const form = Object.fromEntries(new FormData(document.forms[0]))
          animals.value = [...(animals.value || []), { ...form, age: parseInt(form.age) }];
          dogMean.value = mean('dog')
          catMean.value = mean('cat')
        }
      `}
    </Page>
  )
}
