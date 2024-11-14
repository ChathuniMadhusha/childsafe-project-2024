package lk.childsafe.Controller;

import lk.childsafe.Dao.ParentstatusRepository;
import lk.childsafe.Entity.ParentStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController //awashya services denna
@RequestMapping("/parentstatus")
public class ParentStatusController {


    @Autowired
    private ParentstatusRepository parentstatusDao;

    @GetMapping(value = "/findall", produces = "application/json")
    public List<ParentStatus> parentStatus() {return parentstatusDao.findAll();}

}
