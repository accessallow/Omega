package com.omega.service;

import com.omega.jpa.EpicRepository;
import com.omega.model.Epic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EpicService {
    @Autowired
    private EpicRepository epicRepository;

    public Epic createEpic(Epic epic){
        return this.epicRepository.save(epic);
    }

    public List<Epic> getAllEpics(){
        List<Epic> epicList = new ArrayList<>();
        this.epicRepository.findAll().forEach(e -> epicList.add(e));
        return epicList;
    }

}
