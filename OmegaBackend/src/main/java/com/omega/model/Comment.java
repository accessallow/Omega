package com.omega.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Node
@Getter
@Setter
@NoArgsConstructor
public class Comment {
    @Id @GeneratedValue
    private Long id;

    private String user;
    private String text;
    private LocalDateTime commentTime;
}
