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
public class Release {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private ReleaseStatus status;
    private ZonedDateTime start;
    private ZonedDateTime end;
    private String label;

    @Relationship(type = "HAS_SPRINT")
    private List<Sprint> sprints;

    @Relationship(type = "HAS_EVENT")
    private List<Event> releaseEvents;
}
