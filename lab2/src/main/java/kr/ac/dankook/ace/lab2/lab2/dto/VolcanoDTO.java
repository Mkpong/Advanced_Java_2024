package kr.ac.dankook.ace.lab2.lab2.dto;

import lombok.Data;

@Data
public class VolcanoDTO {

    public VolcanoDTO(String volname, String colorCode, String url) {
        this.volname = volname;
        this.colorCode = colorCode;
        this.url = url;
    }

    private String volname;
    private String colorCode;
    private String url;

}
