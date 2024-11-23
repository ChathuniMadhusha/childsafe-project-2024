package lk.childsafe.Dao;

import lk.childsafe.Entity.ClassImplementation;
import lk.childsafe.Entity.Institute;
import lk.childsafe.Entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassImplementationsRepository extends JpaRepository <ClassImplementation,Integer>{


    @Query(value = "select cl from ClassImplementation cl where cl.class_code = ?1")
    ClassImplementation getClassByCourse_code(String class_code);

    //generate next number (native damme sql query ekak nisa) anith eka jpl
    @Query(value = "SELECT max(cl.class_code) FROM childsafe.class_implementation as cl;", nativeQuery = true)
    String getNextNumber();

    //query for get class name accordinf to class code
    @Query(value = "select cl from ClassImplementation cl where cl.class_code = ?1")
    ClassImplementation findClassByClassCode(String class_name);

}
