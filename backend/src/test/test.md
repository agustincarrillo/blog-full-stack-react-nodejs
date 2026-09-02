1. Debido a que el comando
   "test": "NODE_OPTIONS=--experimental-vm-modules jest" en el archivo
   package.json manda un error al ejecutarlo. Se debe a que esta sintaxis
   es para Linux/macOS.
   Para resolver el problema, se instala el paquete cross-env, que es la
   forma estandar y compatible en cualquier sistema operativo.
   $ npm install --save-dev cross-env
   Y se cambia en package.json el comando
   "test": "NODE_OPTIONS=--experimental-vm-modules jest"
   por
   "test": "cross-env NODE_OPTIONS=--experimental-vm-modules jest"
