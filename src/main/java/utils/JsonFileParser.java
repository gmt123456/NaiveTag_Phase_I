package utils;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

/**
 * Created on 2018/3/17.
 * Description:
 *
 * @author iznauy
 */
public class JsonFileParser {

    private JsonObject json;

    public JsonFileParser(String path) throws Exception {
        JsonParser parser = new JsonParser();
        json = parser.parse(new FileReader(path)).getAsJsonObject();
    }

    public int getTaskType() {
        return json.get("task-type").getAsInt();
    }

    public String getFormat() {
        return json.get("format").getAsString();
    }

    public String getDescription() {
        return json.get("description").getAsString();
    }

    public List<String> getClasses() {
        JsonArray array = json.getAsJsonArray("classes");
        List<String> classes = new ArrayList<String>();
        for (JsonElement cls: array)
            classes.add(cls.getAsString());
        return classes;
    }

}
