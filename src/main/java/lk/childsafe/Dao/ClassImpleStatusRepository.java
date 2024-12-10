package lk.childsafe.Dao;

import lk.childsafe.Entity.ClassImplementationStatus;
import lk.childsafe.Entity.InstituteStatus;
import lk.childsafe.Entity.TeacherRegStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassImpleStatusRepository extends JpaRepository <ClassImplementationStatus,Integer>{
    List<ClassImplementationStatus> findAllByIdIsNot(Integer id);


    @Query(value = "select t from ClassImplementationStatus t where t.id != ?1 and t.id!=2")
    List<ClassImplementationStatus> findByStatuss(Integer id, Integer ids);
}
