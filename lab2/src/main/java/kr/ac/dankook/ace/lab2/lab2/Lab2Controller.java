package kr.ac.dankook.ace.lab2.lab2;

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

    @GetMapping("/earthquake")
    public String earthquake(Model model) {
        model.addAttribute("myData", "earthquake");
        return "earthquake";
    }

    @GetMapping("/volcano")
    public String volcano(Model model) {
        model.addAttribute("myData", "volcano");
        return "volcano";
    }

}
