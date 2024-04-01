package kr.ac.dankook.ace.lab2.lab2.dto;

import lombok.Data;

@Data
public class EarthquakeDTO {
    private String type;
    private Properties properties;
    private Geometry geometry;

    @Data
    public static class Properties {
        private double mag;
        // private String place;
        // private long time;
        // private String url;
        // private String detail;
        // private double mmi;
        // private String status;
        // private int tsunami;
        // private int sig;
        // private String net;
        // private String code;
        // private String ids;
        // private String sources;
        // private String types;
        // private String magType;
        // private String title;
    }

    @Data
    public static class Coordinates {
        private Coordinates coordinates;
    }

    @Data
    public static class Geometry {
        private String type;
        private Coordinates coordinates;
    }
}
