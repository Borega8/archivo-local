# archivo-local

Aplicación de escritorio para llevar la gestión documental del archivo municipal

## Cambios en la versión 2.0.0

En versiones anteriores, la base de datos era generada y almacenada en la ruta de instalación por defecto de la aplicación ```C:\Users\{nombre de usuario}\AppData\Local\Programs\archivo-local\resources\node_modules\@local\prisma\data\local.db```, para evitar la sobreescritura de la base de datos, y por lo tanto, la pérdida de los datos ya almacenados se ha cambiado su ubicación a la ruta ```C:\Users\{nombre de usuario}\AppData\Roaming\archivo-local\```

**IMPORTANTE: Antes de instalar la [versión 2.0.0](https://github.com/Borega8/archivo-local/releases/tag/v2.0.0), copiar el archivo local.db que se encuentra en la ruta: ```C:\Users\{nombre de usuario}\AppData\Local\Programs\archivo-local\resources\node_modules\@local\prisma\data\local.db``` dentro de la carpeta ```C:\Users\{nombre de usuario}\AppData\Roaming\archivo-local\``` para evitar la pérdida de datos**

Una vez hecho esto, se podrá seguir con la instalación de la aplicación.

**Nota:** El procedimiento explicado anteriormente, sólo aplica al actualizar la aplicación de una versión anterior a la [versión 2.0.0](https://github.com/Borega8/archivo-local/releases/tag/v2.0.0) a una nueva, a partir de la [versión 2.0.0](https://github.com/Borega8/archivo-local/releases/tag/v2.0.0), este proceso será completamente innecesario y se podrá realizar la instalación sin miedo a perder los datos ya almacenados.
