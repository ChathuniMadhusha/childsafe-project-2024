package lk.childsafe.Dao;

import lk.childsafe.Entity.Student;
import lk.childsafe.Entity.StudentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepositiry extends JpaRepository <Student,Integer>{

    @Query(value = "SELECT CONCAT('ST', lpad(substring(max(s.studentid),3)+1,5,'0')) FROM childsafe.student as s;",nativeQuery = true)
    String nextStCode();
}
