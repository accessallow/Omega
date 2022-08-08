package com.omega.model.project;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.omega.utils.ZDTDeserializer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@Node
@Getter @Setter @NoArgsConstructor @ToString
public class Project {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private ProjectStatus status;
    @JsonFormat(pattern = "dd-MM-yyyy")
    @JsonDeserialize(using = ZDTDeserializer.class)
    private LocalDateTime start;
    @JsonFormat(pattern = "dd-MM-yyyy")
    @JsonDeserialize(using = ZDTDeserializer.class)
    private LocalDateTime end;

    @Relationship(type = "HAS_RELEASE")
    private List<Release> releases;
}
