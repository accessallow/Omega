package com.omega.controller;

import com.omega.jpa.*;
import com.omega.model.*;
import com.omega.model.project.*;
import com.omega.service.CustomerService;
import com.omega.service.EpicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class UserProfileController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private EpicService epicService;

    @Autowired
    private EpicRepository epicRepository;
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private WorkLogRepository workLogRepository;

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ReleaseRepository releaseRepository;
    @Autowired
    private SprintRepository sprintRepository;
    @Autowired
    private EventRepository eventRepository;

    @GetMapping(value = "/api/users/user/{id}",produces = "application/json")
    public Customer getUserDetail(@PathVariable Long id){
        return customerService.findById(id);
    }

    @GetMapping(value = "/api/users/user_data/",produces = "application/json")
    public String getUserDataFromContext(Principal p){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("name = ");
        System.out.println(authentication.getName());

        System.out.println("getAuthorities = ");
        System.out.println(authentication.getAuthorities());

        System.out.println("getCredentials = ");
        System.out.println(authentication.getCredentials());

        System.out.println("getDetails = ");
        System.out.println(authentication.getDetails());

        System.out.println("getPrincipal = ");
        System.out.println(authentication.getPrincipal());

        return p.getName();
    }

    @GetMapping(value = "/api/users/epic/",produces = "application/json")
    public List<Epic> getAllEpics(){
        return this.epicService.getAllEpics();
    }

    @PostMapping(value = "/api/users/epic/",produces = "application/json")
    public Epic createEpic(@RequestBody Epic epic){
        return this.epicService.createEpic(epic);
    }

    @GetMapping(value = "/api/users/epic_test/",produces = "application/json")
    public Epic getTest(){
        return new Epic();
    }

    @GetMapping(value = "/api/users/create_test/",produces = "application/json")
    public Epic createTest(){
        Epic e1 = new Epic();
        e1.setEpicName("Create Epic T1");
        e1.setDescription("Test description for epic1");
        e1.setLabels(Arrays.asList("T1","T2"));

        Issue i1 = new Issue();
        i1.setIssueName("S1");
        i1.setIssueType(IssueType.STORY);
        i1.setEstimate(12);
        i1.setLabels(Arrays.asList("SL1","SL2"));
        i1.setPriority(Priority.MAJOR);
        i1.setTimespent(0);

        Issue st1 = new Issue();
        st1.setIssueName("ST1");
        st1.setIssueType(IssueType.SUBTASK);
        st1.setEstimate(12);
        st1.setLabels(Arrays.asList("ST1-A","ST1-B"));
        st1.setPriority(Priority.MAJOR);
        st1.setTimespent(0);

        Issue st2 = new Issue();
        st2.setIssueName("ST1");
        st2.setIssueType(IssueType.SUBTASK);
        st2.setEstimate(12);
        st2.setLabels(Arrays.asList("ST2-A","ST2-B"));
        st2.setPriority(Priority.MAJOR);
        st2.setTimespent(0);

        Comment c1 = new Comment();
        c1.setUser(SecurityContextHolder.getContext().getAuthentication().getName());
        c1.setText("Sample Comment");
//        c1.setCommentTime(ZonedDateTime.now());

        WorkLog w1 = new WorkLog();
//        w1.setLoggedTime(ZonedDateTime.now());
        w1.setTime(2);
        w1.setDescription("Test work log");

        this.issueRepository.save(st1);
        this.issueRepository.save(st2);
        i1.setSubtasks(Arrays.asList(st1,st2));

        this.workLogRepository.save(w1);
        this.commentRepository.save(c1);
        i1.setComments(Arrays.asList(c1));
        i1.setWorklog(Arrays.asList(w1));
        this.issueRepository.save(i1);
        e1.setStories(Arrays.asList(i1));
        return epicRepository.save(e1);
    }

    @GetMapping(value = "/api/users/create_sp_test/",produces = "application/json")
    public Project createReleaseStructure(){
        LocalDateTime projectStart = LocalDateTime.now();

        Project p = new Project();
        p.setName("Test Project");
        p.setStart(projectStart);
        p.setEnd(projectStart.plusYears(2));
        p.setStatus(ProjectStatus.PLANNED);
        p.setDescription("Test Project Description");


        Release r1 = new Release();
        r1.setName("R1");
        r1.setLabel("R1");
        r1.setStatus(ReleaseStatus.PLANNED);
        r1.setStart(projectStart);
        r1.setEnd(projectStart.plusMonths(3));
        List<Sprint> r1Sprints = getReleaseSprints(projectStart,3);
        r1.setSprints(r1Sprints);
        Event r1ReleaseEvent = new Event();
        r1ReleaseEvent.setName("R1-Release");
        r1ReleaseEvent.setDescription("R1 Release Activities");
        r1.setEvents(Arrays.asList(r1ReleaseEvent));

        Release r2 = new Release();
        r2.setName("R2");
        r2.setLabel("R2");
        r2.setStatus(ReleaseStatus.PLANNED);
        r2.setStart(projectStart.plusMonths(3));
        r2.setEnd(projectStart.plusMonths(6));
        List<Sprint> r2Sprints = getReleaseSprints(projectStart.plusMonths(3),3);
        r2.setSprints(r2Sprints);
        Event r2ReleaseEvent = new Event();
        r2ReleaseEvent.setName("R2-Release");
        r2ReleaseEvent.setDescription("R2 Release Activities");
        r2.setEvents(Arrays.asList(r2ReleaseEvent));

        eventRepository.save(r1ReleaseEvent);
        eventRepository.save(r2ReleaseEvent);

        r1Sprints.forEach(s -> {
            sprintRepository.save(s);
        });
        r2Sprints.forEach(s -> {
            sprintRepository.save(s);
        });

        releaseRepository.save(r1);
        releaseRepository.save(r2);

        p.setReleases(Arrays.asList(r1,r2));

        return projectRepository.save(p);
    }
    public List<Sprint> getReleaseSprints(LocalDateTime releaseStart, int numberOfSprints){
        List<Sprint> releaseSprints = new ArrayList<>();
        for(int i=1; i<=numberOfSprints;i++){
            Sprint sp1 = new Sprint();
            sp1.setLabel("SP"+i);
            sp1.setName("Sprint-"+i);
            sp1.setStatus(SprintStatus.PLANNED);
            sp1.setDuration(15);
            sp1.setDescription("Sprint-"+i+" description");
            sp1.setStart(releaseStart.plusDays((i-1)*21));
            sp1.setEnd(releaseStart.plusDays((i)*21));
            releaseSprints.add(sp1);
        }
        return releaseSprints;
    }
}
