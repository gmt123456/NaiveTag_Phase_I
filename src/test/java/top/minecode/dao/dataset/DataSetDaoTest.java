package top.minecode.dao.dataset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.testng.annotations.Test;

/**
 * Created on 2018/3/22.
 * Description:
 *
 * @author iznauy
 */
@ContextConfiguration("classpath*:/naive-context.xml")
public class DataSetDaoTest {

    @Autowired
    private DataSetDao dataSetDao;

    @Test
    public void testUnZipRawImages() {

    }

}
