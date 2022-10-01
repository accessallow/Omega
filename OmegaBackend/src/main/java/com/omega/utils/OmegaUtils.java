package com.omega.utils;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class OmegaUtils {
    public static LocalDateTime getDate(String date){
        LocalDateTime z2 = null;
        try{
            SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
            Date d = parser.parse(date);
            LocalDate localDate = LocalDate.of(d.getYear()+1900, d.getMonth()+1, d.getDate());
            LocalTime localTime = LocalTime.of(6,  0);
            ZoneId zoneId = ZoneId.of("GMT+05:30");
            z2 = LocalDateTime.of(localDate,localTime);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return z2;
    }

    public static String getStrDate(LocalDateTime date){
        if(date!=null){
            DateTimeFormatter f = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            return date.format(f);
        }else{
            return "";
        }
    }
}
