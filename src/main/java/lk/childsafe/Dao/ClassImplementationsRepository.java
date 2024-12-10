package lk.childsafe.Dao;

import lk.childsafe.Entity.ClassImplementation;
import lk.childsafe.Entity.Institute;
import lk.childsafe.Entity.Student;
import lk.childsafe.Entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassImplementationsRepository extends JpaRepository <ClassImplementation,Integer>{


    //check duplicate entry
    @Query(value = "select cl from ClassImplementation cl where cl.class_name = ?1 and cl.class_status_id.id = 1")
    ClassImplementation getClassByCourse_code(String class_code);

    //generate next number (native damme sql query ekak nisa) anith eka jpl
    @Query(value = "SELECT max(cl.class_code) FROM childsafe.class_implementation as cl;", nativeQuery = true)
    String getNextNumber();

    //query for get class name accordinf to class code
    @Query(value = "select cl from ClassImplementation cl where cl.class_code = ?1 and cl.class_status_id.id=1")
    ClassImplementation findClassByClassCode(String class_name);


    //Dash bord eke card wlata data ganna
    @Query(value = "select new ClassImplementation (count(c.id)) from ClassImplementation c where c.class_status_id.id =1")
    ClassImplementation findActiveClasses();

    @Query(value = "select cl from ClassImplementation cl where cl.class_status_id.id = 1")
    List<ClassImplementation> getActiveClass();




}
