package top.minecode.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import top.minecode.Config;
import top.minecode.exception.FailToUnzipException;
import top.minecode.exception.WrongDataSetFormatException;
import top.minecode.exception.WrongTaskFileException;
import top.minecode.service.UploadDataSetService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileWriter;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Created on 2018/3/19.
 * Description:
 *
 * @author iznauy
 */
@RestController
public class UploadDataSetController {

    private UploadDataSetService uploadDataSetService;

    @Autowired
    public void setUploadDataSetService(UploadDataSetService uploadDataSetService) {
        this.uploadDataSetService = uploadDataSetService;
    }

    @RequestMapping(value = "/index.html")
    public String uploadPage() {
        return "upload";
    }

    @RequestMapping(value = "/intimeSave.html")
    public void inTimeSave(HttpServletRequest request, @RequestParam String url,
                           @RequestParam String info) {
        HttpSession session = request.getSession();
        if (session == null)
            return;
        Map<String, String> infoMap = (Map<String, String>) session.getAttribute("info");
        infoMap.put(url, info);
    }

    @RequestMapping(value = "intimeLoad.html")
    public @ResponseBody String inTimeLoad(HttpServletRequest request, @RequestParam String url) {
        HttpSession session = request.getSession();
        if (session == null)
            return null;
        Map<String, String> infoMap = (Map<String, String>) session.getAttribute("info");
        return infoMap.get(url);
    }

    @RequestMapping(value = "/load.html")
    public @ResponseBody String loadData(HttpServletRequest request) {
        return request.getSession().getAttribute("history").toString();
    }


    @RequestMapping(value = "/save.html", method = {RequestMethod.POST})
    public String saveData(HttpServletRequest request) {
        String results = request.getParameter("value");
        System.out.println(results);
        HttpSession session = request.getSession();
        session.setAttribute("history", results);
        return "oj";
    }


    @RequestMapping(value = "/uploadCheck.html")
    public ModelAndView uploadDataSet(HttpServletRequest request,
                                      @RequestParam(required = false) MultipartFile dataSet){
        if (dataSet == null)
            return new ModelAndView("oj");
        else {
            boolean emptyFile = dataSet.isEmpty();
            if (emptyFile)
                return new ModelAndView("upload", "error", "文件不能为空");

            if (!uploadDataSetService.validDataSet(dataSet.getOriginalFilename()))
                return new ModelAndView("upload", "error", "不支持的文件格式");

            String path = request.getSession().getServletContext().getRealPath(Config.RAW_FILE_PATH) + File.separator;

            String fileName = dataSet.getOriginalFilename();
            File filePath = new File(path + fileName);

            if (!filePath.getParentFile().exists()) filePath.getParentFile().mkdirs();

            try {
                dataSet.transferTo(filePath);
            } catch (IOException e) {
                e.printStackTrace();
                return new ModelAndView("upload", "error", "文件已经存在");
            }

            try {
                uploadDataSetService.unZipRawImages(filePath.getAbsolutePath());
            } catch (WrongDataSetFormatException e) {
                return new ModelAndView("upload", "error", "文件格式不正确");
            } catch (FailToUnzipException e) {
                return new ModelAndView("upload", "error", "文件解压缩失败");
            } catch (WrongTaskFileException e) {
                return new ModelAndView("upload", "error", "不正确的task描述");
            }

            HttpSession session = request.getSession(true);
            String relatedPath = Config.UNZIPPED_FILE_PATH + "/"
                    + fileName.substring(0, fileName.lastIndexOf('.')) + "/";
            session.setAttribute("path", relatedPath);

            String parentPath = filePath.getParentFile().getParent();

            fileName = fileName.substring(0, fileName.lastIndexOf("."));
            String target = parentPath + File.separator +
                    Config.UNZIPPED_FILE_PATH + File.separator + fileName + File.separator + "data";

            List<String> imageNames = Arrays.asList(new File(target).list(new FilenameFilter() {
                @Override
                public boolean accept(File dir, String name) {
                    return name.contains(".");
                }
            }));

            session.setAttribute("picList", imageNames);
            return new ModelAndView("oj");
        }
    }


}
