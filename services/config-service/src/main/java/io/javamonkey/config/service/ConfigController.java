package io.javamonkey.config.service;

import com.ecwid.consul.v1.ConsulClient;
import com.ecwid.consul.v1.agent.model.Service;
import com.ecwid.consul.v1.kv.model.GetBinaryValue;
import io.javamonkey.config.service.models.Config;
import io.javamonkey.config.service.models.ConfigDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RequestScope
@RestController
public class ConfigController {

    @Autowired
    private ConsulClient consulClient;

    @Value("${data.app.name:}")
    private String name;

    @GetMapping("/configs")
    public List<Config> getConfigs() {
        List<String> configs = this.consulClient.getKVKeysOnly("config").getValue();
        return configs.stream().map(key -> {
            String id = key;
            String name = key.replace("config/application/", "");
            return Config.builder().id(id).name(name).build();
        }).collect(Collectors.toList());
    }

    @GetMapping("/config/{serviceName}")
    public ConfigDetail getConfig(@PathVariable("serviceName") String serviceName) {
        GetBinaryValue value = this.consulClient.getKVBinaryValue(consulKey(serviceName)).getValue();
        String yaml = new String(value.getValue());
        return ConfigDetail.builder().name(serviceName).yaml(yaml).build();
    }

    @PutMapping("/config/{serviceName}")
    public ConfigDetail updateConfig(@PathVariable("serviceName")String serviceName, @RequestBody String body) {
        String key = consulKey(serviceName);
        this.consulClient.setKVBinaryValue(key, body.getBytes());
        return ConfigDetail.builder().name(name).yaml(body).build();
    }

    @DeleteMapping("/config/{serviceName}")
    public ResponseEntity deleteMapping(@PathVariable("serviceName") String serviceName) {
        this.consulClient.deleteKVValue(consulKey(serviceName));
        return ResponseEntity.ok("Successfully deleted " + serviceName + ".");
    }

    private String consulKey(String serviceName){
        return "config/application/" + serviceName;
    }


}
