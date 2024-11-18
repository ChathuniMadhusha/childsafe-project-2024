package lk.childsafe.Dao;

import lk.childsafe.Entity.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentRepository extends JpaRepository <Parent,Integer>{
    //query for filter by nic
    @Query(value = "select * from parent where nic = :studentno limit 1", nativeQuery = true)
    Parent findParentByNic(String studentno);


    @Query("SELECT p FROM Parent p WHERE p.student_id.studentid = :studentid AND p.parent_status_id.id = 1")
    Parent findActiveParentByStudentid(@Param("studentid") String studentid);

}

