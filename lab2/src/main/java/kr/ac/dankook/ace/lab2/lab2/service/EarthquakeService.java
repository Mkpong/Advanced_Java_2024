package kr.ac.dankook.ace.lab2.lab2.service;

import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.ac.dankook.ace.lab2.lab2.dto.EarthquakeDTO;
import reactor.core.publisher.Mono;

@Service
public class EarthquakeService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public EarthquakeService(ObjectMapper objectMapper) {
        this.webClient = WebClient.builder()
                .baseUrl(
                        "https://earthquake.usgs.gov/fdsnws/event/1/")
                .build();
        this.objectMapper = objectMapper;
    }

    public Mono<List<EarthquakeDTO>> getData() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/query.geojson")
                        .queryParam("starttime", "1900-01-01")
                        .queryParam("minmagnitude", "8")
                        .queryParam("orderby", "time")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .map(this::mapJsonToList);
    }

    private List<EarthquakeDTO> mapJsonToList(String json) {
        try {
            JsonNode root = objectMapper.readTree(json);
            List<EarthquakeDTO> earthquakeDTOList = new ArrayList<>();
            for (JsonNode feature : root.get("features")) {
                String place = feature.get("properties").get("place").asText();
                Double mag = feature.get("properties").get("mag").asDouble();
                String url = feature.get("properties").get("url").asText();
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
                Date date = new Date(feature.get("properties").get("time").asLong());
                EarthquakeDTO earthquakeDTO = new EarthquakeDTO(place, mag, simpleDateFormat.format(date), url);
                earthquakeDTOList.add(earthquakeDTO);
            }
            return earthquakeDTOList;
        } catch (IOException e) {
            throw new RuntimeException("Error mapping Json to List", e);
        }

    }
}
