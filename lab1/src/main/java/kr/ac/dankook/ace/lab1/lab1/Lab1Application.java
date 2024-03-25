package kr.ac.dankook.ace.lab1.lab1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// 해당 부분이 Spring Boot 프로젝트의 시작 부분
@SpringBootApplication
public class Lab1Application {
	// Spring boot 프로젝트가 시작됐을 때 진입점을 의미하는 main()함수
	public static void main(String[] args) {
		// spring boot 프로젝트 실행
		SpringApplication.run(Lab1Application.class, args);
	}

}
