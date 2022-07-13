package com.omega.jpa;

import com.omega.model.Issue;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueRepository extends Neo4jRepository<Issue,Long> {
}
