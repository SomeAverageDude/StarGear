
# StarGear

StarGear est un site de vente de jeux dématérialisés créé dans le cadre du cours 420-4GW-BB Applications Web Transactionelles.
## Rouler le site web sur votre ordinateur

### Créer une BD mongo dans docker
Ouvrez docker et dans un powershell entrez
```bash
docker run --name mongo -d -p 27017:27017 mongodb/mongodb-community-server:latest
```
Ouvrez le conteneur et voilà mongo fonctionne!
### 

### Faire fonctionner le site
Cloner le project dans le dossier de votre choix

```bash
  git clone https://github.com/SomeAverageDude/StarGear.git
```

Aller sur le dossier du projet

```bash
cd .\votreDossier\StarGear\StarGear-App\
```

Installer les dépendances

```bash
npm install
```
Ensuite installer les dépendances du serveur
```bash
cd .\serveur\
npm install
```
**Créer un fichier .env dans ce dossier et insérez-y les variables d'environnement**

Dans un terminal 

```bash
npm run dev
```

Dans un autre terminal roulez :
```bash
cd .\serveur\
```
Puis:
```bash
npm run dev
```
Dans un navigateur aller à l'adresse et acheter tous les jeux dont vous avez toujours rêvé!
```bash
http://localhost:5173/
```

### Création d'un compte admin pour StarGear
 - Pour créer un compte administateur il faut changer le rôle d'un user normal en admin dans la BD mongo.

 - Si ce n'est pas déjà fait, installez le plugin MongoDB for VS Code

- Créez vous un compte sur le site avec comme nom Administateur

- Ensuite dans le plugin sur VS Code trouvez la section users de StarGearDB

- Copiez tout le document et supprimer-le ensuite

- Créer un nouveau document avec les informations copiées et changer le rôle user pour admin

