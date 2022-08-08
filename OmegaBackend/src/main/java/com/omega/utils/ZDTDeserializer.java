package com.omega.utils;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class ZDTDeserializer extends StdDeserializer<LocalDateTime> {
    public ZDTDeserializer(Class<?> vc) {
        super(vc);
    }

    public ZDTDeserializer() {
        this(null);
    }

    @Override
    public LocalDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        LocalDateTime z2 = null;
        try{
            String date = jsonParser.getValueAsString();
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
}
