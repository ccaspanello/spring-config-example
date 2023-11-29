package io.javamonkey.config.service.models;

import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class Config {
    private String id;
    private String name;
}
