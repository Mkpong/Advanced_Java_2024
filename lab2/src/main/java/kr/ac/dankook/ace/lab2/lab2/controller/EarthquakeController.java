package kr.ac.dankook.ace.lab2.lab2.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import kr.ac.dankook.ace.lab2.lab2.dto.EarthquakeDTO;
import kr.ac.dankook.ace.lab2.lab2.service.EarthquakeService;

@Controller
public class EarthquakeController {

    @Autowired
    private EarthquakeService earthquakeService;

    @GetMapping("/earthquake")
    public String earthquake(Model model) throws IOException, URISyntaxException {
        model.addAttribute("myData", "earthquake");

        List<EarthquakeDTO> earthquakeData = earthquakeService.getData().block();

        model.addAttribute("earthquake", earthquakeData);
        return "earthquake";
    }
}
