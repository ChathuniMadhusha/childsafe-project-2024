package lk.childsafe.Dao;

import lk.childsafe.Entity.ParentStatus;
import lk.childsafe.Entity.TeacherStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParentstatusRepository extends JpaRepository<ParentStatus,Integer> {
    List<ParentStatus> findByIdNot(Integer id);


}
