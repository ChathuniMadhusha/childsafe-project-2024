package lk.childsafe.Controller;

import lk.childsafe.Dao.InstitutestatusRepository;
import lk.childsafe.Dao.StudentstatusRepositiry;
import lk.childsafe.Entity.InstituteStatus;
import lk.childsafe.Entity.StudentStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController //awashya services denna
@RequestMapping("/institutestatus")
public class InstituteStatusController {


    @Autowired
    InstitutestatusRepository institutestatusDao;

    @GetMapping(value = "/findall", produces = "application/json")
    public List<InstituteStatus> instituteStatuses() {return institutestatusDao.findAll();}

}
