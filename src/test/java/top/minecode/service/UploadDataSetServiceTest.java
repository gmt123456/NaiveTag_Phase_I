package top.minecode.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.annotations.Test;

import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;

/**
 * Created on 2018/3/23.
 * Description:
 * @author Liao
 */
@ContextConfiguration("classpath*:/naive-context.xml")
public class UploadDataSetServiceTest extends AbstractTestNGSpringContextTests{
    private UploadDataSetService uploadDataSetService;

    @Autowired
    public void setUploadDataSetService(UploadDataSetService uploadDataSetService) {
        this.uploadDataSetService = uploadDataSetService;
    }

    @Test
    public void testValidDataSet() throws Exception {
        String validName = "excited.zip";
        String invalidName = "excited.rar";

        assertFalse(uploadDataSetService.validDataSet(invalidName));
        assertTrue(uploadDataSetService.validDataSet(validName));
    }
}