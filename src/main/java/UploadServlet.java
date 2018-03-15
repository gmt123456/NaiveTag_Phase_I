import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
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

        System.out.println("Are you Ok?");

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

        try {
            List<FileItem> formItems = upload.parseRequest(req);
            for (FileItem item: formItems) {
                if (!item.isFormField()) {
                    String fileName = new File(item.getName()).getName();
                    String filePath = uploadPath + File.separator + fileName;
                    System.out.println(filePath);
                    File storeFile = new File(filePath);
                    item.write(storeFile);
                    req.setAttribute("message", "文件上传成功");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            //进入上传出错页面
            req.setAttribute("message", "文件上传失败：" + e.getMessage());
        }
    }

}
