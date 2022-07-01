package com.example.Employee_Managment_Backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Employee_Managment_Backend.Exception.ResourceNotFoundException;
import com.example.Employee_Managment_Backend.Model.Employee;
import com.example.Employee_Managment_Backend.Respository.EmployeeRepo;
@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    private EmployeeRepo employeeRepo;

    @GetMapping
    public List<Employee> getAllEmployees(){
        return employeeRepo.findAll();
    }

    @PostMapping
    public Employee postEmployee(@RequestBody Employee employee){
        System.out.println(employee.getFirstName());
        System.out.println(employee.getLastName());
       return employeeRepo.save(employee);
    }
   
    // get by id
    @GetMapping("/{Id}")
    public ResponseEntity<?> getEmployeeById( @PathVariable Long Id){
        Employee employee= employeeRepo.findById(Id)
        .orElseThrow(()->new ResourceNotFoundException("employee with id"+
        Id+"Does not Exist"));
        return ResponseEntity.ok(employee);

    }



    @PutMapping("/{Id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long Id ,@RequestBody Employee employee){
        Employee employee2=employeeRepo.findById(Id)
        .orElseThrow(()->new ResourceNotFoundException("employee with id"+
        Id+"Does not Exist"));
        employee2.setFirstName(employee.getFirstName());
        employee2.setLastName(employee.getLastName());
        employee2.setEmailId(employee.getEmailId());
         employeeRepo.save(employee2);
        return ResponseEntity.ok("Employee Updated Sucessully");
    }

    @DeleteMapping("/{Id}")
    public void deleteEmployee(@PathVariable Long Id){
          employeeRepo.deleteById(Id);
    }

    
}
  