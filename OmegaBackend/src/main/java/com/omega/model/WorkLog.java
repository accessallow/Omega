package com.omega.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.time.ZonedDateTime;

@Node
@Getter @Setter @NoArgsConstructor
public class WorkLog {
    @Id
    @GeneratedValue
    private Long id;

    private String username;
    private String description;
    private float time;
    private ZonedDateTime loggedTime;
}
