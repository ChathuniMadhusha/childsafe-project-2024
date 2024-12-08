package lk.childsafe.Dao;

import lk.childsafe.Entity.Parent;
import lk.childsafe.Entity.StudentClassRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParentRepository extends JpaRepository <Parent,Integer>{
    //query for filter by nic
    @Query(value = "select * from parent where nic = :studentno limit 1", nativeQuery = true)
    Parent findParentByNic(String studentno);


    @Query("SELECT p FROM Parent p WHERE p.student_id.studentid = :studentid AND p.parent_status_id.id = 1")
    Parent findActiveParentByStudentid(@Param("studentid") String studentid);


//    @Query(value = "SELECT count(student_id) FROM childsafe.parent as p where p.id=?1", nativeQuery = true)
//    Parent getStudentCount(Integer parentid);

    @Query(value = "select new Parent (count(p.student_id)) from Parent p where  p.nic=?1 and p.parent_status_id.id=1 and p.student_id.student_status_id.id=1")
    Parent getStudentCount(String parentid);


    @Query(value = "SELECT par FROM Parent par where par.id=?1")
    List<Parent> getStudentList(Integer parentid);

    List<Parent> getParentByNic(String nic);

    //get parent by student id
    @Query(value = "SELECT p FROM Parent p where p.student_id.id=?1")
    Parent getByStudent_id(Integer id);
}

