# Aplicacion Red Tercera Edad

1. Clonar el proyecto.  
 
     git clone https://github.com/pablofolgar/chatApp.git
  
2. Instalar dependencias 

    *  cd chatApp. 
  
     * npm install. (En caso de problemas por vulnerabilidades en dependencias --> npm audit fix )  
     
3. Levantar Android Studio apuntando al directorio clonado

    3.1 Levantar el emulador desde __Android Virtual Device Manager__

    3.2 Configurar el SDK de Android
      * Dentro del directorio raiz de proyecto ir a la carpeta  __Android__
      * Crear el archivo __local.properties__
      * Setear a la variable __sdk.dir__ el directorio del sdk de Android (Ej : sdk.dir = /Users/pablo/Library/Android/sdk/)   
  
    3.3 Levantar la app
      * react-native run-android. 
  
  
