package com.omega.services;

import com.omega.model.project.*;
import com.omega.model.requestobject.ProjectStructure;
import com.omega.utils.OmegaUtils;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    public Project createProjectTree(ProjectStructure project){
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
