# **Base de dades de HappyLungs**

### **Perquè**

Hem escollit la base de dades **mongodb** perquè ens aporta noves experiències amb una base de dades no relacional (ja que a la universitat de moment no n'haviem utilitzat mai una). També considerem que al treballar en format json ens pot ser de molta utilitat per recopilar la informació de DadesObertes. A més a més un dels integrants del grup ja estava una mica familiaritzat amb aquesta base de dades.

### **Configuració**

Per tal de configurar la base de dades vam decidir fer una API amb express en nodejs, d'aquesta manera des de l'aplicació principal mitjançant crides http podem accedir sense problemes a totes les dades emmagatzemades.

La api conté els sgüents components:

- Index:

  Fitxer on principalment es configura express per escoltar al port 2000 i configurar les rutes d'accés.

- .env:

  Defineix el port on es troba **mongodb** al servidor per tal de dur a terme crides, defineix el port (2000), el tipus de web (http) i per últim una clau d'accés per aportar seguretat al sistema.

- Routes:

  Defineix les rutes d'accés a la API. Per exemple, per a obtenir les dades d'un usuari concret (get), utilitcem la ruta "/user/:\_id".

- helpers:

  Diferents fitxers per tal de reutilitzar la major quantitat de codi possible. Per exemple disposem d'un fitxer de codis d'error/èxit (200, 400, ...).

- Model:

  On es defineix cada classe en un JSON Schema.

- Datalayer:

  On es realitzen les crides a la base de dades per tal d'afegir, eliminar, modificar, buscar...

- Contoladors:

  On es comproven les dades entrants de la request, es criden als mètodes dels fitxers de datalayer i s'envia la resposta.

### **On es troba i com obtenir dades**

Hem decidit que la API s'estigui executant en segon plà al servidor d'AWS mitjançant pm2.

Per facilitar les crides al programa principal, hem fet un fitxer que inclou diverses funcions específiques per fer un "GET", un "POST", etc mitjançant el mòdul d'Axios. D'aquesta manera si es vol fer una crida a la base de dades des de qualsevol punt del codi, simplement s'han d'importar les funcions del fitxer i passar-li la ruta per a dur a terme la funcionalitat dessitjada i els paràmetres que es vulguin passar.
