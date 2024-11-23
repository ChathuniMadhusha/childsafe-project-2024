package lk.childsafe.Dao;

import lk.childsafe.Entity.Attendance;
import lk.childsafe.Entity.ClassImplementation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends JpaRepository <Attendance,Integer>{




}
