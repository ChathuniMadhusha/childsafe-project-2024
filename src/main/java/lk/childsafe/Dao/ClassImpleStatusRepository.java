package lk.childsafe.Dao;

import lk.childsafe.Entity.ClassImplementationStatus;
import lk.childsafe.Entity.InstituteStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassImpleStatusRepository extends JpaRepository <ClassImplementationStatus,Integer>{
    List<ClassImplementationStatus> findAllByIdIsNot(Integer id);
}
