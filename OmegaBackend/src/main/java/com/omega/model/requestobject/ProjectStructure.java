package com.omega.model.requestobject;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;
@NoArgsConstructor @Getter @Setter @ToString
public class ProjectStructure {
    private String type;
    private Map<String,String> data;
    private ProjectStructure[] children;
    private String uuid;
}
