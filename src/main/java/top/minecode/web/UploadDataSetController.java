package top.minecode.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import top.minecode.Config;
import top.minecode.exception.FailToUnzipException;
import top.minecode.exception.WrongDataSetFormatException;
import top.minecode.service.UploadDataSetService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;

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

    @RequestMapping(value = "/uploadCheck.html")
    public ModelAndView uploadDataSet(HttpServletRequest request,
                                      @RequestParam MultipartFile dataSet) throws Exception {
        boolean emptyFile = dataSet.isEmpty();
        if (emptyFile)
            return new ModelAndView("upload", "error", "文件不能为空");

        if (!uploadDataSetService.validDataSet(dataSet.getOriginalFilename()))
            return new ModelAndView("upload", "error", "不支持的文件格式");

        String path = request.getSession().getServletContext().getRealPath(Config.RAW_FILE_PATH) + File.separator;
        String fileName = dataSet.getOriginalFilename();
        File filePath = new File(path + fileName);

        if (!filePath.getParentFile().exists()) filePath.getParentFile().mkdirs();
        dataSet.transferTo(filePath);

        try {
            uploadDataSetService.unZipRawImages(filePath.getAbsolutePath());
        } catch (WrongDataSetFormatException e) {
            return new ModelAndView("upload", "error", "文件格式不正确");
        } catch (FailToUnzipException e) {
            return new ModelAndView("upload", "error", "文件解压缩失败");
        }

        HttpSession session = request.getSession(true);
        session.setAttribute("path", request.getContextPath() + "/" + Config.UNZIPPED_FILE_PATH + "/"
            + fileName.substring(0, fileName.lastIndexOf('.')) + File.separator);
        System.out.println(session.getAttribute("path"));
        return new ModelAndView("oj");
    }

}
