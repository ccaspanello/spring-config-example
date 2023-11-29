package io.javamonkey.user.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;


@RequestScope
@RestController
public class UserController {

    @Autowired
    private DiscoveryClient discoveryClient;

    @Value("${spring.application.name}")
    private String serviceName;

    @Value("${app.message:}")
    private String message;

    @GetMapping("/payload")
    public UserResponse payload(HttpServletRequest request) {
        int port = request.getLocalPort();
        String host = request.getLocalName();
        ServiceInstance instance = findInstance(host, port);
        UserResponse result = new UserResponse();
        result.setServiceName(serviceName);
        result.setInstance(instance.getInstanceId());
        result.setMessage(message);
        return result;
    }

    private ServiceInstance findInstance(String host, int port) {
        return discoveryClient.getInstances(serviceName).stream().filter(instance ->
                instance.getHost().equals(host) && instance.getPort() == port
        ).findFirst().get();
    }

}
