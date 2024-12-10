package lk.childsafe.Controller;

import lk.childsafe.Dao.ClassImpleStatusRepository;
import lk.childsafe.Dao.InstitutestatusRepository;
import lk.childsafe.Entity.ClassImplementationStatus;
import lk.childsafe.Entity.InstituteStatus;
import lk.childsafe.Entity.TeacherRegStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController //awashya services denna
@RequestMapping("/classimplestatus")
public class ClassImplementationStatusController {


    @Autowired
    ClassImpleStatusRepository classimplementationstatusDao;

    //refill witout delete
    @GetMapping(value = "/findall", produces = "application/json")
    public List<ClassImplementationStatus> classImplementationStatuses() {return classimplementationstatusDao.findAllByIdIsNot(3);}

    @GetMapping(value = "/findactive", produces = "application/json")
    public List<ClassImplementationStatus> classStActive() {
        return classimplementationstatusDao.findByStatuss(3,2);
    }
}
