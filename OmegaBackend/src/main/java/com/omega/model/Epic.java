package com.omega.model;


import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.List;

@Node
public class Epic {
    @Id
    @GeneratedValue
    private Long id;
    private String epicName;
    private List<String> labels;
    private String description;

    public Epic() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEpicName() {
        return epicName;
    }

    public void setEpicName(String epicName) {
        this.epicName = epicName;
    }

    public List<String> getLabels() {
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
