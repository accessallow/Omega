package com.omega.jpa;

import com.omega.model.WorkLog;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkLogRepository extends Neo4jRepository<WorkLog,Long> {
}
