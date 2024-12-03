package lk.childsafe.Dao;

import lk.childsafe.Entity.ClassImplementation;
import lk.childsafe.Entity.Parent;
import lk.childsafe.Entity.StudentClassRegistration;
import lk.childsafe.Entity.StudentRegStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StuClzRegRepositiry extends JpaRepository <StudentClassRegistration,Integer>{

    //query for get next teacherid
    @Query(value = "SELECT CONCAT('SC', lpad(substring(max(t.stu_class_code),4)+1,6,'0')) FROM childsafe.stu_class_registration as t;",nativeQuery = true)
    String nexTeCode();

    //duplicate
    @Query("SELECT sc FROM StudentClassRegistration sc WHERE sc.student_id.studentid = :studentid AND sc.class_implementation_id.class_code = :class_code AND sc.stu_registration_status_id.id!=2")
    StudentClassRegistration findduplicateregByStID(@Param("studentid") String studentid, @Param("class_code") String class_code);

    @Query(value = "select new StudentClassRegistration (count(cr.id)) from StudentClassRegistration cr where cr.stu_registration_status_id.id =1 and cr.student_id.id=?1")
    StudentClassRegistration getClassbyStudent(Integer student_id);

    @Query(value = "SELECT stureg FROM StudentClassRegistration stureg where stureg.student_id.id=?1 and stureg.stu_registration_status_id.id=1")
    List<StudentClassRegistration> getClass(Integer studentno);


}
