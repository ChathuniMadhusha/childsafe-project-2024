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

    //query for filter by studentID
    @Query(value = "select s from Student s where s.studentid = ?1 and s.student_status_id.id=1")
    Student findStudentByStudentno(String studentno);

    //check duplicate with find Storage by given Storage name without quary
    Student findStudentByStudentid(String name);




}
