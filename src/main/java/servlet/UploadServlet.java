package servlet;

import utils.Config;
import utils.JsonFileParser;
import utils.ZipHelper;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileFilter;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * Created on 2018/3/15.
 * Description:
 * 处理文件上传信息
 * @author iznauy
 */
public class UploadServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        if (!ServletFileUpload.isMultipartContent(req))
            return;

        DiskFileItemFactory factory = new DiskFileItemFactory();
        factory.setSizeThreshold(Config.MEMORY_THRESHOLD);
        factory.setRepository(new File(System.getProperty("java.io.tmpdir")));

        ServletFileUpload upload = new ServletFileUpload(factory);
        upload.setFileSizeMax(Config.MAX_FILE_SIZE);
        upload.setSizeMax(Config.MAX_REQUEST_SIZE);

        String uploadPath = req.getRealPath("")+ Config.UPLOAD_DIRECTORY; //路径问题 十分难以捉摸

        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) uploadDir.mkdir();

        HttpSession session = req.getSession(true);

        try {
            String fileName = null;
            String filePath = null;
            List<FileItem> formItems = upload.parseRequest(req);
            for (FileItem item: formItems) {
                if (!item.isFormField()) {
                    fileName = new File(item.getName()).getName();
                    filePath = uploadPath + File.separator + fileName;
                    System.out.println(filePath);
                    File storeFile = new File(filePath);
                    item.write(storeFile);
                    req.setAttribute("message", "文件上传成功");
                    break;
                }
            }
            fileName = fileName.substring(0, fileName.length() - 4);
            String unzipPath = req.getRealPath("") + File.separator + Config.UNZIP_PATH;
            System.out.println(new ZipHelper().unZip(filePath, unzipPath));
            session.setAttribute("filePath", "/" + Config.UNZIP_PATH + "/" +
                    fileName + "/" + "data" + "/");

            //解析任务内容
            String jsonFilePath = unzipPath + File.separator + fileName + "/task.json";
            JsonFileParser parser = new JsonFileParser(jsonFilePath);

            int taskType = parser.getTaskType();
            String format = parser.getFormat();
            String description = parser.getDescription();
            //目录下所有图片文件
            //session.setAttribute("description", description);

            String dataSet = unzipPath + File.separator + fileName + File.separator + "data" + File.separator;
            String[] picNames = new File(dataSet).list((dir, name) -> name.endsWith(format));

            for (String p: picNames) {
                System.out.println(p);
            }

            System.out.println(taskType);
            System.out.println(description);

            List<String> picList = Arrays.asList(picNames);
            session.setAttribute("pic", picList);

        } catch (Exception e) {
            e.printStackTrace();
            session.invalidate();
            return;
        }
        req.getRequestDispatcher("/message.jsp").forward(req, resp);

    }

}
