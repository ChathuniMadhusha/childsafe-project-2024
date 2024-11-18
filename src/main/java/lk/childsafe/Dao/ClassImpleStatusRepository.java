package lk.childsafe.Dao;

import lk.childsafe.Entity.ClassImplementationStatus;
import lk.childsafe.Entity.InstituteStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassImpleStatusRepository extends JpaRepository <ClassImplementationStatus,Integer>{
}
