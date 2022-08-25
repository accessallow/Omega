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

    @PostMapping(value = "/api/project/update",produces = "application/json")
    public Project updateProject(@RequestBody Project project){
        Project projectToUpdate = this.projectRepository.findById(project.getId()).get();
        projectToUpdate.setName(project.getName());
        projectToUpdate.setDescription(project.getDescription());
        projectToUpdate.setStart(project.getStart());
        projectToUpdate.setEnd(project.getEnd());
        projectToUpdate.setStatus(project.getStatus());
        return this.projectRepository.save(projectToUpdate);
    }
}
