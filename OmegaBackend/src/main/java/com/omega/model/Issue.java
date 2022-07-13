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
@Getter @Setter
@NoArgsConstructor
public class Issue {
    @Id @GeneratedValue
    private Long id;

    private String issueName;
    private String description;
    private IssueType issueType;
    private List<String> labels;
    private Priority priority;
    private float estimate;
    private float timespent;
    private IssueStatus status;

    @Relationship(type = "HAS_SUBTASKS")
    private List<Issue> subtasks;

    @Relationship(type = "HAS_COMMENTS")
    private List<Comment> comments;

    @Relationship(type="HAS_WORKLOG")
    private List<WorkLog> worklog;
}
