package com.omega.jpa;

import com.omega.model.project.Release;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReleaseRepository extends Neo4jRepository<Release,Long> {
}
