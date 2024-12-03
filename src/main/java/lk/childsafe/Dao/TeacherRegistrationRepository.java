package lk.childsafe.Dao;

import lk.childsafe.Entity.ClassImplementation;
import lk.childsafe.Entity.StudentClassRegistration;
import lk.childsafe.Entity.TeacherRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRegistrationRepository extends JpaRepository <TeacherRegistration,Integer>{


    @Query(value = "SELECT CONCAT('TE', lpad(substring(max(tr.teacher_reg_code),3)+1,5,'0')) FROM childsafe.teacher_registration as tr;",nativeQuery = true)
    String nexTeRegCode();


    @Query(value = "select new TeacherRegistration (count(tr.id)) from TeacherRegistration tr where tr.teacher_reg_status_id.id =1 and tr.teacher_id.id=?1")
    TeacherRegistration getClassbyTeacher(Integer teache_id);



    @Query(value = "SELECT teareg FROM TeacherRegistration teareg where teareg.teacher_id.id=?1 and teareg.teacher_reg_status_id.id=1")
    List<TeacherRegistration> getClassListByTeacher(Integer teacherid);


}
