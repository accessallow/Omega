package com.omega.model.project;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.omega.utils.CustomDateDeserializer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Node
@Getter @Setter @NoArgsConstructor
public class Release {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private ReleaseStatus status;
    @JsonFormat(pattern = "dd-MM-yyyy")
    @JsonDeserialize(using = CustomDateDeserializer.class)
    private LocalDateTime start;
    @JsonFormat(pattern = "dd-MM-yyyy")
    @JsonDeserialize(using = CustomDateDeserializer.class)
    private LocalDateTime end;
    private String label;

    @Relationship(type = "HAS_SPRINT")
    private List<Sprint> sprints = new ArrayList<>();

    @Relationship(type = "HAS_EVENT")
    private List<Event> events = new ArrayList<>();

    @Relationship(type = "HAS_BREAK")
    private List<Break> breaks  = new ArrayList<>();
}
