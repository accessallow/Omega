package com.omega.model.project;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Node
@Getter @Setter @NoArgsConstructor
public class Event {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private EventStatus status;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime start;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime end;
    private int duration;
}