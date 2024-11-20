package lk.childsafe.Dao;

import lk.childsafe.Entity.ClassImplementation;
import lk.childsafe.Entity.TeacherRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRegistrationRepository extends JpaRepository <TeacherRegistration,Integer>{


    @Query(value = "SELECT CONCAT('TE', lpad(substring(max(tr.teacher_reg_code),3)+1,5,'0')) FROM childsafe.teacher_registration as tr;",nativeQuery = true)
    String nexTeRegCode();
}
