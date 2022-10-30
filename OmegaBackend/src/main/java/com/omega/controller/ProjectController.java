package com.omega.controller;

import com.omega.jpa.ProjectRepository;
import com.omega.model.project.*;
import com.omega.model.requestobject.ProjectStructure;
import com.omega.services.ProjectService;
import com.omega.utils.OmegaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
public class ProjectController {
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    ProjectService projectService;

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
        Project p = projectService.createProjectTree(projectStructure);
        return this.projectRepository.save(p);
    }
    @PostMapping(value = "/api/project/plan/{projectId}",produces = "application/json")
    public Project updateProjectPlan(@PathVariable("projectId") Long projectId, @RequestBody ProjectStructure projectStructure){
        System.out.println(projectStructure);
        System.out.println("ProjectId = "+projectId);
        Project p = projectService.createProjectTree(projectStructure);

        Project toDelete = this.projectRepository.findById(projectId).get();
        this.projectRepository.delete(toDelete);

        p.setId(toDelete.getId());

        return this.projectRepository.save(p);
    }

    ProjectStructure[] NO_ITEMS = {};
    @GetMapping(value = "/api/project/get_structure/{projectId}",produces = "application/json")
    public ProjectStructure getProjectStructure(@PathVariable("projectId") Long projectId){
        AtomicInteger uuid = new AtomicInteger(1000);

        Project p =  this.projectRepository.findById(projectId).get();
        ProjectStructure ps = new ProjectStructure();
        ps.setType("project");
        Map<String,String> projectData = new HashMap<>();
        projectData.put("name",p.getName());
        projectData.put("start",OmegaUtils.getStrDate(p.getStart()));
        projectData.put("end",OmegaUtils.getStrDate(p.getEnd()));
        ps.setUuid(""+ uuid.getAndIncrement());
        ps.setData(projectData);

        List<ProjectStructure> psList = new ArrayList<>();

        p.getReleases().forEach(r -> {
            ProjectStructure pso = new ProjectStructure();
            Map<String,String> releaseData = new HashMap<>();
            releaseData.put("name",r.getName());
            releaseData.put("start", OmegaUtils.getStrDate(r.getStart()));
            releaseData.put("end",OmegaUtils.getStrDate(r.getEnd()));
            pso.setType("release");
            pso.setData(releaseData);
            pso.setChildren(getReleaseChildren(r,uuid));
            pso.setUuid(""+(uuid.incrementAndGet()));
            psList.add(pso);
        });
        p.getEvents().forEach(e -> {
            ProjectStructure pso = new ProjectStructure();
            Map<String,String> eventData = new HashMap<>();
            eventData.put("name",e.getName());
            eventData.put("start",OmegaUtils.getStrDate(e.getStart()));
            eventData.put("end",OmegaUtils.getStrDate(e.getEnd()));
            pso.setType("event");
            pso.setData(eventData);
            pso.setChildren(NO_ITEMS);
            pso.setUuid(""+(uuid.incrementAndGet()));
            psList.add(pso);
        });
        p.getBreaks().forEach(b->{
            ProjectStructure pso = new ProjectStructure();
            Map<String,String> breakData = new HashMap<>();
            breakData.put("name",b.getName());
            breakData.put("start",OmegaUtils.getStrDate(b.getStart()));
            breakData.put("end",OmegaUtils.getStrDate(b.getEnd()));
            pso.setType("break");
            pso.setData(breakData);
            pso.setChildren(NO_ITEMS);
            pso.setUuid(""+(uuid.incrementAndGet()));
            psList.add(pso);
        });
        psList.sort(new PSSorter());
        ps.setChildren(psList.toArray(new ProjectStructure[0]));

        return ps;
    }

    public ProjectStructure[] getReleaseChildren(Release r, AtomicInteger uuid){
        List<ProjectStructure> psList = new ArrayList<>();
        r.getSprints().forEach(b->{
            ProjectStructure pso = new ProjectStructure();
            Map<String,String> breakData = new HashMap<>();
            breakData.put("name",b.getName());
            breakData.put("start",OmegaUtils.getStrDate(b.getStart()));
            breakData.put("end",OmegaUtils.getStrDate(b.getEnd()));
            pso.setType("sprint");
            pso.setData(breakData);
            pso.setChildren(NO_ITEMS);
            pso.setUuid(""+(uuid.incrementAndGet()));
            psList.add(pso);
        });
        r.getEvents().forEach(e -> {
            ProjectStructure pso = new ProjectStructure();
            Map<String,String> eventData = new HashMap<>();
            eventData.put("name",e.getName());
            eventData.put("start",OmegaUtils.getStrDate(e.getStart()));
            eventData.put("end",OmegaUtils.getStrDate(e.getEnd()));
            pso.setType("event");
            pso.setData(eventData);
            pso.setChildren(NO_ITEMS);
            pso.setUuid(""+(uuid.incrementAndGet()));
            psList.add(pso);
        });
        r.getBreaks().forEach(b->{
            ProjectStructure pso = new ProjectStructure();
            Map<String,String> breakData = new HashMap<>();
            breakData.put("name",b.getName());
            breakData.put("start",OmegaUtils.getStrDate(b.getStart()));
            breakData.put("end",OmegaUtils.getStrDate(b.getEnd()));
            pso.setType("break");
            pso.setData(breakData);
            pso.setChildren(NO_ITEMS);
            pso.setUuid(""+(uuid.incrementAndGet()));
            psList.add(pso);
        });
        psList.sort(new PSSorter());
        return psList.toArray(new ProjectStructure[0]);
    }

    class PSSorter implements Comparator<ProjectStructure>{

        @Override
        public int compare(ProjectStructure o1, ProjectStructure o2) {
            LocalDateTime d1 = OmegaUtils.getDate(o1.getData().get("end"));
            LocalDateTime d2 = OmegaUtils.getDate(o2.getData().get("end"));
            if(d1==null)  return -1;
            if(d2==null)  return 1;
            return d1.compareTo(d2);
        }
    }
}
