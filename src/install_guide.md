# **Instal·lar software per PES**

Requisits: NPM

```bash
sudo apt install npm
```

## _Node:_

(Versió 16, per compatibilitat amb EXPO)

```bash
sudo npm install -g n
sudo n lts
```

## _EXPO-CLI:_

```bash
sudo npm install -g expo-cli
```

## _EXPO Client:_

S'ha d'instal·lar al telèfon. És per poder fer els tests en un dispositiu.

Busqueu " Expo Client " a la botiga d'apps del vostre sistema operatiu.

## _Executar l'app:_

Primer copiar els documents del github (ara mateix només printa un Hola per pantalla)
Un cop tenim el directori del projecte "happyLungs" obrim una terminal dins el directori i executem:

```bash
npm run web
```

Hauria d'aparèixer un missatge com aquest:

```bash
Developer tools running on http://localhost:19002
```

Si aneu al navegador a la url que proporcionen trobareu diferents opcions, per exemple la d'executar l'app en el browser. Allà indicarà una nova URL on es pot visualitzar el contingut que s'està executant.

També apareix un QR que amb l'app que ja teniu instal·lada " Expo Client " simplement haureu d'escanejar el QR que apareix (A mi em funciona amb el tipus de connexió "Tunnel").

## _Crear un template com el de github:_

En cas de voler crear un template des de 0 per anar provant per la vostra banda, haureu de fer les següents comandes:

```bash
expo init NOM_DEL_PROJECTE_NOU
```

Poden aparèixer erros de dependència amb node, però si teniu la versió 16 no ha de sortir res.

Un cop executat apareixerà un conjunt d'opcions diferents per a descarregar un template, jo he utilitzat "blank" per al projecte de github, però si més endavant ens veiem amb ganes d'utilitzar TypeScript, també ho podem provar.

Libraries:

npm i react-native-bouncy-checkbox
npm install react-native-datepicker --save
npm install --save react-native-ratings
