package com.rental.repository;

import org.springframework.stereotype.Repository;

import com.rental.model.User;

import org.springframework.data.repository.CrudRepository;

@Repository
public interface UserRepository extends CrudRepository<User,Integer> {

	User findByUsername(String username);

}
