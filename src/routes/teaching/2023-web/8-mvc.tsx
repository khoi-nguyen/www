const meta: Metadata = {
  title: 'Model-View-Controller',
  description: 'ORM and MVC',
}

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Rappel: promesses et asynchronisme">
        <p>
          Certaines opérations nécéssitent du temps avant que la réponse arrive (e.g{' '}
          <code>fetch</code>). Pour ne pas bloquer le main thread, elles retournent une{' '}
          <strong>promesse de réponse</strong>.
        </p>
        {js.hl`
          const value = fetch('nguyen.me.uk') // value est une promesse
        `}
        <p>
          Plus tard, la promesse sera <strong>résolue</strong>, et fournira la réponse attendue
        </p>
        <h3>
          ES2017: <code>async/await</code>
        </h3>
        <p>
          Une fonction marquée <code>async</code> peut être "mise en pause". Chaque instruction
          marquée <code>await</code> libère le main thread jusqu'à ce qu'elle puisse retourner le{' '}
          <strong>résultat</strong> de la promesse. La fonction elle-même est modifiée pour
          retourner une promesse.
        </p>
        {js.hl`
          async function fetchPlanet(id) {
            const res = await fetch('https://laboweb.ecam.be/planet/' + id);
            const json = await res.json();
            return json;
          }
        `}
      </Slide>
      <Slide
        title={() => (
          <>
            <Abbr key="ORM" />
          </>
        )}
      >
        <Environment name="Objectif">
          <p>
            Manipuler les entrées de la base de données comme <strong>objets</strong>.
          </p>
        </Environment>
        <Example title="Créer un utilisateur avec un ORM">
          {js.hl`
            const user = new User();
            user.update({ name: "Tuxie", language: "es" })
            user.save();
          `}
        </Example>
        <Question pluralize>
          <ul>
            <li>Quelles sont les avantages et les inconvénients de cette approche?</li>
            <li>Pourquoi emploie-t-on l'orienté objet?</li>
          </ul>
        </Question>
      </Slide>
      <Slide title="Un ORM simple">
        <Instruction pluralize>
          <Editor lang="bash">
            {py.raw`
              git clone https://github.com/khoi-nguyen/LW3L-orm
              npm install
              npm run dev
            `}
          </Editor>
        </Instruction>
        <Remark>
          <p>
            Cet <Abbr key="ORM" /> est écrit à des fins didactiques.
          </p>
        </Remark>
      </Slide>
      <Slide title="Modèle: configuration">
        <p>
          La classe Modèle génère les requêtes SQL à votre place, mais elle a besoin de quelques
          informations
        </p>
        <Editor>
          {py.raw`
            class Model {
              static table = "";
              static primary = [];
            }
          `}
        </Editor>
        <p>
          Ceci se fait par l'<strong>héritage</strong>:
        </p>
        <Editor>
          {py.raw`
            class Task extends Model {
              static table = "schema.tasks";
              static primary = ["id"];
            }

            class User extends Model {
              static table = "schema.users";
              static primary = ["id"];
            }
          `}
        </Editor>
      </Slide>
      <Slide title="Modèle: utilisation">
        <Example title="Créer une entrée">
          {js.hl`
            const task = new Task();
            task.update({ task: "Feed Tuxie" });
            await task.save();
          `}
        </Example>
        <Example title="Supprimer une entrée">
          {js.hl`
            await Task.delete({ task: "Feed Tuxie" });
          `}
        </Example>
        <Example title="Modifier une entrée">
          {js.hl`
            const task = await Task.load({ id: 3 });
            task.update({ task: "Buy fish" });
            await task.save();
          `}
        </Example>
        <Example title="Lister des entrées">
          {js.hl`
            const tasks = await Task.loadMany();
          `}
        </Example>
      </Slide>
      <Slide title="Code de model.js">
        <Github repo="khoi-nguyen/LW3L-orm" path="models/Model.js" lang="js" />
      </Slide>
      <Slide title="MVC">
        <Definition>
          <p>
            <Abbr key="MVC" /> est un design pattern qui sépare les <strong>modèles</strong> et les{' '}
            <strong>vues</strong> des <strong>contrôleurs</strong>.
          </p>
        </Definition>
        <dl>
          <dt>Modèle</dt>
          <dd>Données et logique business</dd>
          <dt>Vue</dt>
          <dd>Interface de l'utilisateur</dd>
          <dt>Contrôleur</dt>
          <dd>Orchestre la vue et le modèle</dd>
        </dl>
        <p>
          L'objectif est d'écrire du code <strong>maintenable</strong> et{' '}
          <strong>bien organisé</strong>.
        </p>
        <Remark>
          <p>
            Nous allons implémenter ce design pattern <strong>purement côté serveur</strong>. Ceci
            est en opposition avec la tendance actuelle de faire beaucoup de travail côté client.
          </p>
        </Remark>
      </Slide>
      <Slide title="MVC en pratique">
        <ul>
          <li>
            <code>models/</code>: un fichier par modèle {tex`\approx`} table
          </li>
          <li>
            <code>views/</code>: templates EJS.
          </li>
          <li>
            <code>controllers/</code>
          </li>
        </ul>
      </Slide>
      <Slide title="Exemple de question d'examen">
        <p>
          Votre nom est Mohamed Henni et une partie non négligeable de votre travaille consiste à
          régulièrement acheter des télévisions. Vous aimeriez une interface Web qui tienne deux
          listes: une liste de télévisions usées, et une liste de télévisions que vous aimeriez
          acheter. Votre interface doit afficher le montant total dépensé en télévisions.
        </p>
        <p>
          Pour chaque télévision, vous aimeriez afficher la marque, le prix et la taille. Pour les
          télévisions achetées, vous aimeriez également indiquer si elle est encore fonctionnelle ou
          sinon comment la télévision a été cassée (batte, tentative de roue, etc.).
        </p>
        <p>
          Une télévision est tout d'abord ajoutée à la liste des télévisions désirées. Cette liste
          comporte des boutons pour indiquer que la télévision a été achetée. En cliquant sur le
          bouton, la télévision passe à la liste des télévisions achetées, mais fonctionnelles. Il
          sera ensuite possible de préciser comment elle aura été cassée.
        </p>
        <ul>
          <li>Structure MVC avec une table SQL</li>
          <li>Publier sur votre VM</li>
          <li>Bonus: si c'est une single page application</li>
          <li>
            Bonus++: si c'est une single page application quand l'utilisateur peut exécuter du
            Javascript, mais l'application fonctionne quand même sans Javascript.
          </li>
        </ul>
      </Slide>
    </Slideshow>
  )
}
