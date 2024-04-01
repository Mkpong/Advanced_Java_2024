package kr.ac.dankook.ace.lab2.lab2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Lab2Controller {
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("myData", "home");
        return "Lab2";
    }
}
