package com.omega.jpa;

import com.omega.model.Comment;
import com.omega.model.Epic;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends Neo4jRepository<Comment,Long> {
}
