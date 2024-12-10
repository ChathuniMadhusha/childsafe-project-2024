package lk.childsafe.Dao;

import lk.childsafe.Entity.Student;
import lk.childsafe.Entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository <Teacher,Integer>{
    //query for get next teacherid
    @Query(value = "SELECT CONCAT('TE', lpad(substring(max(t.teacherid),4)+1,6,'0')) FROM childsafe.teacher as t;",nativeQuery = true)
    String nexTeCode();



    @Query(value = "select t from Teacher t where t.teacherid = ?1 and t.teacher_status_id.name != 'Deleted'")
    Teacher findTeacherByTeacherID(String teacherid);

    //Dash bord eke card wlata data ganna
    @Query(value = "select new Teacher (count(t.id)) from Teacher t where t.teacher_status_id.id =1")
    Teacher findActiveTeacher();


    //Check duplicate by email
    Teacher getTeacherByEmail(String email);
}
