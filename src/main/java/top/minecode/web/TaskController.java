package top.minecode.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created on 2018/3/23.
 * Description:
 *
 * @author iznauy
 */

@RestController
public class TaskController {

    @RequestMapping("/task.do")
    public @ResponseBody String getPicList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null)
            return null;
        String suffix = (String) session.getAttribute("path");
        return suffix + "task.json";
    }

}
