package lk.childsafe.Dao;

import lk.childsafe.Entity.ClassImplementation;
import lk.childsafe.Entity.Institute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassImplementationsRepository extends JpaRepository <ClassImplementation,Integer>{


    @Query(value = "select cl from ClassImplementation cl where cl.class_code = ?1")
    ClassImplementation getClassByCourse_code(String class_code);



}
