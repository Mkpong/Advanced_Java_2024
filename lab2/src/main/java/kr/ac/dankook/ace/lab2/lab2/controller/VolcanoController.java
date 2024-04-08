package kr.ac.dankook.ace.lab2.lab2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import kr.ac.dankook.ace.lab2.lab2.dto.VolcanoDTO;
import kr.ac.dankook.ace.lab2.lab2.service.VolcanoService;

@Controller
public class VolcanoController {

    @Autowired
    private VolcanoService volcanoService;

    @GetMapping("/volcano")
    public String volcano(Model model) {
        model.addAttribute("myData", "volcano");
        List<VolcanoDTO> volcanoData = volcanoService.getData().block();

        model.addAttribute("volcano", volcanoData);
        return "volcano";
    }
}
