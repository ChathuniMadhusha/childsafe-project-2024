package lk.childsafe.Dao;

import lk.childsafe.Entity.ClassImplementationStatus;
import lk.childsafe.Entity.TeacherRegStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRegStatusRepository extends JpaRepository <TeacherRegStatus,Integer>{

    List<TeacherRegStatus> findByIdNot(Integer id);
}
