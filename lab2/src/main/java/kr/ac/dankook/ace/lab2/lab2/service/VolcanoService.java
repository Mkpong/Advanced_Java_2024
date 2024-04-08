package kr.ac.dankook.ace.lab2.lab2.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.ac.dankook.ace.lab2.lab2.dto.VolcanoDTO;
import reactor.core.publisher.Mono;

@Service
public class VolcanoService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public VolcanoService(ObjectMapper objectMapper) {
        this.webClient = WebClient.builder()
                .baseUrl("https://volcanoes.usgs.gov/vsc/api/volcanoApi")
                .build(); // baseUrl 수정
        this.objectMapper = objectMapper;
    }

    public Mono<List<VolcanoDTO>> getData() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/regionstatus")
                        .queryParam("lat1", -90)
                        .queryParam("long1", -180)
                        .queryParam("lat2", 90)
                        .queryParam("long2", 180)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .map(this::mapJsonToList);
    }

    private List<VolcanoDTO> mapJsonToList(String json) {
        try {
            JsonNode root = objectMapper.readTree(json);
            List<VolcanoDTO> volcanoDTOList = new ArrayList<>();
            for (JsonNode feature : root) {
                String colorCode = feature.get("colorCode").asText();
                String volname = feature.get("vName").asText();
                String url = feature.get("vUrl").asText();
                VolcanoDTO volcanoDTO = new VolcanoDTO(volname, colorCode, url);
                volcanoDTOList.add(volcanoDTO);
            }
            return volcanoDTOList;
        } catch (IOException e) {
            throw new RuntimeException("Error mapping Json to List", e);
        }

    }
}
