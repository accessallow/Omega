package com.omega.model.project;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.time.ZonedDateTime;

@Node
@Getter @Setter @NoArgsConstructor
public class Sprint {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private SprintStatus status;
    private ZonedDateTime start;
    private ZonedDateTime end;
    private int duration;
    private String label;
}
