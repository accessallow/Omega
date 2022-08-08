package com.omega;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class Test {
    public static void main(String[] args) throws ParseException {
//        ZonedDateTime d = ZonedDateTime.now();
//        System.out.println(d);
//        System.out.println(d.getNano());
//        System.out.println(d.toLocalDate().toString());
//        System.out.println(d.getOffset().getTotalSeconds());
//        System.out.println(d.toInstant().getEpochSecond());

//        ZonedDateTime zdt = ZonedDateTime.parse("2016-03-28 00:00:00 AM", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss a"));

        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date d = parser.parse("2067-03-28");

        LocalDate localDate = LocalDate.of(d.getYear()+1900, d.getMonth()+1, d.getDate());
        LocalTime localTime = LocalTime.of(6,  0);
        ZoneId zoneId = ZoneId.of("GMT+05:30");

        ZonedDateTime z2 = ZonedDateTime.of(localDate,localTime,zoneId);

        System.out.println(z2);
    }
}
