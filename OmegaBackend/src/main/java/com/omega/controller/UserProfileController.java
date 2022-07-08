package com.omega.controller;

import com.omega.jpa.Customer;
import com.omega.model.Epic;
import com.omega.service.CustomerService;
import com.omega.service.EpicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
//@RequestMapping("/api/users")
public class UserProfileController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private EpicService epicService;

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
}
