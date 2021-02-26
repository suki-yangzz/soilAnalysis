**Prerequisites:** [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html), [Node.js 10.13+](https://nodejs.org/), and [Yarn](https://yarnpkg.com/en/docs/install). You can use npm instead of Yarn, but you'll need to translate the Yarn syntax to npm.

* [Getting Started](#getting-started)
* [Links](#links)

## Getting Started

To install this example application, run the following commands:

```bash
mvn clean install
```

This will get a copy of the project installed locally. To install all of its dependencies and start each app, follow the instructions below.

To run the server, run:
 
```bash
./mvnw spring-boot:run
```

To install client dependency, run the following commands:
```bash
nvm install 10.13.0
nvm use 10.13.0
```

To run the client, cd into the `app` folder and run:
 
```bash
yarn && yarn start
```

To deploy production build, run:
```bash
mvn clean install -Pprod
```

## Links

This example uses the following open source libraries:

* [React](https://reactjs.org/)
* [Spring Boot](https://spring.io/projects/spring-boot)
* [Spring Security](https://spring.io/projects/spring-security)
