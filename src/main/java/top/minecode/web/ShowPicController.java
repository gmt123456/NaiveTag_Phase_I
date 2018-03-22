package top.minecode.web;

import com.google.gson.Gson;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

/**
 * Created on 2018/3/22.
 * Description:
 *
 * @author iznauy
 */
@RestController
public class ShowPicController {

    @RequestMapping("/dataList.html")
    public @ResponseBody String getPicList(HttpServletRequest request,
                                           @RequestParam int beginIndex, @RequestParam int footstep) throws Exception {
        HttpSession session = request.getSession();
        if (session == null)
            return null;

        List<String> pathList = (List<String>)session.getAttribute("picList");
        String suffix = (String) session.getAttribute("path");

        List<String> result = new ArrayList<String>();
        int length = pathList.size();
        for (int i = beginIndex; i < beginIndex + footstep; i++){
            if (length <= i)
                break;
            result.add(suffix + "data/" + pathList.get(i));
        }

        Gson gson = new Gson();
        return gson.toJson(result);
    }

}
