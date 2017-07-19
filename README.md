[![Build Status](https://travis-ci.org/juanrarodriguez18/DreamStill.svg?branch=master)](https://travis-ci.org/juanrarodriguez18/DreamStill)

# DreamStill
Trabajo de Fin de Grado

# Introducción

DreamStill es una aplicación Web Desarrollada como objetivo de un trabajo de Fin de Grado para la titulación de Ingeniero del Software en la Universidad de Sevilla.

Está desarrollada en los lenguajes de Javascript para el Backend y TypeScript para el frontend, utilizando una Base de Datos NO-SQL. Para el backend se ha utilizado Node.js acompañado de Express, en el frontend se ha utilizado Angular 2 y Angular Material y por último como SGBD se ha utilizado Firebase.

# Objetivos

El objetivo del TFG es el de aprender sobre las tecnologías que se han usado para el desarrollo de la aplicación. Utilizando tecnologías actuales y usando frameworks que agilicen el proceso de desarrollo con el fin de aumentar la productividad.

# Idea

La idea es desarrollar una Aplicación Web en la que un usuario que tenga distintos monitores de sueño, pueda ver reflejados sus datos en un calendario junto con eventos que representen el evento de sueño que haya transcurrido para un día concreto.

# APIS

DreamStill conecta con varias APIs de monitorización de sueño para obtener los datos de un usuario registrado en la aplicación que tenga datos almacenados en dicha API. Concretamente conecta con las siguientes APIs:

- **Morpheuz**: A través de la lectura de los emails que un usuario recibe sobre su sueño.
- **GoogleFit** [Deprecated]: En desuso debido a la falta de detalles sobre el sueño de un usuario
- **Fitbit**: A través de la API RESTFULL que ofrece para los desarrolladores.

# Testing

Se han realizado Pruebas Funcionales para comprobar el correcto funcionamiento de la aplicación. Además, se ha utilizado Travis, como servidor de integración continua y se han diseñado Pruebas Funcionales de Regresión. 

Para la realización de las pruebas, se han utilizado los Frameworks de Cucumber y Protractor, acompañados de Selenium. A continuación se mostrará como se han realizados las pruebas para cada uno de las Historias de Usuario:

**Tabla de pruebas realizadas**

| Automatizada | Prueba | Fecha | Datos de Entrada | Resultado | Esperado | Ejecutada por |
| ------------ | ------ | ----- | ---------------- | --------- | -------- | ------------- |
| No | Registrarse datos correctos | Enero 2017 | Nombre, email y contraseña de un nuevo usuario | El usuario se almacena en la aplicación | El usuario es almacenado en la aplicación | Juan Ramón Rodríguez
No | Revisar datos erróneos | Enero 2017 | Nombre, email y contraseña incorrectos de un nuevo usuario | La aplicación avisa de que los datos son incorrectos | La aplicación valida los datos correctamente | Juan Ramón Rodríguez
Si | Login datos correctos | Enero 2017 | Nombre y contraseña usuario | El usuario accede a la aplicación | El usuario obtiene acceso a la aplicación | Juan Ramón Rodríguez |
No | Revisar datos erróneos | Enero 2017 | Nombre y contraseña incorrectos de un usuario | La aplicación avisa de que los datos son incorrectos | La aplicación valida los datos correctamente | Juan Ramón Rodríguez |
Si | Datos mostrados correctos | Enero 2017 | Nombre y contraseña de un usuario | El usuario accede a sus datos correctamente | El usuario obtiene acceso a sus datos | Juan Ramón Rodríguez |
Si | Enlaces correctos | Enero 2017 | Nombre y contraseña de un usuario | Todos los enlaces funcionan correctamente | Los enlaces funcionan correctamente | Juan Ramón Rodríguez |
No | Datos procesados correctos | Enero 2017 | Datos de un usuario | Los datos se almacenan correctamente | Los datos son almacenados correctamente | Juan Ramón Rodríguez |
No | Validación de datos | Enero 2017 | Datos incorrectos de un usuario | La aplicación informa de los errores | La validación funciona con éxito | Juan Ramón Rodríguez |
Si | Eventos representado con éxito | Febrero 2017 | Datos y eventos de un usuario | Los eventos se muestran en el calendario | Los eventos son mostrados en el calendario | Juan Ramón Rodríguez |
No | Comprobar Integración Servicios 3ºs | Febrero 2017 | Datos de un usuario | La integración se realiza correctamente | La integraicón se realiza con éxito | Juan Ramón Rodríguez |
No | Correcta identificación en Servicios | Febrero 2017 | Datos de un usuario | La aplicación reconoce la identificación del usuario en el Servicio | La aplicación reconoce la correcta identificación del usuario en el Servicio | Juan Ramón Rodríguez |
No | Comprobar datos Usuario ``Resumen de Sueño'' | Febrero 2017 | Datos de un usuario y eventos de sueño | Se muestran sólo los datos de ese usuario | Los datos de sólo ese usuario se muestran correctamente | Juan Ramón Rodríguez |
No | Correcta extracción de los datos de la BD | Febrero 2017 | Datos de un usuario y eventos de sueño | No existen errores en los datos mostrados | Los datos mostrados no continen ningún error | Juan Ramón Rodríguez |
No | Comprobar procesado de emails | Marzo 2017 | Emails de usuarios | Los emails pendientes se procesan correctamente | Los emails pendientes se procesan con éxito | Juan Ramón Rodríguez |
No | Verificar la ejecución del proceso al inicio | Marzo 2017 | Emails de usuarios | El proceso se inicia y reconoce los emails correctamente | El proceso se inicia y reconoce los emails con éxito | Juan Ramón Rodríguez |

# Aplicación Web

La aplicación se encuentra desplegada en Heroku en el siguiente link: <http://dreamstillapp.herokuapp.com> en el que podemos registrarnos y probar la aplicación. Éstas son algunas de las pantallas que ofrece:

**- Página de Inicio:** 

![Página de Inicio](https://github.com/juanrarodriguez18/DreamStill/blob/master/documentacion/manualUsuario/paginaInicio.png?raw=true)

**- Página Principal:** 

![Página Principal](https://github.com/juanrarodriguez18/DreamStill/blob/master/documentacion/manualUsuario/eventos.png?raw=true)

**- Página "Resumen de Sueño Diario":** 

![Página "Resumen de Sueño Diario"](https://github.com/juanrarodriguez18/DreamStill/blob/master/documentacion/manualUsuario/resumenSue_oDiario.png?raw=true)

**- Página de APIs:** 

![Página de APIs](https://github.com/juanrarodriguez18/DreamStill/blob/master/documentacion/manualUsuario/paginaApis.png?raw=true)

**- Página de Alertas:** 

![Página de Alertas](https://github.com/juanrarodriguez18/DreamStill/blob/master/documentacion/manualUsuario/paginaAlertas.png?raw=true)

# Documentación

Podra encontrar la Memoria de ésta Aplicación en la carpeta "Documentaicón" del repositorio. Dicha memoria está escrita en el lenguaje *Latex*, por lo que se puede compilar y se obtendrá el resultado en PDF para que la lectura sea más cómoda.


