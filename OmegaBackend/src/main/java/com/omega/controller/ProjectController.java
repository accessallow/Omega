package com.omega.controller;

import com.omega.jpa.ProjectRepository;
import com.omega.model.project.*;
import com.omega.model.requestobject.ProjectStructure;
import com.omega.utils.OmegaUtils;
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

    @PostMapping(value = "/api/project/plan",produces = "application/json")
    public Project planProject(@RequestBody ProjectStructure projectStructure){
        System.out.println(projectStructure);
        Project p = this.createProjectTree(projectStructure);
        return this.projectRepository.save(p);
    }

    private Project createProjectTree(ProjectStructure project){
        Project p = new Project();
        p.setStatus(ProjectStatus.PLANNED);
        p.setName(project.getData().get("name"));
        p.setStart(OmegaUtils.getDate(project.getData().get("start")));
        p.setEnd(OmegaUtils.getDate(project.getData().get("end")));
        p.setDescription("");

        for(ProjectStructure ps : project.getChildren()){
            if(ps.getType().equalsIgnoreCase("release")){
                p.getReleases().add(this.parseRelease(ps));
            }else if(ps.getType().equalsIgnoreCase("event")){
                p.getEvents().add(this.parseEvent(ps));
            }else if(ps.getType().equalsIgnoreCase("break")){
                p.getBreaks().add(this.parseBreak(ps));
            }
        }

        return p;
    }

    private Release parseRelease(ProjectStructure p){
        Release r = new Release();
        r.setName(p.getData().get("name"));
        r.setStart(OmegaUtils.getDate(p.getData().get("start")));
        r.setEnd(OmegaUtils.getDate(p.getData().get("end")));

        for(ProjectStructure ch : p.getChildren()){
            if(ch.getType().equalsIgnoreCase("sprint")){
                r.getSprints().add(this.parseSprint(ch));
            }else if(ch.getType().equalsIgnoreCase("event")){
                r.getEvents().add(this.parseEvent(ch));
            }else if(ch.getType().equalsIgnoreCase("break")){
                r.getBreaks().add(this.parseBreak(ch));
            }
        }

        return r;
    }

    private Event parseEvent(ProjectStructure p){
        Event e = new Event();
        e.setName(p.getData().get("name"));
        e.setStart(OmegaUtils.getDate(p.getData().get("start")));
        e.setEnd(OmegaUtils.getDate(p.getData().get("end")));
        return e;
    }

    private Break parseBreak(ProjectStructure p){
        Break b = new Break();
        b.setName(p.getData().get("name"));
        b.setStart(OmegaUtils.getDate(p.getData().get("start")));
        b.setEnd(OmegaUtils.getDate(p.getData().get("end")));
        return b;
    }

    private Sprint parseSprint(ProjectStructure p){
        Sprint b = new Sprint();
        b.setName(p.getData().get("name"));
        b.setStart(OmegaUtils.getDate(p.getData().get("start")));
        b.setEnd(OmegaUtils.getDate(p.getData().get("end")));
        return b;
    }
}
