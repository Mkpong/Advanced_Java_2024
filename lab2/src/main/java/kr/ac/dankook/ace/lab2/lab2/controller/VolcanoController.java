package kr.ac.dankook.ace.lab2.lab2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class VolcanoController {

    @GetMapping("/volcano")
    public String volcano(Model model) {
        model.addAttribute("myData", "volcano");
        return "volcano";
    }
}
