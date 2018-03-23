package top.minecode.dao.dataset;

import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import static org.mockito.Mockito.*;

/**
 * Created on 2018/3/22.
 * Description:
 *
 * @author iznauy
 */
public class DataSetDaoIntegrationTest {

    @Mock
    private DataSetDao dataSetDao;

    @BeforeClass
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testUnZipRawImages() throws Exception {
        doNothing().when(dataSetDao).unZipRawImages("excitedFrog.zip");

        dataSetDao.unZipRawImages("excitedFrog.rar");
    }

}
