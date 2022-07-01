package com.example.Employee_Managment_Backend.Respository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Employee_Managment_Backend.Model.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee,Long>{
    
}
