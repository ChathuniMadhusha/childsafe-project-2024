package lk.childsafe.Dao;

import jakarta.persistence.criteria.CriteriaBuilder;
import lk.childsafe.Entity.TeacherRegStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRegStatusRepository extends JpaRepository <TeacherRegStatus,Integer>{

    List<TeacherRegStatus> findByIdNot(Integer id);

    @Query(value = "select t from TeacherRegStatus t where t.id != ?1")
    List<TeacherRegStatus> findByStatus(Integer id);


    @Query(value = "select t from TeacherRegStatus t where t.id != ?1 and t.id!=2")
    List<TeacherRegStatus> findByStatuss(Integer id, Integer ids);
}
