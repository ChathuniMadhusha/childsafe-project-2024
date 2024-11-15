package lk.childsafe.Controller;

import lk.childsafe.Dao.ParentstatusRepository;
import lk.childsafe.Dao.StudentstatusRepositiry;
import lk.childsafe.Entity.ParentStatus;
import lk.childsafe.Entity.StudentStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController //awashya services denna
@RequestMapping("/studentstatus")
public class StudentStatusController {


    @Autowired
    StudentstatusRepositiry studentstatusDao;

    @GetMapping(value = "/findall", produces = "application/json")
    public List<StudentStatus> studentStatus() {return studentstatusDao.findAll();}

}
