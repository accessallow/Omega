package com.omega.controller;

import com.omega.jpa.ProjectRepository;
import com.omega.model.project.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProjectController {
    @Autowired
    ProjectRepository projectRepository;

    @GetMapping(value = "/api/project/all",produces = "application/json")
    public List<Project> getAllProjects(){
        List<Project> projects =  this.projectRepository.findAll();
        projects.forEach(System.out::println);
        return projects;
    }

    @PostMapping(value = "/api/project/create",produces = "application/json")
    public Project createProject(@RequestBody Project project){

        return this.projectRepository.save(project);
    }

    @PostMapping(value = "/api/project/delete",produces = "application/json")
    public Project deleteProject(@RequestBody long projectId){
        Project toDelete = this.projectRepository.findById(projectId).get();
        this.projectRepository.delete(toDelete);
        return toDelete;
    }
}
