package com.rental.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.rental.model.Complaint;


public interface ComplaintRepository extends CrudRepository<Complaint,Integer> {
	
	List<Complaint> findAll();

}
