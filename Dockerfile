FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY pom.xml .
COPY src ./src
#RUN mvn clean package -DskipTests
COPY target/Final_Step_FE8FS2-1.0-SNAPSHOT.jar app.jar
ENV SPRING_PROFILES_ACTIVE=container
EXPOSE 8080
EXPOSE 8081
ENTRYPOINT ["java","-jar","app.jar"]
