package com.omega.model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Node
@Getter @Setter @NoArgsConstructor
public class Epic {
    @Id
    @GeneratedValue
    private Long id;
    private String epicName;
    private List<String> labels;
    private String description;

    @Relationship(type="HAS_STORIES")
    private List<Issue> stories;
}
