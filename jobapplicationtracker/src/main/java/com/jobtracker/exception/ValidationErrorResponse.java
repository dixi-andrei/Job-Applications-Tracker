package com.jobtracker.exception;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@Data
@NoArgsConstructor
public class ValidationErrorResponse extends ErrorResponse{
    private Map<String, String> errors;

    public ValidationErrorResponse(int status, String message, LocalDateTime timestamp, Map<String, String> errors){
        super(status, message, timestamp);
        this.errors = errors;
    }
}
