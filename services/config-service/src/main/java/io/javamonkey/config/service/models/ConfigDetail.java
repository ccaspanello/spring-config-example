package io.javamonkey.config.service.models;

import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class ConfigDetail {
    private String name;
    private String yaml;
}
