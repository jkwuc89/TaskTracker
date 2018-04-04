# Task Tracker Web Application
This repository currently serves as the demo app for my presentation,
"Dogs and Cats, Living Together: Kotlin, Spring Boot and REST on Azure"

## Server Technologies
* **Kotlin** - https://www.google.com
* **Spring Boot** - https://projects.spring.io/spring-boot/
* **Gradle** - https://gradle.org 
* Databases
  * **MySQL**
  * **MSSQL**
  * **H2** - http://h2database.com/html/main.html

## Web Content Technologies
* **.editorconfig** for editor / IDE configuration - http://editorconfig.org
* **npm** for package manager - https://www.npmjs.com
* **Webpack** for app building - https://webpack.js.org
* **Babel** for ES6 transpilation - https://babeljs.io
* **ESLint** for JavaScript linting via .eslintrc.json - https://eslint.org
  * .eslintrc.json Details:
    * `root=true` - Treat this as the root configuration file for the project
    * `eslint:recommended` - Use ESLint's recommended rules
    * `"ecmaVersion": 7,` - JS version is ES2016
* Unit Testing
  * **Karma** - https://karma-runner.github.io/2.0/index.html
  * **Jasmine** - https://jasmine.github.io  

## Directory Structure
* **/** - Root project configuration files
  * **src/main/kotlin** - Kotlin source
  * **src/test/kotlin** - Kotlin tests
  * **src/main/resources** - Spring application properties files
  * **src/main/public** - Deploy directory for built web content
  * **webcontent** - Root directory for web content 
    * **/** - Project configuration files for web content
    * **src**
      * **html** - HTML files and templates
      * **js** - JavaScript source
        * **tests** - Jasmine based unit tests
      * **scss** - SCSS based styles


