package top.minecode.service;

import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;

/**
 * Created on 2018/3/23.
 * Description:
 * @author Liao
 */
public class UploadDataSetServiceIntegrationTest {

    @Mock
    private UploadDataSetService mockService;

    @BeforeClass
    public void initMocks() throws Exception {
        MockitoAnnotations.initMocks(this);
        doReturn(true).when(mockService).validDataSet("excited.zip");
        doNothing().doThrow(new RuntimeException()).when(mockService).unZipRawImages("");
    }


    @Test
    public void testUnZipRawImage() throws Exception {
        mockService.unZipRawImages("excited.zip");
    }

    @Test
    public void testValidDataSet() throws Exception {
        String validName = "excited.zip";
        String invalidName = "excited.rar";

        assertTrue(mockService.validDataSet(validName));
        assertFalse(mockService.validDataSet(invalidName));
    }
}