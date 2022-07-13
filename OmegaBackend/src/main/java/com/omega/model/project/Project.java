package com.omega.model.project;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.ZonedDateTime;
import java.util.List;

@Node
@Getter @Setter @NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private ProjectStatus status;
    private ZonedDateTime start;
    private ZonedDateTime end;

    @Relationship(type = "HAS_RELEASE")
    private List<Release> releases;
}
