package com.rental.exception;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "User already exists")
public class UserExistsException extends Exception {
	
	private static final long serialVersionUID = 1L;

	public UserExistsException() {
		super("User already exists");
	}
}
