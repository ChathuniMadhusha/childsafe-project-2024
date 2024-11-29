package lk.childsafe.Dao;

import lk.childsafe.Entity.Student;
import lk.childsafe.Entity.StudentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepositiry extends JpaRepository <Student,Integer>{

    @Query(value = "SELECT CONCAT('ST', lpad(substring(max(s.studentid),3)+1,5,'0')) FROM childsafe.student as s;",nativeQuery = true)
    String nextStCode();

    //query for filter by studentID
    @Query(value = "select s from Student s where s.studentid = ?1 and s.student_status_id.id=1")
    Student findStudentByStudentno(String studentno);

    //query for filter by studentID
    @Query(value = "select s from Student s where s.studentid = ?1 and s.student_status_id.id != 3")
    Student getByStudentnoforclass(String studentno);


    //check duplicate with find student by given Storage name without quary
    Student findStudentByStudentid(String name);



    //filtering query for get student list
    @Query(value = "select new Student(s.id, s.studentid, s.first_name) from Student s where s.id in (select scr.student_id.id from StudentClassRegistration scr where scr.class_implementation_id.class_code=?1 and scr.stu_registration_status_id.id=1)")
    List<Student> getBySession(Integer cid);


    //Dash bord eke card wlata data ganna
    @Query(value = "select new Student(count(s.id)) from Student s where s.student_status_id.id =1")
    Student findActiveStudent();



}
