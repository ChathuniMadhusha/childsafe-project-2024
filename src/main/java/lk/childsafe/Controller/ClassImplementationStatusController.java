package lk.childsafe.Controller;

import lk.childsafe.Dao.ClassImpleStatusRepository;
import lk.childsafe.Dao.InstitutestatusRepository;
import lk.childsafe.Entity.ClassImplementationStatus;
import lk.childsafe.Entity.InstituteStatus;
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

    @GetMapping(value = "/findall", produces = "application/json")
    public List<ClassImplementationStatus> classImplementationStatuses() {return classimplementationstatusDao.findAllByIdIsNot(3);}

}
