package com.omega.controller;

import com.omega.jpa.ProjectRepository;
import com.omega.jpa.ReleaseRepository;
import com.omega.model.project.Project;
import com.omega.model.project.Release;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ReleaseController {
    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    ReleaseRepository releaseRepository;

    @GetMapping(value = "/api/release/all",produces = "application/json")
    public List<Release> getAll(){
        List<Release> releases =  this.releaseRepository.findAll();
        return releases;
    }

    @PostMapping(value = "/api/release/create",produces = "application/json")
    public Release create(@RequestBody Release release){
        return this.releaseRepository.save(release);
    }

    @PostMapping(value = "/api/release/delete",produces = "application/json")
    public Release delete(@RequestBody long releaseId){
        Release toDelete = this.releaseRepository.findById(releaseId).get();
        this.releaseRepository.delete(toDelete);
        return toDelete;
    }

    @PostMapping(value = "/api/release/update",produces = "application/json")
    public Release update(@RequestBody Release release){
        Release releaseToUpdate = this.releaseRepository.findById(release.getId()).get();
        releaseToUpdate.setName(release.getName());
        releaseToUpdate.setDescription(release.getDescription());
        releaseToUpdate.setStart(release.getStart());
        releaseToUpdate.setEnd(release.getEnd());
        releaseToUpdate.setStatus(release.getStatus());
        return this.releaseRepository.save(releaseToUpdate);
    }
}
