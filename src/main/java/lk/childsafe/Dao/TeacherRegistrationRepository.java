package lk.childsafe.Dao;

import lk.childsafe.Entity.ClassImplementation;
import lk.childsafe.Entity.StudentClassRegistration;
import lk.childsafe.Entity.TeacherRegStatus;
import lk.childsafe.Entity.TeacherRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRegistrationRepository extends JpaRepository <TeacherRegistration,Integer>{

    //next code
    @Query(value = "SELECT CONCAT('TE-REG-', LPAD(COALESCE(SUBSTRING_INDEX(MAX(tr.teacher_reg_code), '-', -1) + 1, 1),5,'0')) FROM childsafe.teacher_registration as tr;",nativeQuery = true)
    String nexTeRegCode();

    //duplicate
//    @Query("SELECT tc FROM TeacherRegistration tc WHERE tc.teacher_id.teacherid = :teacherid AND tc.class_implementation_id.class_code = :class_code AND tc.teacher_reg_status_id.id=1")
//    TeacherRegistration findduplicateregByTID(@Param("teacherid") String teacherid, @Param("class_code") String class_code);

    @Query(value = "select cl from TeacherRegistration cl where cl.class_implementation_id.class_code = ?1 and cl.teacher_reg_status_id.id = 1")
    TeacherRegistration getClassByCourse_code(String class_code);

    @Query(value = "select new TeacherRegistration (count(tr.id)) from TeacherRegistration tr where tr.teacher_reg_status_id.id =1 and tr.teacher_id.id=?1")
    TeacherRegistration getClassbyTeacher(Integer teache_id);

    @Query(value = "SELECT teareg FROM TeacherRegistration teareg where teareg.teacher_id.id=?1 and teareg.teacher_reg_status_id.id=1")
    List<TeacherRegistration> getClassListByTeacher(Integer teacherid);


    //query for get teacher clz reg list for given teacher id(this is for update teacher clz reg status according to teacher status)
    @Query(value = "SELECT tr FROM TeacherRegistration tr where tr.teacher_id.id=?1")
    List<TeacherRegistration> getTeacherClassRegistrationsByTeID(Integer id);


}
