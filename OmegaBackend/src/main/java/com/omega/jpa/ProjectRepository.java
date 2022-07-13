package com.omega.jpa;

import com.omega.model.project.Project;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends Neo4jRepository<Project,Long> {
}
