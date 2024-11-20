package lk.childsafe.Dao;

import lk.childsafe.Entity.Student;
import lk.childsafe.Entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository <Teacher,Integer>{
    //query for get next teacherid
    @Query(value = "SELECT CONCAT('TE', lpad(substring(max(t.teacherid),3)+1,5,'0')) FROM childsafe.teacher as t;",nativeQuery = true)
    String nexTeCode();



    @Query(value = "select t from Teacher t where t.teacherid = ?1")
    Teacher findTeacherByTeacherID(String teacherid);
}
