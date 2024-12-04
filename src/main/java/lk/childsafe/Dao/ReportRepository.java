package lk.childsafe.Dao;

import lk.childsafe.Entity.Institute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository <Institute,Integer>{


    //attendance report
    @Query(value = "SELECT  ahs.present_or_absent, a.date, s.first_name, c.class_name FROM childsafe.attendance as a, childsafe.attendance_has_student as ahs,\n" +
            "childsafe.class_implementation as c, childsafe.student as s \n" +
            "where a.class_implementation_id=c.id and ahs.student_id=s.id and a.id=ahs.attendance_id and a.class_implementation_id=?1 and s.id=?2;", nativeQuery = true)
    String[][] getAttendance(String classid, String studentid);



}
