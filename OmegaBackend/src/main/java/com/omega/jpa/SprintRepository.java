package com.omega.jpa;

import com.omega.model.project.Sprint;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SprintRepository extends Neo4jRepository<Sprint,Long> {
}
