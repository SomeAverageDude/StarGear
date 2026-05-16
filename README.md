# StarGear
StarGear est un site de vente de jeux dématérialisés créé dans le cadre du cours 420-4GW-BB Applications Web Transactionnelles.
## Rouler le site web sur votre ordinateur
### Créer une BD mongo dans docker
Ouvrez Docker et dans un PowerShell entrez :
```bash
docker run --name mongo -d -p 27017:27017 mongodb/mongodb-community-server:latest
```
Ouvrez le conteneur et voilà, Mongo fonctionne !
### Faire fonctionner le site
Clonez le projet dans le dossier de votre choix :
```bash
git clone https://github.com/SomeAverageDude/StarGear.git
```
Allez dans le dossier du projet :
```bash
cd .\votreDossier\StarGear\StarGear-App\
```
Installez les dépendances :
```bash
npm install
```
Ensuite, installez les dépendances du serveur :
```bash
cd .\serveur\
npm install
```
**Créez un fichier .env dans ce dossier et insérez-y les variables d'environnement.**

Dans un terminal dans StarGear-App :
```bash
npm run dev
```
Dans un autre terminal, roulez :
```bash
cd .\serveur\
```
Puis :
```bash
npm run dev
```
Dans un navigateur, allez à l'adresse suivante et achetez tous les jeux dont vous avez toujours rêvé !
```bash
http://localhost:5173/
```
### Création d'un compte admin pour StarGear
 - Pour créer un compte administrateur, il faut changer le rôle d'un utilisateur normal en admin dans la BD Mongo.
 - Si ce n'est pas déjà fait, installez le plugin MongoDB for VS Code.
- Créez-vous un compte sur le site avec comme nom Administrateur.
- Ensuite, dans le plugin sur VS Code, trouvez la section users de StarGearDB.
- Copiez tout le document et supprimez-le ensuite.
- Créez un nouveau document avec les informations copiées et changez le rôle user pour admin.
- Créez autant de compte que vous voulez pour les gérer sur la page d'administration
