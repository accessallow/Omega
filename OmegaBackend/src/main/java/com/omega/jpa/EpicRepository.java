package com.omega.jpa;

import com.omega.model.Epic;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EpicRepository extends Neo4jRepository<Epic,Long> {
}
