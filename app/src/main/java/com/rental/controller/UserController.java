package com.rental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rental.exception.UserExistsException;
import com.rental.model.User;
import com.rental.repository.UserRepository;
import com.rental.service.AppUserDetailsService;

@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	private AppUserDetailsService detailservice;
	
	@Autowired
	InMemoryUserDetailsManager inMemoryUserDetailsManager;
	
	@Autowired
	private UserRepository repository;
	

	@PostMapping
	public boolean signup(@RequestBody @Validated User user) throws UserExistsException {
		if(detailservice.signup(user))
			return detailservice.signup(user);
		else
			throw new UserExistsException();
	}
	
	@GetMapping("/{id}")
	public User getUser(@PathVariable int id){
		return repository.findById(id).get();
	}

}
