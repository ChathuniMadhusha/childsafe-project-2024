package lk.childsafe.Dao;

import lk.childsafe.Entity.Parent;
import lk.childsafe.Entity.StudentClassRegistration;
import lk.childsafe.Entity.StudentRegStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StuClzRegRepositiry extends JpaRepository <StudentClassRegistration,Integer>{

    //query for get next teacherid
    @Query(value = "SELECT CONCAT('ST-REG-', LPAD(COALESCE(SUBSTRING_INDEX(MAX(tr.teacher_reg_code), '-', -1) + 1, 1),5,'0')) FROM childsafe.teacher_registration as tr;",nativeQuery = true)
    String nexTeCode();

    //duplicate
    @Query("SELECT sc FROM StudentClassRegistration sc WHERE sc.student_id.studentid = :studentid AND sc.class_implementation_id.class_code = :class_code AND sc.stu_registration_status_id.id!=2")
    StudentClassRegistration findduplicateregByStID(@Param("studentid") String studentid, @Param("class_code") String class_code);


}
