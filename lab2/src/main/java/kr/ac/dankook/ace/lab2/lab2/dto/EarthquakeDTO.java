package kr.ac.dankook.ace.lab2.lab2.dto;

import lombok.Data;

@Data
public class EarthquakeDTO {

    public EarthquakeDTO(String place, Double mag, String time, String url) {
        this.place = place;
        this.mag = mag;
        this.time = time;
        this.url = url;
    }

    private String place;
    private double mag;
    private String time;
    private String url;

}
