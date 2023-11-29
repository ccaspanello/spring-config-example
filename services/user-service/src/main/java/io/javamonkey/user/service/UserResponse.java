package io.javamonkey.user.service;

import lombok.Data;

@Data
public class UserResponse {
    private String serviceName;
    private String instance;
    private String message;
}
