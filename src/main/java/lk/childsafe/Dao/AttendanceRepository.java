package lk.childsafe.Dao;

import lk.childsafe.Entity.Attendance;
import lk.childsafe.Entity.ClassImplementation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository <Attendance,Integer>{
    @Query(value = "select att from Attendance as att where att.class_implementation_id.id=?1")
    List<Attendance> geAttByCid(Integer cid);

}
