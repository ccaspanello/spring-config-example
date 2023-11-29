package io.javamonkey.message.service;

import lombok.Data;

@Data
public class MessageResponse {
    private String serviceName;
    private String instance;
    private String message;
}
