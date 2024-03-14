package kr.ac.dankook.ace.hello.lab0;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication			// 해당 부분이 Spring Boot 프로젝트의 시작 부분
public class Lab0Application {

	public static void main(String[] args) { // Spring boot 프로젝트가 시작됐을 때 진입점을 의미하는 main()함수
		SpringApplication.run(Lab0Application.class, args); // spring boot 프로젝트 실행
	}

}
